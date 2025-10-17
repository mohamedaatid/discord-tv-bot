require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const config = require('./config/config');
const commandHandler = require('./handlers/commandHandler');
const interactionHandler = require('./handlers/interactionHandler');

// Initialize Discord client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

// Create commands collection
client.commands = new Collection();

// Load commands
commandHandler.loadCommands(client);

// Handle interactions
client.on('interactionCreate', async (interaction) => {
    // Check if channel restriction is enabled
    if (config.ALLOWED_CHANNEL_IDS && config.ALLOWED_CHANNEL_IDS.length > 0) {
        // Check if interaction is in an allowed channel
        if (!config.ALLOWED_CHANNEL_IDS.includes(interaction.channelId)) {
            // If it's a command or component interaction, send error message
            if (interaction.isChatInputCommand() || interaction.isStringSelectMenu() || interaction.isButton()) {
                return interaction.reply({
                    content: '❌ This bot can only be used in specific channels.',
                    ephemeral: true
                });
            }
            // For autocomplete, just return empty (no error message)
            if (interaction.isAutocomplete()) {
                return interaction.respond([]);
            }
            return;
        }
    }

    await interactionHandler.handleInteraction(interaction, client);
});

// Bot ready event
client.once('clientReady', () => {
    console.log(`✅ Bot is online as ${client.user.tag}`);
    console.log(`📊 Serving ${client.guilds.cache.size} servers`);
    
    // Log allowed channels if configured
    if (config.ALLOWED_CHANNEL_IDS && config.ALLOWED_CHANNEL_IDS.length > 0) {
        console.log(`🔒 Channel restriction enabled for ${config.ALLOWED_CHANNEL_IDS.length} channel(s)`);
    } else {
        console.log(`🌐 No channel restrictions - bot works in all channels`);
    }
    
    // Set bot status
    client.user.setActivity('/watch', { type: 3 }); // Type 3 = Watching
});

// Error handling
client.on('error', (error) => {
    console.error('❌ Discord client error:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled promise rejection:', error);
});

// Login to Discord
client.login(config.DISCORD_BOT_TOKEN)
    .then(() => {
        console.log('🔐 Logging in to Discord...');
    })
    .catch((error) => {
        console.error('❌ Failed to login:', error);
        process.exit(1);
    });