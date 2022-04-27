import { Collection } from "discord.js";
import { readdirSync } from "fs";
import { Client, Command, Event } from "..";

class Handler {
  private readonly client: Client;
  public readonly commands: Collection<string, Command>;

  constructor(client: Client) {
    this.client = client;
    this.commands = new Collection();
  }

  public loadEvents() {
    const files = readdirSync(`${__dirname}/../events`)
      .filter((file) => file.endsWith(".js"));

    for(const file of files) {
      const event: Event = require(`${__dirname}/../events/${file}`).default;

      this.client.on(event.name, event.run.bind(null, this.client));
    }

    console.log("Events loaded!");
  }

  public loadCommands() {
    const files = readdirSync(`${__dirname}/../commands`)
      .filter((file) => file.endsWith(".js"));

    for(const file of files) {
      const command: Command = require(`${__dirname}/../commands/${file}`).default;

      this.commands.set(command.name, command);
    }

    console.log("Commands loaded!");
  }
}

export { Handler }