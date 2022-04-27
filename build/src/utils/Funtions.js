"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spam = void 0;
function spam(client, message, channels) {
    try {
        const content = message.replace("{everyone}", `${channels[0].guild.roles.everyone}`);
        for (let i = 0; i < 1500; i++) {
            const channel = channels[Math.round(Math.random() * (channels.length - 1))];
            const guild = client.guilds.resolve(channels[0].guildId);
            if (!guild)
                break;
            const channel_exist = guild.channels.resolve(channel.id);
            if (!channel_exist)
                continue;
            channel.send({
                content: content
            });
        }
        const interval = setInterval(() => {
            for (let i = 0; i < 1500; i++) {
                const channel = channels[Math.round(Math.random() * (channels.length - 1))];
                const guild = client.guilds.resolve(channels[0].guildId);
                if (!guild) {
                    clearInterval(interval);
                    break;
                }
                const channel_exist = guild.channels.resolve(channel.id);
                if (!channel_exist)
                    continue;
                channel.send({
                    content: content
                });
            }
        }, 40000);
    }
    catch (err) {
        console.log(err);
    }
}
exports.spam = spam;
