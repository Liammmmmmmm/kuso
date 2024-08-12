const settings = {
    development: {
        enabled: true, // If true, the bot will register all application commands to a specific guild (not globally).
        guildIds: ["876729531166240808", "450730266479165440"], // 1021633276542193755
        debug: true, // Display or not more info
        logFile: true
    },
    commands: {
        prefix: "?" // Default prefix of the command messages.
    },
    users: {
        ownerId: "516993045724528663", // The bot owner ID, which is you.
    },
    messages: { // Messages when language is unreachable.
        defaultLang: "fr",
        DATABASE_ERROR: "A database error orccured"
    },
    bot: { // Useless if you don't use webhooks
        name: "Your bot name",
        icon: "https://c.clc2l.com/t/d/i/discord-4OXyS2.png"
    },
    status: {
        statusMessages: [
            { name: 'Regarde mes waifus', type: 3 },
            { name: 'Reflechis au sens de la vie', type: 4 },
        ],
        switch_delay: 10000,       
    }
}


const globalEmbedHeader = {
    author: "%SERVER_NAME%",
    authorImageURL: "%SERVER_IMAGE%",
    authorURL: "https://exemple.com",
    thumbnail: ""
}

const globalEmbedFooter = {
    text: "%USER_NAME%",
    imageURL: "%USER_IMAGE%",
    timestamp: true,
}

const embeds = {
    primary: {
        color: "#dbaf00",
        header: globalEmbedHeader,
        footer: globalEmbedFooter,
    },
    slider: {
        color: "#00b3db",
        footer: {
            timestamp: true,
        },
        buttons: {
            previous: "859729184770097173",
            next: "859729121398751232",
        }
    },
}

module.exports = { settings, embeds };