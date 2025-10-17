const tmdbService = require('../services/tmdbService');
const embedBuilder = require('../utils/embedBuilder');
const errorHandler = require('../utils/errorHandler');
const idParser = require('../utils/idParser');
const config = require('../config/config');

module.exports = {
    customId: config.CUSTOM_ID_PREFIXES.SEASON,
    
    async execute(interaction) {
        try {
            // Defer update while fetching data
            await interaction.deferUpdate();

            // Parse the custom ID to get show ID
            const { showId } = idParser.parseCustomId(interaction.customId);
            
            // Get selected season number from the select menu
            const selectedValue = interaction.values[0];
            const seasonNumber = parseInt(selectedValue);

            if (isNaN(showId) || isNaN(seasonNumber)) {
                return interaction.editReply({
                    embeds: [errorHandler.createErrorEmbed('Invalid selection. Please try again.')],
                    components: []
                });
            }

            // Fetch show details for the name
            const showDetails = await tmdbService.getShowDetails(showId);
            
            // Fetch season episodes
            const seasonData = await tmdbService.getSeasonEpisodes(showId, seasonNumber);

            // Check if season has episodes
            if (!seasonData.episodes || seasonData.episodes.length === 0) {
                return interaction.editReply({
                    embeds: [errorHandler.createNotFoundEmbed('episodes', showDetails.name, seasonNumber)],
                    components: []
                });
            }

            // Build episode select menu
            const episodeSelectRow = embedBuilder.createEpisodeSelectMenu(
                showId,
                seasonNumber,
                seasonData.episodes.slice(0, config.MAX_SELECT_OPTIONS)
            );

            // Create embed
            const embed = embedBuilder.createEpisodeSelectEmbed(
                showDetails.name,
                seasonNumber,
                seasonData.overview,
                seasonData.episodes.length
            );

            // Update message with episode selection
            await interaction.editReply({
                embeds: [embed],
                components: [episodeSelectRow]
            });

        } catch (error) {
            console.error('❌ Error in season selection:', error);
            await interaction.editReply({
                embeds: [errorHandler.createErrorEmbed('Failed to fetch episodes. Please try again.')],
                components: []
            });
        }
    }
};