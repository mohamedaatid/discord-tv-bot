const tmdbService = require('../services/tmdbService');
const embedBuilder = require('../utils/embedBuilder');
const errorHandler = require('../utils/errorHandler');
const idParser = require('../utils/idParser');
const config = require('../config/config');

module.exports = {
    customId: config.CUSTOM_ID_PREFIXES.EPISODE,
    
    async execute(interaction) {
        try {
            if (!interaction.deferred) {
                await interaction.deferUpdate().catch(() => {});
            }

            // Parse the custom ID to get show ID and season number
            const { showId, seasonNumber } = idParser.parseCustomId(interaction.customId);
            
            // Get selected episode number from the select menu
            const selectedValue = interaction.values[0];
            const episodeNumber = parseInt(selectedValue);

            if (isNaN(showId) || isNaN(seasonNumber) || isNaN(episodeNumber)) {
                return interaction.editReply({
                    embeds: [errorHandler.createErrorEmbed('Invalid selection. Please try again.')],
                    components: []
                });
            }

            // Fetch show and episode details
            const showDetails = await tmdbService.getShowDetails(showId);
            const seasonData = await tmdbService.getSeasonEpisodes(showId, seasonNumber);
            const episode = seasonData.episodes.find(ep => ep.episode_number === episodeNumber);

            // Build VidKing watch URL
            const watchUrl = `${config.VIDKING_BASE_URL}/${showId}/${seasonNumber}/${episodeNumber}`;

            // Create final embed with watch button
            const { embed, row } = embedBuilder.createFinalEmbed(
                showDetails.name,
                seasonNumber,
                episodeNumber,
                episode ? episode.name : `Episode ${episodeNumber}`,
                episode ? episode.overview : null,
                watchUrl
            );

            // Update message with final link
            await interaction.editReply({
                embeds: [embed],
                components: [row]
            });

        } catch (error) {
            console.error('❌ Error in episode selection:', error);
            await interaction.editReply({
                embeds: [errorHandler.createErrorEmbed('Failed to generate watch link. Please try again.')],
                components: []
            });
        }
    }
};