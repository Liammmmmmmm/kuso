const DiscordBot = require("../DiscordBot");
const { error } = require("../../utils/Console");

/**
 * @class InteractionsListener
 * @description Listens for and handles various types of interactions from Discord. 
 *              This includes button interactions, select menu interactions, modal submissions, 
 *              context menu commands (both user and message), and autocomplete interactions. 
 *              It maps these interactions to the corresponding components registered in the bot's collection.
 *
 * @example
 * // Initialize the InteractionsListener with a DiscordBot instance
 * const listener = new InteractionsListener(botClient);
 */
class InteractionsListener {
    /**
     * @param {DiscordBot} client - An instance of the DiscordBot class used to manage interactions.
     */
    constructor(client) {
        client.on('interactionCreate', async (interaction) => {
            try {
                // Handle button interactions
                if (interaction.isButton()) {
                    // Check if any component's customId starts with the interaction's customId
                    const component = client.collection.components.buttons.find((comp, key) => interaction.customId.startsWith(key));
                    if (!component) return;
                    try {
                        component.run(client, interaction);
                    } catch (err) {
                        error(err);
                    }
                    return;
                }
        
                // Handle select menu interactions
                if (interaction.isAnySelectMenu()) {
                    const component = client.collection.components.selects.find((comp, key) => interaction.customId.startsWith(key));
                    if (!component) return;
                    try {
                        component.run(client, interaction);
                    } catch (err) {
                        error(err);
                    }
                    return;
                }
        
                // Handle modal submissions
                if (interaction.isModalSubmit()) {
                    const component = client.collection.components.modals.find((comp, key) => interaction.customId.startsWith(key));
                    if (!component) return;
                    try {
                        component.run(client, interaction);
                    } catch (err) {
                        error(err);
                    }
                    return;
                }
        
                // Handle user context menu commands
                if (interaction.isUserContextMenuCommand()) {
                    const component = client.collection.components.context.find((comp, key) => interaction.commandName.startsWith("user-" + key));
                    if (!component) return;
                    try {
                        component.run(client, interaction);
                    } catch (err) {
                        error(err);
                    }
                    return;
                }
        
                // Handle message context menu commands
                if (interaction.isMessageContextMenuCommand()) {
                    const component = client.collection.components.context.find((comp, key) => interaction.commandName.startsWith("mess-" + key));
                    if (!component) return;
                    try {
                        component.run(client, interaction);
                    } catch (err) {
                        error(err);
                    }
                    return;
                }
        
                // Handle autocomplete interactions
                if (interaction.isAutocomplete()) {
                    const component = client.collection.components.autocomplete.find((comp, key) => interaction.commandName.startsWith(key));
                    if (!component) return;
                    try {
                        component.run(client, interaction);
                    } catch (err) {
                        error(err);
                    }
                    return;
                }
            } catch (err) {
                error(err);
            }
        });
        
    }
}

module.exports = InteractionsListener;
