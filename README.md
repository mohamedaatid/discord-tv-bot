# Discord TV Bot

Effortlessly find and watch your favorite TV shows and movies directly through Discord with the **Discord TV Bot**! Powered by the TMDB API, this bot provides a seamless experience with autocomplete suggestions and interactive menus to browse and stream episodes in just a few clicks.

## Features

- **Autocomplete Search**: Start typing a TV show or movie name, and the bot suggests matches in real-time.
- **Interactive Menus**: Select seasons and episodes using dropdown menus for a user-friendly experience.
- **Instant Streaming Links**: Get direct links to watch your selected episode or movie.
- **Lightweight and Fast**: Built with Node.js and Discord.js for optimal performance.
- **Open Source**: Licensed under MIT, contributions are welcome!

## Installation

1. **Install Dependencies**

   Install the required packages by running:

   ```bash
   npm install discord.js dotenv node-fetch @discordjs/rest @discordjs/builders moviedb-promise axios
   ```

2. **Configure Environment Variables**

   ```bash
   cp .env.example .env
   ```

   Open the `.env` file in a text editor and add your credentials:

   ```
   DISCORD_BOT_TOKEN=your_discord_bot_token_here
   DISCORD_CLIENT_ID=your_discord_client_id_here
   TMDB_API_KEY=your_tmdb_api_key_here
   ```

   - `DISCORD_BOT_TOKEN`: Obtain from the [Discord Developer Portal](https://discord.com/developers/applications).
   - `DISCORD_CLIENT_ID`: Found in the same portal under your application’s “General Information” tab.
   - `TMDB_API_KEY`: Get from the [TMDB website](https://www.themoviedb.org/documentation/api) after creating an account.

3. **Run the Bot**

   ```bash
   npm start
   ```

   The bot should now be online and ready to use in your Discord server!

## Usage

1. **Invite the Bot**: Add the bot to your Discord server using the OAuth2 URL generated in the Discord Developer Portal (ensure it has the `bot` and `applications.commands` scopes).
2. **Use the `/watch` Command**:
   - Type `/watch` in any channel where the bot has permission.
   - Start typing a TV show or movie name to see autocomplete suggestions.
   - Select a show or movie from the suggestions.
   - Choose a season (for TV shows) and an episode from the interactive dropdown menus.
   - Click the generated streaming link to watch instantly!

## Example

```
/watch
[Type "Breaking Bad"]
[Select "Breaking Bad" from autocomplete]
[Choose Season 1]
[Choose Episode 1]
[Click the provided link to watch]
```

## Troubleshooting

- **Bot not responding?** Check your `.env` file for correct credentials and ensure the bot has proper permissions in your server.
- **No streaming links?** Verify your TMDB API key and ensure the show/episode is available on TMDB.
- **Errors during `npm start`?** Ensure all dependencies are installed correctly and Node.js (v16.9.0 or higher) is up-to-date.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute as per the license terms.

## Acknowledgments

- Built with [Discord.js](https://discord.js.org/) for Discord API integration.
- Powered by [The Movie Database (TMDB)](https://www.themoviedb.org/) for show and movie data.
- Thanks to all contributors and the open-source community!

## Contact

For questions, suggestions, or issues, reach out via the project’s issue tracker or contact the maintainer.

---

Happy watching! 🎬