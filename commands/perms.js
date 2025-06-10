const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('perms')
        .setDescription('Gestion des permissions par catégorie')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addSubcommand(subcommand =>
            subcommand
                .setName('ecrit')
                .setDescription('Gestion des permissions d\'écriture')
                .addStringOption(option =>
                    option
                        .setName('permission')
                        .setDescription('Type de permission d\'écriture')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Envoyer des messages', value: 'SendMessages' },
                            { name: 'Créer des threads', value: 'CreatePublicThreads' },
                            { name: 'Créer des threads privés', value: 'CreatePrivateThreads' },
                            { name: 'Envoyer dans les threads', value: 'SendMessagesInThreads' },
                            { name: 'Gérer les messages', value: 'ManageMessages' },
                            { name: 'Gérer les threads', value: 'ManageThreads' },
                            { name: 'Intégrer des liens', value: 'EmbedLinks' },
                            { name: 'Joindre des fichiers', value: 'AttachFiles' },
                            { name: 'Utiliser des emojis externes', value: 'UseExternalEmojis' },
                            { name: 'Utiliser des stickers externes', value: 'UseExternalStickers' },
                            { name: 'Ajouter des réactions', value: 'AddReactions' },
                            { name: 'Mentionner @everyone', value: 'MentionEveryone' },
                            { name: 'Utiliser les commandes slash', value: 'UseApplicationCommands' }
                        ))
                .addStringOption(option =>
                    option
                        .setName('etat')
                        .setDescription('État de la permission')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Activée', value: 'true' },
                            { name: 'Désactivée', value: 'false' },
                            { name: 'Neutre', value: 'null' }
                        ))
                .addRoleOption(option =>
                    option
                        .setName('role')
                        .setDescription('Rôle ciblé (par défaut: @everyone)')
                        .setRequired(false))
                .addChannelOption(option =>
                    option
                        .setName('salon1')
                        .setDescription('Premier salon à modifier')
                        .setRequired(true))
                .addChannelOption(option =>
                    option
                        .setName('salon2')
                        .setDescription('Deuxième salon à modifier')
                        .setRequired(false))
                .addChannelOption(option =>
                    option
                        .setName('salon3')
                        .setDescription('Troisième salon à modifier')
                        .setRequired(false))
                .addChannelOption(option =>
                    option
                        .setName('salon4')
                        .setDescription('Quatrième salon à modifier')
                        .setRequired(false))
                .addChannelOption(option =>
                    option
                        .setName('salon5')
                        .setDescription('Cinquième salon à modifier')
                        .setRequired(false)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('vocal')
                .setDescription('Gestion des permissions vocales')
                .addStringOption(option =>
                    option
                        .setName('permission')
                        .setDescription('Type de permission vocale')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Se connecter', value: 'Connect' },
                            { name: 'Parler', value: 'Speak' },
                            { name: 'Utiliser la détection vocale', value: 'UseVAD' },
                            { name: 'Couper le micro des autres', value: 'MuteMembers' },
                            { name: 'Rendre sourd les autres', value: 'DeafenMembers' },
                            { name: 'Déplacer les membres', value: 'MoveMembers' },
                            { name: 'Utiliser les activités', value: 'UseEmbeddedActivities' },
                            { name: 'Partager son écran', value: 'Stream' },
                            { name: 'Priorité de parole', value: 'PrioritySpeaker' }
                        ))
                .addStringOption(option =>
                    option
                        .setName('etat')
                        .setDescription('État de la permission')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Activée', value: 'true' },
                            { name: 'Désactivée', value: 'false' },
                            { name: 'Neutre', value: 'null' }
                        ))
                .addRoleOption(option =>
                    option
                        .setName('role')
                        .setDescription('Rôle ciblé (par défaut: @everyone)')
                        .setRequired(false))
                .addChannelOption(option =>
                    option
                        .setName('salon1')
                        .setDescription('Premier salon à modifier')
                        .setRequired(true))
                .addChannelOption(option =>
                    option
                        .setName('salon2')
                        .setDescription('Deuxième salon à modifier')
                        .setRequired(false))
                .addChannelOption(option =>
                    option
                        .setName('salon3')
                        .setDescription('Troisième salon à modifier')
                        .setRequired(false))
                .addChannelOption(option =>
                    option
                        .setName('salon4')
                        .setDescription('Quatrième salon à modifier')
                        .setRequired(false))
                .addChannelOption(option =>
                    option
                        .setName('salon5')
                        .setDescription('Cinquième salon à modifier')
                        .setRequired(false)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('general')
                .setDescription('Gestion des permissions générales')
                .addStringOption(option =>
                    option
                        .setName('permission')
                        .setDescription('Type de permission générale')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Voir les salons', value: 'ViewChannel' },
                            { name: 'Gérer les salons', value: 'ManageChannels' },
                            { name: 'Gérer les rôles', value: 'ManageRoles' },
                            { name: 'Gérer les webhooks', value: 'ManageWebhooks' },
                            { name: 'Lire l\'historique', value: 'ReadMessageHistory' },
                            { name: 'Administrateur', value: 'Administrator' },
                            { name: 'Gérer le serveur', value: 'ManageGuild' },
                            { name: 'Créer des invitations', value: 'CreateInstantInvite' },
                            { name: 'Gérer les invitations', value: 'ManageGuild' },
                            { name: 'Changer le pseudo', value: 'ChangeNickname' },
                            { name: 'Gérer les pseudos', value: 'ManageNicknames' }
                        ))
                .addStringOption(option =>
                    option
                        .setName('etat')
                        .setDescription('État de la permission')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Activée', value: 'true' },
                            { name: 'Désactivée', value: 'false' },
                            { name: 'Neutre', value: 'null' }
                        ))
                .addRoleOption(option =>
                    option
                        .setName('role')
                        .setDescription('Rôle ciblé (par défaut: @everyone)')
                        .setRequired(false))
                .addChannelOption(option =>
                    option
                        .setName('salon1')
                        .setDescription('Premier salon à modifier')
                        .setRequired(true))
                .addChannelOption(option =>
                    option
                        .setName('salon2')
                        .setDescription('Deuxième salon à modifier')
                        .setRequired(false))
                .addChannelOption(option =>
                    option
                        .setName('salon3')
                        .setDescription('Troisième salon à modifier')
                        .setRequired(false))
                .addChannelOption(option =>
                    option
                        .setName('salon4')
                        .setDescription('Quatrième salon à modifier')
                        .setRequired(false))
                .addChannelOption(option =>
                    option
                        .setName('salon5')
                        .setDescription('Cinquième salon à modifier')
                        .setRequired(false))),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        const permission = interaction.options.getString('permission');
        const etat = interaction.options.getString('etat');
        const role = interaction.options.getRole('role') || interaction.guild.roles.everyone;

        // Récupération des salons
        const channels = [];
        for (let i = 1; i <= 5; i++) {
            const channel = interaction.options.getChannel(`salon${i}`);
            if (channel) channels.push(channel);
        }

        if (channels.length === 0) {
            return await interaction.reply({
                content: '❌ Aucun salon spécifié.',
                ephemeral: true
            });
        }

        // Vérification des permissions du bot
        const botMember = interaction.guild.members.me;
        if (!botMember.permissions.has(PermissionFlagsBits.ManageRoles)) {
            return await interaction.reply({
                content: '❌ Je n\'ai pas la permission de gérer les rôles.',
                ephemeral: true
            });
        }

        await interaction.deferReply();

        try {
            const permissionValue = etat === 'null' ? null : etat === 'true';
            const results = [];

            for (const channel of channels) {
                try {
                    // Vérification que le bot peut modifier ce salon
                    if (!channel.permissionsFor(botMember).has(PermissionFlagsBits.ManageRoles)) {
                        results.push(`❌ ${channel.name}: Pas de permission`);
                        continue;
                    }

                    await channel.permissionOverwrites.edit(role, {
                        [permission]: permissionValue
                    });

                    const stateText = etat === 'true' ? '✅' : etat === 'false' ? '❌' : '➖';
                    results.push(`${stateText} ${channel.name}: Modifié`);
                } catch (error) {
                    console.error(`Erreur pour ${channel.name}:`, error);
                    results.push(`❌ ${channel.name}: Erreur`);
                }
            }

            const embed = new EmbedBuilder()
                .setColor('#5865f2')
                .setTitle('🔧 Modification des permissions')
                .addFields(
                    { name: '🎭 Rôle', value: role.toString(), inline: true },
                    { name: '🔑 Permission', value: getPermissionName(permission), inline: true },
                    { name: '🔄 État', value: getStateName(etat), inline: true },
                    { name: '📋 Résultats', value: results.join('\n'), inline: false }
                )
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Erreur lors de la modification des permissions:', error);
            await interaction.editReply({
                content: '❌ Une erreur est survenue lors de la modification des permissions.'
            });
        }
    }
};

