## Installation

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/discord-tv-bot.git
   cd discord-tv-bot
```

2. **Install dependencies**
```bash
   npm install
```

3. **Configure environment variables**
```bash
   cp .env.example .env
```
   Edit `.env` and add your credentials:
   - `DISCORD_BOT_TOKEN`: Your Discord bot token
   - `DISCORD_CLIENT_ID`: Your Discord application client ID
   - `TMDB_API_KEY`: Your TMDB API key

4. **Run the bot**
```bash
   npm start
```

## Usage

1. Use `/watch` command in any Discord channel
2. Start typing a TV show name - autocomplete suggestions will appear
3. Select a show from the suggestions
4. Choose a season from the dropdown menu
5. Choose an episode from the dropdown menu
6. Click the generated link to watch!

## Project Structure

[Include the folder structure we defined]

## Contributing

Pull requests are welcome! For major changes, please open an issue first.

## License

[MIT](LICENSE)

## Credits