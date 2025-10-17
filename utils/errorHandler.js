const { EmbedBuilder } = require('discord.js');
const config = require('../config/config');

module.exports = {
    /**
     * Create "not found" embed for different scenarios
     */
    createNotFoundEmbed(type, showName = null, seasonNumber = null) {
        const embed = new EmbedBuilder()
            .setColor(config.COLORS.ERROR)
            .setTimestamp();

        switch (type) {
            case 'search':
                embed.setTitle('🔍 No Shows Found')
                    .setDescription('No TV shows match your search. Please try a different search term.');
                break;

            case 'seasons':
                embed.setTitle('🔍 No Seasons Found')
                    .setDescription(`The show "${showName}" doesn't have any season data available on TMDB.`);
                break;

            case 'episodes':
                embed.setTitle('🔍 No Episodes Found')
                    .setDescription(`Season ${seasonNumber} of "${showName}" doesn't have any episode data available on TMDB.`);
                break;

            default:
                embed.setTitle('❌ Not Found')
                    .setDescription('The requested content could not be found.');
        }

        return embed;
    },

    /**
     * Create generic error embed
     */
    createErrorEmbed(message) {
        return new EmbedBuilder()
            .setTitle('❌ Error')
            .setDescription(message || 'An unexpected error occurred. Please try again.')
            .setColor(config.COLORS.ERROR)
            .setTimestamp();
    },

    /**
     * Create autocomplete "not found" option
     */
    createAutocompleteNotFound() {
        return {
            name: '❌ No shows found - Try a different search term',
            value: '404_NO_RESULTS'
        };
    }
};