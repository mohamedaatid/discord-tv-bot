const { SlashCommandBuilder } = require('discord.js');
const tmdbService = require('../services/tmdbService');
const embedBuilder = require('../utils/embedBuilder');
const errorHandler = require('../utils/errorHandler');
const idParser = require('../utils/idParser');
const config = require('../config/config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('watch')
        .setDescription('Find and watch TV show episodes')
        .addStringOption(option =>
            option
                .setName('show')
                .setDescription('Search for a TV show')
                .setRequired(true)
                .setAutocomplete(true)
        ),

    async execute(interaction) {
        try {
            // Defer reply while fetching data
            await interaction.deferReply();

            const selectedValue = interaction.options.getString('show');

            // Check if user selected the "not found" option
            if (selectedValue === '404_NO_RESULTS') {
                return interaction.editReply({
                    embeds: [errorHandler.createNotFoundEmbed('search')],
                    ephemeral: true
                });
            }

            // Parse show ID from the selected value (format: "showId")
            const showId = parseInt(selectedValue);

            if (isNaN(showId)) {
                return interaction.editReply({
                    content: '❌ Invalid show selection. Please try again.',
                    ephemeral: true
                });
            }

            // Fetch show details
            const showDetails = await tmdbService.getShowDetails(showId);

            // Filter out Season 0 (Specials) and invalid seasons
            const seasons = showDetails.seasons.filter(
                season => season.season_number > 0 && season.episode_count > 0
            );

            // Check if show has any valid seasons
            if (seasons.length === 0) {
                return interaction.editReply({
                    embeds: [errorHandler.createNotFoundEmbed('seasons', showDetails.name)]
                });
            }

            // Build season select menu
            const seasonSelectRow = embedBuilder.createSeasonSelectMenu(
                showId,
                seasons.slice(0, config.MAX_SELECT_OPTIONS)
            );

            // Create embed
            const embed = embedBuilder.createSeasonSelectEmbed(
                showDetails.name,
                showDetails.overview,
                seasons.length
            );

            // Send season selection
            await interaction.editReply({
                embeds: [embed],
                components: [seasonSelectRow]
            });

        } catch (error) {
            console.error('❌ Error in watch command:', error);
            
            const errorMessage = interaction.deferred 
                ? { embeds: [errorHandler.createErrorEmbed('Failed to fetch show data. Please try again.')], components: [] }
                : { content: '❌ An error occurred. Please try again.', ephemeral: true };
            
            if (interaction.deferred) {
                await interaction.editReply(errorMessage);
            } else {
                await interaction.reply(errorMessage);
            }
        }
    }
};