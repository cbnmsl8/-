import { Message } from "discord.js";
import { Client } from "..";

interface Event {
  name: string,
  run: (client: Client, ...args: Array<any>) => any;
}

interface Command {
  name: string;
  aliases: Array<string>,
  run: (client: Client, message: Message, args: Array<string>) => any;
}

export { Event, Command }