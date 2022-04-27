import { Command } from "..";

const command: Command = {
  name: "leave",
  aliases: ["disconnect"],
  run: async (client, message, args) => {
    try {
      const { guildId, member } = message;
      const bVoice = client.distube.voices.get(guildId!);
      const mVoice = member!.voice.channel;

      if(!bVoice)
        return await message.reply({
          embeds: [{
            description: `❌ **我不在語音頻道裡!**`,
            color: "RANDOM"
          }]
        });
      if(!mVoice || bVoice.voiceState!.channelId !== mVoice.id)
        return await message.reply({
          embeds: [{
            description: `❌ **你必須跟我在同個語音頻道中!**`,
            color: "RANDOM"
          }]
        });

      bVoice.leave();
    } catch(err) {
      console.log(err);
    }
  }
}

export default command;