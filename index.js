const { Client, GatewayIntentBits, Collection, Events, ActivityType } = require('discord.js');
const express = require('express');
const fs = require('fs');
const path = require('path');

// Configuration Express pour Render
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).json({ 
        status: 'online', 
        bot: 'Star Assistant',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`🌐 Server running on port ${PORT}`);
});

// Configuration du bot Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

// Collection pour stocker les commandes
client.commands = new Collection();

// Stockage des données de maintenance
client.maintenanceData = new Map();

// Chargement des commandes
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        console.log(`✅ Commande chargée: ${command.data.name}`);
    } else {
        console.log(`❌ Erreur commande: ${file} - structure invalide`);
    }
}

// Chargement des événements
const eventsPath = path.join(__dirname, 'events');
if (fs.existsSync(eventsPath)) {
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
        console.log(`✅ Événement chargé: ${event.name}`);
    }
}

// Événement ready
client.once(Events.ClientReady, readyClient => {
    console.log(`🚀 Star Assistant est connecté en tant que ${readyClient.user.tag}`);
    
    // Définir le statut du bot
    client.user.setActivity('⭐ Star Assistant', { type: ActivityType.Watching });
    
    // Enregistrer les commandes slash
    registerSlashCommands();
});

// Gestion des interactions
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`Commande inconnue: ${interaction.commandName}`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Erreur lors de l'exécution de ${interaction.commandName}:`, error);
        
        const errorMessage = {
            content: '❌ Une erreur est survenue lors de l\'exécution de cette commande.',
            ephemeral: true
        };

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(errorMessage);
        } else {
            await interaction.reply(errorMessage);
        }
    }
});

// Fonction pour enregistrer les commandes slash
async function registerSlashCommands() {
    try {
        console.log('🔄 Enregistrement des commandes slash...');
        
        const commands = [];
        for (const command of client.commands.values()) {
            commands.push(command.data.toJSON());
        }

        await client.application.commands.set(commands);
        console.log(`✅ ${commands.length} commandes slash enregistrées`);
    } catch (error) {
        console.error('❌ Erreur lors de l\'enregistrement des commandes:', error);
    }
}

// Gestion des erreurs
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', error => {
    console.error('Uncaught exception:', error);
    process.exit(1);
});

// Connexion du bot
client.login(process.env.DISCORD_TOKEN);
