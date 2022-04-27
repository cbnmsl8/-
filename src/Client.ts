import { Client as DjsClient } from "discord.js";
import { DisTube } from "distube";
import { Handler } from ".";

class Client extends DjsClient {
  public readonly config: typeof import("../config.json");
  public readonly handler: Handler;
  public readonly distube: DisTube;
  
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
    this.handler = new Handler(this);
    this.distube = new DisTube(this, {
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

  public async start() {
    this.handler.loadEvents();
    this.handler.loadCommands();
    await this.login(this.config.token);
  }
}

export { Client }