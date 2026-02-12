require('dotenv').config();
const { 
    Client, 
    GatewayIntentBits, 
    ActivityType, 
    Events, 
    PermissionsBitField 
} = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}`);

    client.user.setPresence({
        activities: [{
            name: 'Zeakmc 💚',
            type: ActivityType.Watching
        }],
        status: 'online'
    });
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'say') {

        // Admin only (Manage Messages permission)
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return interaction.reply({
                content: "❌ You don't have permission to use this command.",
                ephemeral: true
            });
        }

        const message = interaction.options.getString('message');

        await interaction.reply({ content: "✅ Message Sent!", ephemeral: true });
        await interaction.channel.send(message);
    }
});

client.login(process.env.TOKEN);
