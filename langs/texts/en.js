const texts = {
    global: { // list of random texts
        tooManyArgs: "Too many arguments! Need %REQUIRED_AMOUNT%, received %RECEIVED_AMOUNT%.",
        notEnoughArgs: "Not enough arguments! Need %REQUIRED_AMOUNT%, received %RECEIVED_AMOUNT%.",
        error: "An error occurred.",
        notEnoughPermAdmin: "You are not an administrator of the server.",
    },
    categories: { // List of the command folders and a description of their content. Used in auto-generated /help
        lang: "Utility commands for bot language.",
        utils: "Random utility commands.",
    },
    slider: {
        nothing: "Nothing to see here...",
        footer: "Image %ACTUAL%/%TOTAL%",
        description: "Ex : %DESCRIPTION%",
        author: "%CREATOR_NAME%",
        authorImageURL: "%CREATOR_IMAGE%",
    },
    // List of the commands and the texts associated with them
    ping: { 
        description: "A command that gives you the bot's ping.", // max 100 characters, slash commands limit 
        advancedDesc: "A command that gives you the bot's ping. (no args)",
        reply: "Pong! This message has a latency of %MESSAGE_PING%ms. The API has a latency of %API_PING%ms."
    },
    changelang: {
        description: "Change the language of the bot's messages.",
        advancedDesc: "Change the language of the bot's messages. (/changelang lang, get the available languages with /listlangs)",
        langOption: "The language the bot will use to communicate with you.",
        badLanguageProvided: "The language you requested isn't valid. Possible languages are: %LANG_LIST%.",
        reply: "Your language has been successfully changed to %LANG%."
    },
    listlangs: {
        description: "Get all of the bot's languages.",
        advancedDesc: "Get all of the bot's languages. (no args)",
        reply: "Possible languages are: %LANG_LIST%."
    },
    changeprefix: {
        description: "Change the bot's prefix.",
        advancedDesc: "Change the bot's prefix. (/setprefix newprefix, max length 25 characters)",
        arg1: "The new server prefix.",
        reply: "Prefix successfully changed to: %PREFIX%.",
        tooLong: "Your new prefix is longer than 25 characters.",
    },
    help: {
        description: "List all possible commands.",
        advancedDesc: "List all possible commands and provide help for a specific command if passed as an argument. (/help commandname)",
        title: "Here are all the possible commands. Have fun!",
        categoryformat: "__%CATEGORY_NAME%__: %CATEGORY_DESCRIPTION%",
        commandformat: "- **%COMMAND_NAME%**: %COMMAND_DESCRIPTION%",
        aliases: "The aliases you can use for this command are: ***%ALIASES_LIST%***.",
        invalidCommand: "This command doesn't exist.",
    },
    sendwebhook: {
        description: "Send a webhook (example only here).",
        advancedDesc: "Send a webhook (example only here).",
        noPermission: "Not enough permission.",
        success: "Webhook successfully created.",
        error: "An error occurred.",
    },
    test: { 
        description: "Just test random stuff",
        advancedDesc: "Just test random stuff",
    },
};

module.exports = { texts };
