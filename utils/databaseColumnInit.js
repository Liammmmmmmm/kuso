const DatabaseConnection = require("./SQLRequest")
const { settings } = require("../settings")
const { debug } = require("./Console")

/**
 * Registers a user with the default settings in the database.
 * 
 * @param {string} userid - The Discord ID of the user.
 */
function initUser(userid) {
    let db = new DatabaseConnection();
    db.request("INSERT INTO users(discord_id, lang) VALUES (?, ?)", [userid, settings.messages.defaultLang])
    .then(() => {
        debug.success(`User ${userid} succefully registered in database with lang : ${settings.messages.defaultLang}`);
    })
    .catch(() => {
        debug.warn(`An error occured while registering user ${userid} in database. Selecting default lang ${settings.messages.defaultLang}`);
    })
}

module.exports = { initUser }