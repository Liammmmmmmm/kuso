const { ButtonInteraction } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");

module.exports = {
    customId: 'next',
    /**
     * 
     * @param {DiscordBot} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

        await interaction.deferUpdate();

    }
}