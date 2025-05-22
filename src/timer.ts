import { Client } from "discord.js"
import { Config } from "./config"
import { Message } from "./message"
import { convertSecondToHHMMSSMS } from "./utils/time"
import { getMagicWord } from "./utils/text-sub"

export class Timer {
    
    config: Config
    message: Message
    client: Client
    

    constructor(client: Client, config: Config) {
        this.config = config
        this.message = new Message(config, client)
        this.client = client
    }
    
    initTimer() {
        const now = new Date()
    
        const [tm, ts] = this.config.hhmm.split(":").map(Number)
    
        const targetToday = new Date()
        targetToday.setHours(tm, ts, 1, 0)
        
        if (now > targetToday) {
            targetToday.setDate(targetToday.getDate() + 1)
        }
    
        let timeDiff = targetToday.getTime() - now.getTime()
        
        const firstThreadTime = new Date(now.getTime() + timeDiff)
        const formatTimeleft = convertSecondToHHMMSSMS(timeDiff)

        const magicWord = getMagicWord()
        console.log(`🕒 First thread will start at ${firstThreadTime.toLocaleString(this.config.timezone)} (${formatTimeleft} ms)`)
        console.log(`🔑 Magic word:\n${JSON.stringify(magicWord)}\n--------------`)
        setTimeout(() => {
            this.message.createDailyThread()
            setInterval(this.message.createDailyThread, 24* 60 * 60 * 1000)
        }, timeDiff)
    }

    
}
