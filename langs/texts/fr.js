const texts = {
    global: { // liste de textes aléatoires
        tooManyArgs: "Trop d'arguments ! Besoin de %REQUIRED_AMOUNT%, reçu %RECEIVED_AMOUNT%.",
        notEnoughArgs: "Pas assez d'arguments ! Besoin de %REQUIRED_AMOUNT%, reçu %RECEIVED_AMOUNT%.",
        error: "Une erreur s'est produite.",
        notEnoughPermAdmin: "Vous n'êtes pas administrateur du serveur.",
    },
    categories: { // Liste des dossiers de commandes et une description de leur contenu. Utilisé dans /help généré automatiquement
        lang: "Commandes utilitaires pour la langue du bot.",
        utils: "Commandes utilitaires aléatoires.",
    },
    slider: {
        nothing: "Rien à voir ici...",
        footer: "Image %ACTUAL%/%TOTAL%",
        sliderDescription: "%DESCRIPTION%",
        author: "%USER_NAME%",
        authorImageURL: "%USER_IMAGE%",
    },
    // Liste des commandes et des textes qui leur sont associés
    ping: { 
        description: "Une commande qui vous donne le ping du bot.", // max 100 caractères, limite des commandes slash 
        advancedDesc: "Une commande qui vous donne le ping du bot. (aucun argument)",
        reply: "Pong ! Ce message a une latence de %MESSAGE_PING%ms. L'API a une latence de %API_PING%ms."
    },
    changelang: {
        description: "Changer la langue des messages du bot.",
        advancedDesc: "Changer la langue des messages du bot. (/changelang lang, obtenez les langues disponibles avec /listlangs)",
        langOption: "La langue que le bot utilisera pour communiquer avec vous.",
        badLanguageProvided: "La langue que vous avez demandée n'est pas valide. Les langues possibles sont : %LANG_LIST%.",
        reply: "Votre langue a été changée avec succès en %LANG%."
    },
    listlangs: {
        description: "Obtenez toutes les langues du bot.",
        advancedDesc: "Obtenez toutes les langues du bot. (aucun argument)",
        reply: "Les langues possibles sont : %LANG_LIST%."
    },
    changeprefix: {
        description: "Changer le préfixe du bot.",
        advancedDesc: "Changer le préfixe du bot. (/setprefix newprefix, longueur max 25 caractères)",
        arg1: "Le nouveau préfixe du serveur.",
        reply: "Préfixe changé avec succès en : %PREFIX%.",
        tooLong: "Votre nouveau préfixe dépasse les 25 caractères.",
    },
    help: {
        description: "Liste toutes les commandes possibles.",
        advancedDesc: "Liste toutes les commandes possibles et vous aide sur une commande spécifique que vous passez en argument. (/help commandname)",
        title: "Voici toutes les commandes possibles. Amusez-vous bien !",
        categoryformat: "__%CATEGORY_NAME%__ : %CATEGORY_DESCRIPTION%",
        commandformat: "- **%COMMAND_NAME%** : %COMMAND_DESCRIPTION%",
        aliases: "Les alias que vous pouvez utiliser pour cette commande sont : ***%ALIASES_LIST%***.",
        invalidCommand: "Cette commande n'existe pas.",
    },
    sendwebhook: {
        description: "Envoyer un webhook (exemple uniquement ici).",
        advancedDesc: "Envoyer un webhook (exemple uniquement ici).",
        noPermission: "Pas assez de permissions.",
        success: "Webhook créé avec succès.",
        error: "Une erreur s'est produite.",
    },
    test: { 
        description: "Juste tester des trucs random",
        advancedDesc: "Juste tester des trucs random",
    },
    aiImageSlider: {
        nothing: "Rien à voir ici...",
        footer: "Image %ACTUAL%/%TOTAL%",
        sliderDescription: "**__Prompt__ :** %PROMPT%\n> UpVotes : %UPVOTE%\n> DownVote : %DOWNVOTE%",
        author: "%CREATOR_NAME%",
        authorImageURL: "%CREATOR_IMAGE%",
        voteUpSuccess: "Vous avez voté positivement pour cette image <:up:1255779640111267912>",
        voteUpAlready: "Vous avez déjà voté positivement pour cette image <:up:1255779640111267912>",
        voteDownSuccess: "Vous avez voté négativement pour cette image <:down:1255781883606732821>",
        voteDownAlready: "Vous avez déjà voté négativement pour cette image <:down:1255781883606732821>",
    },
    imagetop: {
        description: "Affiche "
    }
};

module.exports = { texts };
