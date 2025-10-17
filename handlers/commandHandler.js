const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('../config/config');

module.exports = {
    /**
     * Load all commands from the commands directory
     */
    loadCommands(client) {
        const commands = [];
        const commandsPath = path.join(__dirname, '../commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        console.log('📁 Loading commands...');

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);

            // Skip files that don't export command data (like search.js which only has autocomplete)
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
                commands.push(command.data.toJSON());
                console.log(`   ✅ Loaded command: ${command.data.name}`);
            }
        }

        // Register commands with Discord
        this.registerCommands(commands);

        console.log(`✅ Successfully loaded ${commands.length} command(s)\n`);
    },

    /**
     * Register commands with Discord API
     */
    async registerCommands(commands) {
        const rest = new REST({ version: '10' }).setToken(config.DISCORD_BOT_TOKEN);

        try {
            console.log('🔄 Registering slash commands...');

            // Check if we're in development mode with a guild ID
            if (config.NODE_ENV === 'development' && config.DISCORD_GUILD_ID) {
                // Register commands to a specific guild (faster for testing)
                await rest.put(
                    Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, config.DISCORD_GUILD_ID),
                    { body: commands }
                );
                console.log('✅ Commands registered to test guild');
            } else {
                // Register commands globally (takes up to 1 hour to propagate)
                await rest.put(
                    Routes.applicationCommands(config.DISCORD_CLIENT_ID),
                    { body: commands }
                );
                console.log('✅ Commands registered globally');
            }
        } catch (error) {
            console.error('❌ Error registering commands:', error);
        }
    }
};