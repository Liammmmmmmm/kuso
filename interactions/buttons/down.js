const { ButtonInteraction } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const { debug } = require("../../utils/Console")
const { Txt } = require("../../langs/langs")

module.exports = {
    customId: 'down',
    /**
     * 
     * @param {DiscordBot} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

        let text = new Txt();
        await text.init(interaction.user.id);

        await client.database.request('SELECT * FROM votes WHERE user_id = ? AND image_id = ?', [interaction.user.id, parseInt(interaction.customId.replace("down", ""))])
        .then(async res => {
            if(res.length == 0) {
                client.database.request("INSERT INTO votes (upvote, user_id, image_id) VALUES (0, ?, ?);", [interaction.user.id, parseInt(interaction.customId.replace("down", ""))])
                .then(async () => {
                    await interaction.reply({ content: text.get("slider", "voteDownSuccess"), ephemeral: true });
                })
                .catch(async err => senderror(err));
            } else {
                console.log(res)
                if(res[0].upvote == 0) {
                    await interaction.reply({ content: text.get("slider", "voteDownAlready"), ephemeral: true });
                } else if(res[0].upvote == 1) {
                    client.database.request("UPDATE votes SET upvote=0,date=current_timestamp() WHERE id = ?;", [res[0].id])
                    .then(async () => {
                        await interaction.reply({ content: text.get("slider", "voteDownSuccess"), ephemeral: true });
                    })
                    .catch(async err => senderror(err));
                } else {
                    await interaction.reply({ content: text.get("global", "error"), ephemeral: true });
                }
            }
        })
        .catch(async err => senderror(err))

        async function senderror(err) {
            await interaction.reply({ content: text.get("global", "error"), ephemeral: true });
            return debug.error(err)
        }


    }
}