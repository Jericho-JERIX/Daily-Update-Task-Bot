import { BaseInteraction, Client, Events, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";
import { slashCommandList } from "./commands";
import { config } from "./config";
import { SlashCommandObject } from "./scripts/types/SlashCommandObject";
import { Timer } from "./timer";
import { getSlashCommandObject } from "./utils/slash-command";

dotenv.config();
let commands: SlashCommandObject;

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildIntegrations],
});

client.once(Events.ClientReady, async (client) => {

    const timer = new Timer(client, config)

	console.log(`✅ Ready! Logged in as ${client.user?.tag}`);
	commands = getSlashCommandObject(slashCommandList);
    timer.initTimer()
});

client.on("interactionCreate", async (interaction: BaseInteraction) => {
	if (interaction.isChatInputCommand()) {
		await commands[interaction.commandName].onCommandExecuted(interaction);
	} else if (interaction.isButton()) {
		await commands[
			String(interaction.message.interaction?.commandName)
		].onButtonPressed?.(interaction);
	} else if (interaction.isStringSelectMenu()) {
		await commands[
			String(interaction.message.interaction?.commandName)
		].onMenuSelected?.(interaction);
	} else if (interaction.isAutocomplete()) {
		await commands[String(interaction.commandName)].onAutoCompleteInputed?.(
			interaction
		);
	}
});

client.login(process.env.TOKEN);
