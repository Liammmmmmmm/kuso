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
    let slider = new Slider(message, {PROMPT: "prompt", UPVOTE: "upvote", DOWNVOTE: "downvote", USERID: "user_id"}, "SELECT si.*, COALESCE(SUM(CASE WHEN v.upvote = 1 THEN 1 ELSE 0 END), 0) AS upvote, COALESCE(SUM(CASE WHEN v.upvote = 0 THEN 1 ELSE 0 END), 0) AS downvote, (COALESCE(SUM(CASE WHEN v.upvote = 1 THEN 1 ELSE 0 END), 0) - COALESCE(SUM(CASE WHEN v.upvote = 0 THEN 1 ELSE 0 END), 0)) AS score FROM saved_images si LEFT JOIN votes v ON si.id = v.image_id WHERE si.nsfw = 0 GROUP BY si.id ORDER BY score DESC", []);
    await slider.init();
    slider.editCategory("aiImageSlider");

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