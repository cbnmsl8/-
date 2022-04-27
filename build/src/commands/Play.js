"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command = {
    name: "play",
    aliases: ["p"],
    run: async (client, message, args) => {
        try {
            const prefix = client.config.prefix;
            const { guildId, member, channel } = message;
            const bVoice = client.distube.voices.get(guildId);
            const mVoice = member.voice.channel;
            const query = args.join(" ");
            if (!args.length)
                return await message.reply({
                    embeds: [{
                            title: "Play 指令",
                            description: `> ${prefix}play <歌曲名稱 | 網址>`,
                            color: "RANDOM"
                        }]
                });
            if (!mVoice)
                return await message.reply({
                    embeds: [{
                            description: `❌ **你必須在語音頻道中!**`,
                            color: "RANDOM"
                        }]
                });
            if (bVoice && bVoice.voiceState?.channelId !== mVoice.id)
                return await message.reply({
                    embeds: [{
                            description: `❌ **我們所在的語音頻道不相同!**`,
                            color: "RANDOM"
                        }]
                });
            if (!bVoice)
                await client.distube.voices.join(mVoice);
            await client.distube.play(mVoice, query, {
                member: member,
                message: message,
                textChannel: channel
            });
            await message.reply({
                embeds: [{
                        description: `✅ **將** \`${query}\` **加入播放清單!**`,
                        color: "RANDOM"
                    }]
            });
        }
        catch (err) {
            console.log(err);
        }
    }
};
exports.default = command;
