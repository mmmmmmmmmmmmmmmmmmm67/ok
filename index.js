const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const express = require('express'); // هذا السطر ضروري لسيرفر الويب

// إعداد سيرفر الويب عشان UptimeRobot
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot is active and running 24/7!');
});

app.listen(PORT, () => {
    console.log(`Web server is listening on port ${PORT}`);
});

// إعدادات بوت ديسكورد
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.once('ready', () => {
    console.log(`Logged in successfully as ${client.user.tag}!`);

    const channelId = process.env.VOICE_CHANNEL_ID;
    const guildId = process.env.GUILD_ID;

    if (!channelId || !guildId) {
        console.log("Voice channel ID or Guild ID is missing in environment variables!");
        return;
    }

    const guild = client.guilds.cache.get(guildId);
    if (!guild) return;

    joinVoiceChannel({
        channelId: channelId,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
    });

    console.log("Successfully joined the voice channel!");
});

client.login(process.env.TOKEN);
