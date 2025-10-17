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
    await interactionHandler.handleInteraction(interaction, client);
});

// Bot ready event
client.once('clientReady', () => {
    console.log(`✅ Bot is online as ${client.user.tag}`);
    console.log(`📊 Serving ${client.guilds.cache.size} servers`);
    
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