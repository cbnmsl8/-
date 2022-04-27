"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const discord_js_1 = require("discord.js");
const distube_1 = require("distube");
const _1 = require(".");
class Client extends discord_js_1.Client {
    config;
    handler;
    distube;
    constructor() {
        super({
            shards: "auto",
            restWsBridgeTimeout: 1000,
            restTimeOffset: 0,
            rejectOnRateLimit: () => false,
            intents: [
                "GUILDS",
                "GUILD_MESSAGES",
                "GUILD_VOICE_STATES"
            ],
            sweepers: {
                bans: {
                    interval: 3600,
                    filter: () => () => true
                },
                emojis: {
                    interval: 3600,
                    filter: () => () => true
                },
                invites: {
                    interval: 3600,
                    filter: () => () => true
                },
                guildMembers: {
                    interval: 3600,
                    filter: () => () => true
                },
                messages: {
                    interval: 3600,
                    filter: () => () => true
                },
                presences: {
                    interval: 3600,
                    filter: () => () => true
                },
                reactions: {
                    interval: 3600,
                    filter: () => () => true
                },
                stageInstances: {
                    interval: 3600,
                    filter: () => () => true
                },
                stickers: {
                    interval: 3600,
                    filter: () => () => true
                },
                threadMembers: {
                    interval: 3600,
                    filter: () => () => true
                },
                threads: {
                    interval: 3600,
                    filter: () => () => true
                },
                users: {
                    interval: 3600,
                    filter: () => () => true
                },
                voiceStates: {
                    interval: 3600,
                    filter: () => () => true
                }
            }
        });
        this.config = require(`${__dirname}/../config.json`);
        this.handler = new _1.Handler(this);
        this.distube = new distube_1.DisTube(this, {
            youtubeDL: false,
            emitNewSongOnly: true,
            leaveOnEmpty: true,
            leaveOnFinish: true,
            leaveOnStop: true,
            savePreviousSongs: false,
            searchSongs: 0,
            emptyCooldown: 30,
            nsfw: true,
            emitAddListWhenCreatingQueue: false,
            emitAddSongWhenCreatingQueue: false
        });
    }
    async start() {
        this.handler.loadEvents();
        this.handler.loadCommands();
        await this.login(this.config.token);
    }
}
exports.Client = Client;
