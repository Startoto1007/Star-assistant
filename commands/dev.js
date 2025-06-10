const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dev')
        .setDescription('Commandes de développement et informations')
        .addSubcommand(subcommand =>
            subcommand
                .setName('ping')
                .setDescription('Affiche la latence du bot'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('userinfo')
                .setDescription('Informations sur un utilisateur')
                .addUserOption(option =>
                    option
                        .setName('utilisateur')
                        .setDescription('L\'utilisateur à analyser')
                        .setRequired(false)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('serverinfo')
                .setDescription('Informations sur le serveur'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('avatar')
                .setDescription('Affiche l\'avatar d\'un utilisateur')
                .addUserOption(option =>
                    option
                        .setName('utilisateur')
                        .setDescription('L\'utilisateur dont voir l\'avatar')
                        .setRequired(false)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('channelinfo')
                .setDescription('Informations sur un salon')
                .addChannelOption(option =>
                    option
                        .setName('salon')
                        .setDescription('Le salon à analyser')
                        .setRequired(false))),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        switch (subcommand) {
            case 'ping':
                await handlePing(interaction);
                break;
            case 'userinfo':
                await handleUserInfo(interaction);
                break;
            case 'serverinfo':
                await handleServerInfo(interaction);
                break;
            case 'avatar':
                await handleAvatar(interaction);
                break;
            case 'channelinfo':
                await handleChannelInfo(interaction);
                break;
        }
    }
};

async function handlePing(interaction) {
    const sent = await interaction.reply({ content: '🏓 Calcul de la latence...', fetchReply: true });
    
    const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle('🏓 Pong!')
        .addFields(
            { name: '📡 Latence bot', value: `${sent.createdTimestamp - interaction.createdTimestamp}ms`, inline: true },
            { name: '💓 Latence API', value: `${Math.round(interaction.client.ws.ping)}ms`, inline: true },
            { name: '⏰ Uptime', value: formatUptime(process.uptime()), inline: true }
        )
        .setTimestamp();

    await interaction.editReply({ content: null, embeds: [embed] });
}

async function handleUserInfo(interaction) {
    const user = interaction.options.getUser('utilisateur') || interaction.user;
    const member = interaction.guild.members.cache.get(user.id);

    const embed = new EmbedBuilder()
        .setColor('#5865f2')
        .setTitle(`👤 Informations sur ${user.username}`)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .addFields(
            { name: '🏷️ Tag', value: user.tag, inline: true },
            { name: '🆔 ID', value: user.id, inline: true },
            { name: '🤖 Bot', value: user.bot ? 'Oui' : 'Non', inline: true },
            { name: '📅 Compte créé', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`, inline: false }
        );

    if (member) {
        embed.addFields(
            { name: '📅 Rejoint le serveur', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`, inline: false },
            { name: '🎭 Surnom', value: member.nickname || 'Aucun', inline: true },
            { name: '🎨 Rôles', value: member.roles.cache.filter(role => role.name !== '@everyone').map(role => role.toString()).join(', ') || 'Aucun', inline: false }
        );
    }

    await interaction.reply({ embeds: [embed] });
}

async function handleServerInfo(interaction) {
    const guild = interaction.guild;
    
    const embed = new EmbedBuilder()
        .setColor('#ffa500')
        .setTitle(`🏰 Informations sur ${guild.name}`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .addFields(
            { name: '🆔 ID', value: guild.id, inline: true },
            { name: '👑 Propriétaire', value: `<@${guild.ownerId}>`, inline: true },
            { name: '📅 Créé le', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`, inline: false },
            { name: '👥 Membres', value: guild.memberCount.toString(), inline: true },
            { name: '📝 Salons texte', value: guild.channels.cache.filter(ch => ch.type === 0).size.toString(), inline: true },
            { name: '🎤 Salons vocaux', value: guild.channels.cache.filter(ch => ch.type === 2).size.toString(), inline: true },
            { name: '🎭 Rôles', value: guild.roles.cache.size.toString(), inline: true },
            { name: '😀 Emojis', value: guild.emojis.cache.size.toString(), inline: true },
            { name: '🔒 Niveau de vérification', value: getVerificationLevel(guild.verificationLevel), inline: true }
        );

    if (guild.description) {
        embed.setDescription(guild.description);
    }

    await interaction.reply({ embeds: [embed] });
}

async function handleAvatar(interaction) {
    const user = interaction.options.getUser('utilisateur') || interaction.user;
    
    const embed = new EmbedBuilder()
        .setColor('#9932cc')
        .setTitle(`🖼️ Avatar de ${user.username}`)
        .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setDescription(`[Lien direct](${user.displayAvatarURL({ dynamic: true, size: 512 })})`);

    await interaction.reply({ embeds: [embed] });
}

async function handleChannelInfo(interaction) {
    const channel = interaction.options.getChannel('salon') || interaction.channel;
    
    const embed = new EmbedBuilder()
        .setColor('#00ffff')
        .setTitle(`📝 Informations sur #${channel.name}`)
        .addFields(
            { name: '🆔 ID', value: channel.id, inline: true },
            { name: '📋 Type', value: getChannelType(channel.type), inline: true },
            { name: '📅 Créé le', value: `<t:${Math.floor(channel.createdTimestamp / 1000)}:F>`, inline: false }
        );

    if (channel.topic) {
        embed.addFields({ name: '📄 Description', value: channel.topic, inline: false });
    }

    if (channel.type === 0) { // TextChannel
        embed.addFields(
            { name: '🔞 NSFW', value: channel.nsfw ? 'Oui' : 'Non', inline: true },
            { name: '⏱️ Slowmode', value: channel.rateLimitPerUser ? `${channel.rateLimitPerUser}s` : 'Désactivé', inline: true }
        );
    }

    await interaction.reply({ embeds: [embed] });
}

function formatUptime(uptime) {
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    return `${days}j ${hours}h ${minutes}m ${seconds}s`;
}

function getVerificationLevel(level) {
    const levels = {
        0: 'Aucune',
        1: 'Faible',
        2: 'Moyenne',
        3: 'Haute',
        4: 'Très haute'
    };
    return levels[level] || 'Inconnue';
}

function getChannelType(type) {
    const types = {
        0: 'Salon textuel',
        1: 'Message privé',
        2: 'Salon vocal',
        4: 'Catégorie',
        5: 'Salon d\'annonces',
        10: 'Thread d\'annonces',
        11: 'Thread public',
        12: 'Thread privé',
        13: 'Salon vocal de scène',
        15: 'Forum'
    };
    return types[type] || 'Type inconnu';
}
