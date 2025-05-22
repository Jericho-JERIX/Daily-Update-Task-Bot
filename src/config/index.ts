import { readFileSync } from "fs";

export interface Config {
    hhmm: string;
    timezone: string;
    thread: {
        reason: string;
        message: string;
    };
    channelId: string;
}

const data = readFileSync("config.json", "utf8");

export const config: Config = JSON.parse(data);
