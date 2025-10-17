const axios = require('axios');
const config = require('../config/config');

class TMDBService {
    constructor() {
        this.apiKey = config.TMDB_API_KEY;
        this.baseUrl = config.TMDB_BASE_URL;
        this.axiosInstance = axios.create({
            baseURL: this.baseUrl,
            params: {
                api_key: this.apiKey
            }
        });
    }

    /**
     * Search for TV shows by query
     * @param {string} query - Search query
     * @returns {Promise<Array>} Array of shows
     */
    async searchShows(query) {
        try {
            if (!query || query.trim().length === 0) {
                return [];
            }

            const response = await this.axiosInstance.get('/search/tv', {
                params: {
                    query: query.trim(),
                    include_adult: false
                }
            });

            return response.data.results.slice(0, config.MAX_AUTOCOMPLETE_RESULTS);
        } catch (error) {
            console.error('❌ Error searching shows:', error.message);
            return [];
        }
    }

    /**
     * Get TV show details including seasons
     * @param {number} showId - TMDB show ID
     * @returns {Promise<Object>} Show details
     */
    async getShowDetails(showId) {
        try {
            const response = await this.axiosInstance.get(`/tv/${showId}`);
            return response.data;
        } catch (error) {
            console.error(`❌ Error fetching show details for ID ${showId}:`, error.message);
            throw new Error('Failed to fetch show details');
        }
    }

    /**
     * Get episodes for a specific season
     * @param {number} showId - TMDB show ID
     * @param {number} seasonNumber - Season number
     * @returns {Promise<Object>} Season details with episodes
     */
    async getSeasonEpisodes(showId, seasonNumber) {
        try {
            const response = await this.axiosInstance.get(`/tv/${showId}/season/${seasonNumber}`);
            return response.data;
        } catch (error) {
            console.error(`❌ Error fetching episodes for show ${showId}, season ${seasonNumber}:`, error.message);
            throw new Error('Failed to fetch season episodes');
        }
    }
}

module.exports = new TMDBService();