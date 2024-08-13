const client = require("../main")
const { settings } = require("../settings")
const { debug } = require("./Console")

/**
 * Registers a user with the default settings in the database.
 * 
 * @param {string} userid - The Discord ID of the user.
 */
async function initUser(userid) {
    await client.database.request("INSERT INTO users(discord_id, lang, money) VALUES (?, ?, ?)", [userid, settings.messages.defaultLang, settings.game.money.base])
    .then(() => {
        debug.success(`User ${userid} succefully registered in database with lang : ${settings.messages.defaultLang}`);
    })
    .catch(() => {
        debug.warn(`An error occured while registering user ${userid} in database. Selecting default lang ${settings.messages.defaultLang}`);
    })
}

module.exports = { initUser }