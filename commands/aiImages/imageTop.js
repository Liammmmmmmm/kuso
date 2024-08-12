const { Txt } = require("../../langs/langs.js");
const { settings } = require("../../settings.js");
const { SlashCommandBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Slider, SliderType } = require("../../utils/Slider.js")

const commandName = "imagetop";

module.exports = {
    name: commandName,
    aliases: [],
    help: 1,
    message: (client, message, args) => {
        executeCMD(client, message, args);
    },
    slash: new SlashCommandBuilder()
        .setName(commandName)
        .setDescription(require("../../langs/texts/" + settings.messages.defaultLang).texts[commandName].description),
        async execute(client, interaction) {
            await executeCMD(client, interaction, {});
        },
}

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").Message | import("discord.js").ChatInputCommandInteraction} message 
 * @param {object} args 
 */
async function executeCMD(client, message, args) {
    let slider = new Slider(message, {DESCRIPTION: "prompt", USERID: "user_id"}, "SELECT * FROM saved_images WHERE nsfw = 0", []);
    await slider.init();
    slider.setPos(1);

    const up = new ButtonBuilder()
		.setCustomId('up')
		.setEmoji("1255779640111267912")
		.setStyle(ButtonStyle.Secondary);
		

	const down = new ButtonBuilder()
		.setCustomId('down')
		.setEmoji("1255781883606732821")
		.setStyle(ButtonStyle.Secondary);

    slider.addButtons([up, down]);

    await slider.send();
}