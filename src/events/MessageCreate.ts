import { Message } from "discord.js";
import { Event } from "..";

const event: Event = {
  name: "messageCreate",
  run: (client, message: Message) => {
    try {
      const prefix = client.config.prefix;
      const { guild, author, channel, content } = message;
      const args = content.slice(prefix.length).split(" ");
      const command_name = args.shift()?.toLowerCase();

      if(!guild || author.bot || channel.type !== "GUILD_TEXT" || !content.startsWith(prefix) || !command_name)
        return;

      const command = client.handler.commands
        .find((cmd, name) => command_name == name || cmd.aliases.includes(command_name));

      if(!command)
        return;

      command.run(client, message, args);
    } catch(err) {
      console.log(err);
    }
  }
}

export default event;