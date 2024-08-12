const { ButtonInteraction } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const { debug } = require("../../utils/Console")
const { Txt } = require("../../langs/langs")
const { SliderStore, SliderType } = require("../../utils/Slider");

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

        let slider = SliderStore.get(interaction.customId.replace("down", ""));
        
        if(!slider) return;

        let actualRes;

        if(slider.type == SliderType.Dynamic) actualRes = slider.result[0]
        else if(slider.type == SliderType.Static) actualRes = slider.result[slider.pos]

        await client.database.request('SELECT * FROM votes WHERE user_id = ? AND image_id = ?', [interaction.user.id, actualRes.id])
        .then(async res => {
            if(res.length == 0) {
                client.database.request("INSERT INTO votes (upvote, user_id, image_id) VALUES (0, ?, ?);", [interaction.user.id, actualRes.id])
                .then(async () => {
                    await interaction.reply({ content: text.get("aiImageSlider", "voteDownSuccess"), ephemeral: true });
                    actualRes.downvote += 1;
                    slider.reload();
                })
                .catch(async err => senderror(err));
            } else {
                if(res[0].upvote == 0) {
                    await interaction.reply({ content: text.get("aiImageSlider", "voteDownAlready"), ephemeral: true });
                    slider.reload()
                } else if(res[0].upvote == 1) {
                    client.database.request("UPDATE votes SET upvote=0,date=current_timestamp() WHERE id = ?;", [res[0].id])
                    .then(async () => {
                        await interaction.reply({ content: text.get("aiImageSlider", "voteDownSuccess"), ephemeral: true });
                        actualRes.downvote += 1;
                        actualRes.upvote -= 1;
-                        slider.reload();
                    })
                    .catch(async err => senderror(err));
                } else {
                    await interaction.reply({ content: text.get("global", "error"), ephemeral: true });
                    slider.reload()
                }
            }
        })
        .catch(async err => senderror(err))

        async function senderror(err) {
            await interaction.reply({ content: text.get("global", "error"), ephemeral: true });
            slider.reload()
            return debug.error(err)
        }


    }
}