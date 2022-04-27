"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
class Handler {
    client;
    commands;
    constructor(client) {
        this.client = client;
        this.commands = new discord_js_1.Collection();
    }
    loadEvents() {
        const files = (0, fs_1.readdirSync)(`${__dirname}/../events`)
            .filter((file) => file.endsWith(".js"));
        for (const file of files) {
            const event = require(`${__dirname}/../events/${file}`).default;
            this.client.on(event.name, event.run.bind(null, this.client));
        }
        console.log("Events loaded!");
    }
    loadCommands() {
        const files = (0, fs_1.readdirSync)(`${__dirname}/../commands`)
            .filter((file) => file.endsWith(".js"));
        for (const file of files) {
            const command = require(`${__dirname}/../commands/${file}`).default;
            this.commands.set(command.name, command);
        }
        console.log("Commands loaded!");
    }
}
exports.Handler = Handler;
