const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config/config');
const idParser = require('./idParser');

module.exports = {
    /**
     * Create embed for season selection
     */
    createSeasonSelectEmbed(showName, overview, seasonCount) {
        const embed = new EmbedBuilder()
            .setTitle(`📺 ${showName}`)
            .setDescription(overview ? (overview.length > 200 ? overview.substring(0, 200) + '...' : overview) : 'No description available.')
            .addFields({
                name: '🎬 Select a Season',
                value: `This show has ${seasonCount} season${seasonCount !== 1 ? 's' : ''} available.`
            })
            .setColor(config.COLORS.PRIMARY)
            .setTimestamp();

        return embed;
    },

    /**
     * Create season select menu
     */
    createSeasonSelectMenu(showId, seasons) {
        const options = seasons.map(season => ({
            label: `Season ${season.season_number}`,
            description: `${season.episode_count} episode${season.episode_count !== 1 ? 's' : ''}`,
            value: season.season_number.toString()
        }));

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId(idParser.buildCustomId(config.CUSTOM_ID_PREFIXES.SEASON, showId))
            .setPlaceholder('Choose a season')
            .addOptions(options);

        return new ActionRowBuilder().addComponents(selectMenu);
    },

    /**
     * Create embed for episode selection
     */
    createEpisodeSelectEmbed(showName, seasonNumber, seasonOverview, episodeCount) {
        const embed = new EmbedBuilder()
            .setTitle(`📺 ${showName} - Season ${seasonNumber}`)
            .setDescription(seasonOverview ? (seasonOverview.length > 200 ? seasonOverview.substring(0, 200) + '...' : seasonOverview) : 'No description available.')
            .addFields({
                name: '🎬 Select an Episode',
                value: `Season ${seasonNumber} has ${episodeCount} episode${episodeCount !== 1 ? 's' : ''} available.`
            })
            .setColor(config.COLORS.PRIMARY)
            .setTimestamp();

        return embed;
    },

    /**
     * Create episode select menu
     */
    createEpisodeSelectMenu(showId, seasonNumber, episodes) {
        const options = episodes.map(episode => {
            const episodeName = episode.name || `Episode ${episode.episode_number}`;
            const truncatedName = episodeName.length > 100 ? episodeName.substring(0, 97) + '...' : episodeName;
            
            return {
                label: `E${episode.episode_number}: ${truncatedName}`,
                description: episode.air_date ? `Aired: ${episode.air_date}` : 'Air date unknown',
                value: episode.episode_number.toString()
            };
        });

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId(idParser.buildCustomId(config.CUSTOM_ID_PREFIXES.EPISODE, showId, seasonNumber))
            .setPlaceholder('Choose an episode')
            .addOptions(options);

        return new ActionRowBuilder().addComponents(selectMenu);
    },

    /**
     * Create final embed with watch link
     */
    createFinalEmbed(showName, seasonNumber, episodeNumber, episodeName, episodeOverview, watchUrl) {
        const embed = new EmbedBuilder()
            .setTitle(`🎬 ${showName}`)
            .setDescription(`**Season ${seasonNumber} - Episode ${episodeNumber}**\n${episodeName}`)
            .setColor(config.COLORS.SUCCESS)
            .setTimestamp();

        if (episodeOverview) {
            const truncatedOverview = episodeOverview.length > 300 
                ? episodeOverview.substring(0, 297) + '...' 
                : episodeOverview;
            embed.addFields({
                name: '📖 Summary',
                value: truncatedOverview
            });
        }

        embed.addFields({
            name: '🔗 Watch Now',
            value: 'Click the button below to start watching!'
        });

        // Create watch button
        const button = new ButtonBuilder()
            .setLabel('Watch Episode')
            .setStyle(ButtonStyle.Link)
            .setURL(watchUrl)
            .setEmoji('▶️');

        const row = new ActionRowBuilder().addComponents(button);

        return { embed, row };
    }
};