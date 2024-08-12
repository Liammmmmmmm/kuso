const DatabaseConnection = require("./SQLRequest");
const { DefaultEmbed } = require("./DefaultEmbeds");
const { Txt } = require("../langs/langs");
const { ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js")
const { embeds } = require("../settings")

/**
 * Differents sliders types
 * @enum { number }
 */
const SliderType = {
    Static: 0,
    Dynamic: 1,
}

class Slider {
    /**
     * 
     * @param {import("discord.js").Message | import("discord.js").Interaction} interaction 
     * @param {object} variablesFromResult - Example : {DESCRIPTION: "prompt"} will replace the variable DESCRIPTION in the lang config by the result.prompt of the sql request
     * @param {string} request 
     * @param {string[]} params 
     */
    constructor(interaction, variablesFromResult, request, params = []) {
        this.type = SliderType.Static;
        this.interaction = interaction;
        this.resultSQLReplace = {...variablesFromResult, ID: "id"};
        this.variablesFromResult = {};
        this.request = request;
        this.params = params;
        this.db = new DatabaseConnection();
        this.pos = 0;
        this.total = 0;
        this.result = null;
        this.text = null;
        this.slash = 0;
        this.sent = 0;
        this.whaitingforchange;
        this.category = "slider";
        this.ogId = [];

        const nxt = new ButtonBuilder()
            .setCustomId('next')
            .setEmoji(embeds.slider.buttons.next)
            .setStyle(ButtonStyle.Secondary);

        const bfr = new ButtonBuilder()
            .setCustomId('bfor')
            .setEmoji(embeds.slider.buttons.previous)
            .setStyle(ButtonStyle.Secondary);
        this.buttons = [bfr, nxt]
    }

    async init() {
        this.text = new Txt();
        await this.text.init(this.interaction.author.id); 

        try {
            if(this.interaction.isCommand()) {
                this.slash = 1;
                await this.interaction.deferReply();
            }
        } catch {} 

        if(this.type == SliderType.Static) {
            if(!this.request.includes("LIMIT")) this.request = `${this.request} LIMIT 1000`;
            await this.db.request(this.request, this.params)
            .then(res => {
                this.result = res;
                this.total = res.length;
            })
            .catch(() => {return false})
        } else if(this.type == SliderType.Dynamic) {
            await this.db.request(`SELECT COUNT(*) AS count FROM (${this.request}) AS subquery`, this.params)
            .then(res => {
                this.total = res[0].count;
            })
            .catch(() => {return false})
        }
        this.variablesFromResult = { ...this.variablesFromResult, ACTUAL: this.pos + 1, TOTAL: this.total};
        return true;
    }

    /**
     * Set the slider type. Use it before the init()
     * @param {SliderType} type 
     */
    setType(type) {
        this.type = type;
    }

    /**
     * Add buttons under the slider
     * @param {ButtonBuilder[]} buttons 
     */
    addButtons(buttons) {
        buttons.forEach(button => {
            this.ogId.push(button.data.custom_id);
        })
        this.buttons = [...this.buttons, ...buttons];
    }

    /**
     * Set the pos in the image list. Use it after the init()
     * @param {number} pos 
     */
    setPos(pos) {
        if(pos > this.total) this.pos = this.total - 1;
        if(pos <= this.total) this.pos = pos - 1;
        if(pos < 0) this.pos = 0;
        this.variablesFromResult.ACTUAL = this.pos;
    }

    /**
     * Change la catégorie dans laquelle recuperer les éléments (footer et description) a mettre dans l'embed. Use it before send.
     * @param {string} category (premier element dans text.get("category", "index"))
     */
    editCategory(category) {
        this.category = category;
    }

    async send() {
        if(this.total == 0) {
            if(this.slash) {
                this.interaction.editReply(this.text.get(this.category, "nothing"));
            } else {
                this.interaction.reply(this.text.get(this.category, "nothing"));
            }
        } else {
            let embed = new DefaultEmbed().setDefault("slider", this.interaction)

            if(this.type == SliderType.Static) {
                Object.entries(this.resultSQLReplace).forEach(([key, content]) => {
                    if(this.result[this.pos][content]) this.variablesFromResult[key] = this.result[this.pos][content];
                })
                this.variablesFromResult.ACTUAL = this.pos + 1;
                embed.setImage(this.result[this.pos].image_url);
            } else if(this.type == SliderType.Dynamic) {
                await this.db.request(`SELECT COUNT(*) AS count FROM (${this.request}) AS subquery`, this.params)
                .then(res => {
                    this.total = res[0].count;
                    if(this.pos >= this.total) {
                        this.pos = this.total - 1;
                    }
                    this.variablesFromResult.ACTUAL = this.pos + 1;
                    this.variablesFromResult.TOTAL = this.total;
                })
                .catch(() => {return false})
                if(this.total > 0) {
                    await this.db.request(`${this.request} LIMIT 1 OFFSET ?`, [...this.params, this.pos])
                    .then(async res => {
                        Object.entries(this.resultSQLReplace).forEach(([key, content]) => {
                            if(res[0][content]) this.variablesFromResult[key] = res[0][content];
                        })
                        embed.setImage(res[0].image_url);
                    })
                    .catch(() => {return false})
                }
            }
            
            if(this.variablesFromResult.USERID) {
                let user = await this.interaction.client.users.fetch(this.variablesFromResult.USERID);
                this.variablesFromResult.CREATOR_NAME = user.globalName;
                this.variablesFromResult.CREATOR_IMAGE = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
            }

            this.buttons.forEach((button, i) => {
                if(i >= 2) {
                    button.setCustomId(this.ogId[i - 2] + this.variablesFromResult.ID)
                }
            })
            const row = new ActionRowBuilder().addComponents(...this.buttons);

            embed.setDescription(this.text.get(this.category, "sliderDescription", this.variablesFromResult))
            .setAuthor({
                name: this.text.get(this.category, "author", this.variablesFromResult),
                iconURL: this.text.get(this.category, "authorImageURL", this.variablesFromResult),
            })
            .setFooter({
                text: this.text.get(this.category, "footer", this.variablesFromResult)
            })
            if(this.slash) {
                if(this.sent == 0) {
                    this.whaitingforchange = await this.interaction.editReply({components: [row], embeds: [embed]});
                } else {
                    this.interaction.editReply({components: [row], embeds: [embed]});
                }
                try {
                    const changeImage = await this.whaitingforchange.awaitMessageComponent({ time: 180_000 });
                    if (changeImage.customId === 'next') {
                        this.next();
                    } else if (changeImage.customId === 'bfor') {
                        this.prev();
                    } else {
                        this.reload()
                    }
                } catch (e) {
                    this.buttons.shift();
                    this.buttons.shift();
                    await this.interaction.editReply({ components: this.buttons.length ? [new ActionRowBuilder().addComponents(...this.buttons)] : [] });
                }

            } else {
                if(this.sent == 1) this.interaction.edit({components: [row], embeds: [embed]});
                else {
                    await this.interaction.reply({components: [row], embeds: [embed]})
                    .then(sentMessage => {
                        this.interaction = sentMessage;
                    });
                    this.whaitingforchange = this.interaction;
                }
                try {
                    const changeImage = await this.whaitingforchange.awaitMessageComponent({ time: 180_000 });
                                    
                    if (changeImage.customId === 'next') {
                        this.next();
                    } else if (changeImage.customId === 'bfor') {
                        this.prev();
                    } else {
                        this.reload()
                    }
                } catch (e) {
                    this.buttons.shift();
                    this.buttons.shift();
                    await this.interaction.edit({ components: this.buttons.length ? [new ActionRowBuilder().addComponents(...this.buttons)] : [] });
                }
                
            }
        }
        this.sent = 1
    }

    next() {
        this.pos += 1;
        if(this.pos >= this.total) {
            this.pos = 0;
        }
        this.send();
    }

    prev() {
        this.pos -= 1;
        if(this.pos < 0) {
            this.pos = this.total - 1;
        }
        this.send();
    }

    reload() {
        this.send()
    }
}


module.exports = { SliderType, Slider}