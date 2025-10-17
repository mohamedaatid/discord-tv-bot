const tmdbService = require('../services/tmdbService');

module.exports = {
    name: 'autocomplete',
    
    async execute(interaction) {
        try {
            // Get the current user input
            const focusedValue = interaction.options.getFocused();

            // If input is empty, return empty array
            if (!focusedValue || focusedValue.trim().length === 0) {
                return interaction.respond([]);
            }

            // Search for shows
            const shows = await tmdbService.searchShows(focusedValue);

            // If no results found, return a "not found" option
            if (shows.length === 0) {
                return interaction.respond([
                    {
                        name: '❌ No shows found - Try a different search term',
                        value: '404_NO_RESULTS'
                    }
                ]);
            }

            // Format results for autocomplete
            const choices = shows.map(show => {
                // Format: "Show Name (Year)"
                const year = show.first_air_date 
                    ? ` (${show.first_air_date.split('-')[0]})`
                    : '';
                
                const name = `${show.name}${year}`;
                
                // Discord autocomplete names have a 100 character limit
                const truncatedName = name.length > 100 
                    ? name.substring(0, 97) + '...'
                    : name;

                return {
                    name: truncatedName,
                    value: show.id.toString()
                };
            });

            await interaction.respond(choices);

        } catch (error) {
            console.error('❌ Error in autocomplete:', error);
            // Return empty array on error to prevent Discord API errors
            await interaction.respond([]);
        }
    }
};