function getPermissionName(permission) {
    const names = {
        // Écriture
        'SendMessages': 'Envoyer des messages',
        'CreatePublicThreads': 'Créer des threads',
        'CreatePrivateThreads': 'Créer des threads privés',
        'SendMessagesInThreads': 'Envoyer dans les threads',
        'ManageMessages': 'Gérer les messages',
        'ManageThreads': 'Gérer les threads',
        'EmbedLinks': 'Intégrer des liens',
        'AttachFiles': 'Joindre des fichiers',
        'UseExternalEmojis': 'Utiliser des emojis externes',
        'UseExternalStickers': 'Utiliser des stickers externes',
        'AddReactions': 'Ajouter des réactions',
        'MentionEveryone': 'Mentionner @everyone',
        'UseApplicationCommands': 'Utiliser les commandes slash',
        // Vocal
        'Connect': 'Se connecter',
        'Speak': 'Parler',
        'UseVAD': 'Utiliser la détection vocale',
        'MuteMembers': 'Couper le micro des autres',
        'DeafenMembers': 'Rendre sourd les autres',
        'MoveMembers': 'Déplacer les membres',
        'UseEmbeddedActivities': 'Utiliser les activités',
        'Stream': 'Partager son écran',
        'PrioritySpeaker': 'Priorité de parole',
        // Général
        'ViewChannel': 'Voir les salons',
        'ManageChannels': 'Gérer les salons',
        'ManageRoles': 'Gérer les rôles',
        'ManageWebhooks': 'Gérer les webhooks',
        'ReadMessageHistory': 'Lire l\'historique',
        'Administrator': 'Administrateur',
        'ManageGuild': 'Gérer le serveur',
        'CreateInstantInvite': 'Créer des invitations',
        'ChangeNickname': 'Changer le pseudo',
        'ManageNicknames': 'Gérer les pseudos'
    };
    return names[permission] || permission;
}

function getStateName(etat) {
    const states = {
        'true': '✅ Activée',
        'false': '❌ Désactivée',
        'null': '➖ Neutre'
    };
    return states[etat] || etat;
}
