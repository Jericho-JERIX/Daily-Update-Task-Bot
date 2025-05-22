import { config } from "../config";

export function ts(text: string, args: Record<string, any>): string {
    return text.replace(/\{([^{}]+)\}/g, (match, p1) => args[p1] || match);
}

export function getMagicWord() {
    
    const now = new Date()
    
    return {
        date: now.toLocaleDateString(config.timezone),
        day: now.toLocaleDateString('en-EN', { weekday: 'long' }),
    }
}
