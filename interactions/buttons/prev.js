const { ButtonInteraction } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");

module.exports = {
    customId: 'prev',
    /**
     * 
     * @param {DiscordBot} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

       interaction.deferUpdate();

    }

}