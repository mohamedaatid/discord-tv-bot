const config = require('../config/config');

module.exports = {
    /**
     * Build a custom ID string for select menus
     * @param {string} prefix - Prefix (season/episode)
     * @param {number} showId - TMDB show ID
     * @param {number} seasonNumber - Season number (optional)
     * @param {number} episodeNumber - Episode number (optional)
     * @returns {string} Custom ID string
     */
    buildCustomId(prefix, showId, seasonNumber = null, episodeNumber = null) {
        let customId = `${prefix}:${showId}`;
        
        if (seasonNumber !== null) {
            customId += `-${seasonNumber}`;
        }
        
        if (episodeNumber !== null) {
            customId += `-${episodeNumber}`;
        }
        
        return customId;
    },

    /**
     * Parse a custom ID string to extract components
     * @param {string} customId - Custom ID string
     * @returns {Object} Parsed components
     */
    parseCustomId(customId) {
        try {
            // Format: "prefix:showId-seasonNumber-episodeNumber"
            const [prefix, ids] = customId.split(':');
            const [showId, seasonNumber, episodeNumber] = ids.split('-').map(id => parseInt(id));

            return {
                prefix,
                showId: showId || null,
                seasonNumber: seasonNumber || null,
                episodeNumber: episodeNumber || null
            };
        } catch (error) {
            console.error('❌ Error parsing custom ID:', error);
            return {
                prefix: null,
                showId: null,
                seasonNumber: null,
                episodeNumber: null
            };
        }
    },

    /**
     * Validate if a custom ID has the expected prefix
     * @param {string} customId - Custom ID to validate
     * @param {string} expectedPrefix - Expected prefix
     * @returns {boolean} True if valid
     */
    isValidPrefix(customId, expectedPrefix) {
        return customId.startsWith(`${expectedPrefix}:`);
    }
};