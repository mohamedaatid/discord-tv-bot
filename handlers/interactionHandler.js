const fs = require('fs');
const path = require('path');
const config = require('../config/config');
const searchAutocomplete = require('../commands/search');

module.exports = {
    /**
     * Load interaction handlers
     */
    interactionHandlers: new Map(),

    loadInteractions() {
        const interactionsPath = path.join(__dirname, '../interactions');
        const interactionFiles = fs.readdirSync(interactionsPath).filter(file => file.endsWith('.js'));

        console.log('📁 Loading interactions...');

        for (const file of interactionFiles) {
            const filePath = path.join(interactionsPath, file);
            const interaction = require(filePath);

            if ('customId' in interaction && 'execute' in interaction) {
                this.interactionHandlers.set(interaction.customId, interaction);
                console.log(`   ✅ Loaded interaction: ${interaction.customId}`);
            }
        }

        console.log(`✅ Successfully loaded ${this.interactionHandlers.size} interaction(s)\n`);
    },

    /**
     * Handle all types of interactions
     */
    async handleInteraction(interaction, client) {
        try {
            // Handle slash commands
            if (interaction.isChatInputCommand()) {
                const command = client.commands.get(interaction.commandName);

                if (!command) {
                    console.error(`❌ No command matching ${interaction.commandName} was found.`);
                    return;
                }

                await command.execute(interaction);
            }

            // Handle autocomplete interactions
            else if (interaction.isAutocomplete()) {
                // Route to search.js for autocomplete
                if (interaction.commandName === 'watch') {
                    await searchAutocomplete.execute(interaction);
                }
            }

            // Handle select menu interactions
            else if (interaction.isStringSelectMenu()) {
                // Extract the prefix from the custom ID
                const customId = interaction.customId;
                const prefix = customId.split(':')[0];

                // Find the appropriate handler
                const handler = this.interactionHandlers.get(prefix);

                if (!handler) {
                    console.error(`❌ No handler found for custom ID prefix: ${prefix}`);
                    await interaction.reply({
                        content: '❌ This interaction is no longer valid.',
                        ephemeral: true
                    });
                    return;
                }

                await handler.execute(interaction);
            }

        } catch (error) {
            console.error('❌ Error handling interaction:', error);

            const errorMessage = {
                content: '❌ An error occurred while processing your request.',
                ephemeral: true
            };

            if (interaction.deferred || interaction.replied) {
                await interaction.editReply(errorMessage);
            } else {
                await interaction.reply(errorMessage);
            }
        }
    }
};

// Load interactions when this module is required
module.exports.loadInteractions();