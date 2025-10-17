require('dotenv').config();

module.exports = {
    // Discord Configuration
    DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID, // Optional: for testing
    
    // TMDB Configuration
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    TMDB_BASE_URL: process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3',
    
    // External Services
    VIDKING_BASE_URL: process.env.VIDKING_BASE_URL || 'https://www.vidking.net/embed/tv',
    
    // Custom ID Prefixes
    CUSTOM_ID_PREFIXES: {
        SEASON: 'season',
        EPISODE: 'episode'
    },
    
    // Bot Configuration
    NODE_ENV: process.env.NODE_ENV || 'development',
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    
    // Autocomplete limits
    MAX_AUTOCOMPLETE_RESULTS: 25,
    
    // Select menu limits
    MAX_SELECT_OPTIONS: 25,
    
    // Channel Restrictions
    ALLOWED_CHANNEL_IDS: process.env.ALLOWED_CHANNEL_IDS 
        ? process.env.ALLOWED_CHANNEL_IDS.split(',').map(id => id.trim())
        : [],
    
    // Colors for embeds
    COLORS: {
        PRIMARY: 0x5865F2,    // Blurple
        SUCCESS: 0x57F287,    // Green
        ERROR: 0xED4245,      // Red
        WARNING: 0xFEE75C     // Yellow
    }
};