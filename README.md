# 🎬 Discord TV Bot

A powerful Discord bot that allows users to search and watch TV show episodes directly through Discord using TMDB API and VidKing streaming service.

## ✨ Features

- 🔍 **Smart Search** - Fast autocomplete search for TV shows using TMDB database
- 📺 **Season & Episode Selection** - Easy-to-use dropdown menus for browsing seasons and episodes
- 🎯 **Direct Streaming Links** - Instant access to episode streaming via VidKing
- 🔒 **Channel Restrictions** - Optional channel whitelisting for controlled bot access
- 🎨 **Rich Embeds** - Beautiful, informative Discord embeds with show details
- ⚡ **Fast & Responsive** - Optimized API calls and caching for quick responses

## 📋 Prerequisites

Before you begin, ensure you have the following:

- [Node.js](https://nodejs.org/) (v16.9.0 or higher)
- [Discord Bot Token](https://discord.com/developers/applications)
- [TMDB API Key](https://www.themoviedb.org/settings/api)
- Basic knowledge of Discord bot setup

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/mohamedaatid/discord-tv-bot.git
cd discord-tv-bot
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:
```properties
# Discord Configuration
DISCORD_BOT_TOKEN=your_discord_bot_token_here
DISCORD_CLIENT_ID=your_discord_client_id_here
DISCORD_GUILD_ID=your_guild_id_here_optional

# TMDB API Configuration
TMDB_API_KEY=your_tmdb_api_key_here
TMDB_BASE_URL=https://api.themoviedb.org/3

# Streaming Service
VIDKING_BASE_URL=https://www.vidking.net/embed/tv

# Channel Restrictions (Optional - comma-separated channel IDs)
ALLOWED_CHANNEL_IDS=1234567890123456789,9876543210987654321

# Bot Configuration
NODE_ENV=production
LOG_LEVEL=info
```

### 4. Register Slash Commands
```bash
node deploy-commands.js
```

### 5. Start the Bot
```bash
npm start
```

## 📁 Project Structure
```
discord-tv-bot/
│
├── config/
│   └── config.js                 # Configuration and environment variables
│
├── services/
│   └── tmdbService.js            # TMDB API integration
│
├── commands/
│   ├── watch.js                  # Main /watch slash command
│   └── search.js                 # Autocomplete handler for TV show search
│
├── interactions/
│   ├── seasonSelect.js           # Season selection handler
│   └── episodeSelect.js          # Episode selection handler
│
├── utils/
│   ├── idParser.js               # Parse custom interaction IDs
│   ├── embedBuilder.js           # Create Discord embeds
│   └── errorHandler.js           # Error handling and messages
│
├── handlers/
│   ├── commandHandler.js         # Load and register commands
│   └── interactionHandler.js    # Route interactions to handlers
│
├── bot.js                        # Main bot entry point
├── deploy-commands.js            # Command deployment script
├── package.json                  # Dependencies and scripts
├── .env                          # Environment variables (gitignored)
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── LICENSE                       # MIT License
└── README.md                     # This file
```

## 🎮 Usage

### `/watch` Command

1. Type `/watch` in any allowed channel
2. Start typing a TV show name
3. Select your show from the autocomplete suggestions
4. Choose a season from the dropdown menu
5. Select an episode from the dropdown menu
6. Click the **"Watch Now"** button to start streaming!

### Example Flow
```
User: /watch Breaking Bad
Bot: [Shows season selection menu]
User: [Selects Season 1]
Bot: [Shows episode selection menu]
User: [Selects Episode 1: Pilot]
Bot: [Displays episode info with "Watch Now" button]
```

## ⚙️ Configuration

### Channel Restrictions

To restrict the bot to specific channels, add channel IDs to your `.env` file:
```properties
ALLOWED_CHANNEL_IDS=1234567890123456789,9876543210987654321
```

Leave empty or remove the line to allow bot usage in all channels.

### Customization

#### Embed Colors

Edit `config/config.js` to customize embed colors:
```javascript
COLORS: {
    PRIMARY: 0x5865F2,    // Blurple
    SUCCESS: 0x57F287,    // Green
    ERROR: 0xED4245,      // Red
    WARNING: 0xFEE75C     // Yellow
}
```

#### Search Results Limit

Adjust the number of autocomplete results:
```javascript
MAX_AUTOCOMPLETE_RESULTS: 25  // Discord's maximum is 25
```

#### Streaming Service

Change the streaming service by updating the `VIDKING_BASE_URL` in `.env`:
```properties
VIDKING_BASE_URL=https://your-streaming-service.com/embed/tv
```

## 🛠️ Development

### Running in Development Mode
```bash
npm run dev
```

### Testing Commands Locally

Use `DISCORD_GUILD_ID` in `.env` for faster command registration during development:
```properties
DISCORD_GUILD_ID=your_test_server_id
```

This registers commands only to your test server instead of globally.

### Logging

Set log level in `.env`:
```properties
LOG_LEVEL=debug  # Options: error, warn, info, debug
```

## 📦 Dependencies

### Core Dependencies

- **discord.js** (v14.x) - Discord API wrapper
- **axios** - HTTP client for TMDB API calls
- **dotenv** - Environment variable management

### Dev Dependencies

- **nodemon** - Auto-restart during development

## 🔧 Troubleshooting

### Bot Not Responding

1. Check if bot is online in Discord
2. Verify bot has proper permissions in the channel
3. Check console for error messages
4. Ensure slash commands are registered (`node deploy-commands.js`)

### Commands Not Appearing

1. Re-run `node deploy-commands.js`
2. Wait up to 1 hour for global commands to update
3. Use guild-specific registration for instant updates during testing

### TMDB API Errors

1. Verify your TMDB API key is valid
2. Check if you've exceeded rate limits (40 requests per 10 seconds)
3. Ensure `TMDB_BASE_URL` is correct in `.env`

### Channel Restriction Not Working

1. Verify channel IDs are correct (right-click channel → Copy ID)
2. Ensure Developer Mode is enabled in Discord
3. Check that IDs are comma-separated with no spaces

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the TV show data API
- [VidKing](https://www.vidking.net/) for streaming service
- [discord.js](https://discord.js.org/) for the amazing Discord library

## ⚠️ Disclaimer

This bot is for educational and personal use only. Ensure you comply with:
- TMDB API Terms of Service
- Discord Terms of Service
- Streaming service terms and copyright laws
- Local laws regarding media streaming

The developer is not responsible for misuse of this software.

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/mohamedaatid/discord-tv-bot?style=social)
![GitHub forks](https://img.shields.io/github/forks/mohamedaatid/discord-tv-bot?style=social)
![GitHub issues](https://img.shields.io/github/issues/mohamedaatid/discord-tv-bot)
![GitHub license](https://img.shields.io/github/license/mohamedaatid/discord-tv-bot)

---

Made with ❤️ by [Mohamed Aatid](https://github.com/mohamedaatid)