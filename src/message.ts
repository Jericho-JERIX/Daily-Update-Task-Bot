import { Client, TextChannel, ThreadAutoArchiveDuration } from "discord.js";
import { Config } from "./config";
import { ts, getMagicWord } from "./utils/text-sub";

export class Message {

    config: Config
    client: Client

    constructor(config: Config, client: Client) {
        this.config = config;
        this.client = client;
    }

    async createDailyThread() {

        const now = new Date()
        const day = now.toLocaleDateString('en-EN', { weekday: 'long' })

        if (day === "Saturday" || day === "Sunday") {
            return
        }

        const channel = this.client.channels.cache.get(this.config.channelId);
        
        if (!channel) {
            throw new Error("Channel not found");
        }
        
        if (!(channel instanceof TextChannel)) {
            throw new Error("Channel is not text-based");
        }

        const magicWord = getMagicWord()
        
        return channel.threads.create({
            name: ts(this.config.thread.message, magicWord),
            reason: ts(this.config.thread.reason, magicWord),
            autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
        });
    }
}