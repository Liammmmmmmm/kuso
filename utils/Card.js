const CardType = {
    Character: 0,
    Weapon: 1,
    Object: 2,
    Place: 3,
    Artifact: 4,
}

const CharacterType = {
    Human: 1,
    Dwarf: 2,
    Elf: 4,
    Demon: 8,
}

/* 
Stats de base differentes selon les races
stats: {
longevity: x //Nombre de tour max en combat : extremement eleve chez les elf et demons, faible chez les humains et 2x supperieurs pour les nains
pv: x // plus élevé chez les nains et demons
defense: x // plus eleve chez les nains
inteligence: x // plus elevee chez humains et elfes
agility: x // capacité a esquiver
luck: x // Une carracteristique completement aléatoire entre 0 et 1. Impossible a changer et défini certaines actions (ex tirer avec une arme a feu ou la proba de toucher l'autre depend de la chance donc une chance faible n'est pas adapté aux armes a feu)
mana: x // s'utilise lors du combat d'un mage, s'améliore en gagnant des combats

class: {
une stat par type d'arme, qui est la meme partout (ou persque, les elfs peuvent avoir une stat de base plus élevée avec la magie et les nains plus elevee avec les armes par ex), et gagner un combat fera augmenter la stat dans la categorie d'arme utilisée 
}
}
*/

// on combat dans une arene (carte type Place) et les arenes peuvent être avantageux pour differentes classes de personnages

const WeaponType = {
    Sword: 1,
    Axe: 2,
    Bow: 4,
    Dagger: 8,
    Staff: 16,
    Spear: 32,
    Hammer: 64,
    Crossbow: 128,
    Wand: 256,
    Gun: 512,
    Mace: 1024,
    Shield: 2048,
};

// Stats de base differente pour chaque arme, + coef aleatoire (assez faible juste pour pas avoir tout pareil) * coef multiplicateur selon la rareté (défini au nombre de vote)

const ArenaType = {
    Forest: 1,
    Mountain: 2,
    Desert: 4,
    Swamp: 8,
    City: 16,
    Castle: 32,
    Volcano: 64,
    Ice: 128,
    Ocean: 256,
    Graveyard: 512,
    AncientRuins: 1024,
    Sky: 2048,
    Battlefield: 4096,
    Temple: 8192,
    Labyrinth: 16384,
};

const ObjectType = {
    Potion: 1,
    Scroll: 2,
    Ring: 4,
    Amulet: 8,
    Book: 16,
    Gem: 32,
    Key: 64,
    Map: 128,
    Relic: 256,
    Food: 512,
    Tool: 1024,
    Other: 2048,
};

// Jsp encore pourquoi faire, je pense juste de la collection (leur donner des utilités et stats why not non plus genre au destroy ça donne pas forcement que des thunes mais aussi des stats et tt)


const ArtifactType = {
    // a définir, list gpt :
    /*

    // Artéfacts de Puissance
    SunBlade: 1,            // Épée forgée dans le cœur d'une étoile, émet une lumière éclatante et brûle les ennemis.
    StormHammer: 2,         // Marteau qui contrôle les tempêtes, capable d'invoquer la foudre à chaque coup.
    DragonScaleShield: 3,   // Bouclier impénétrable fabriqué à partir d'écailles de dragon, capable de renvoyer les projectiles.
    PhoenixFeatherCloak: 4, // Cape faite de plumes de phénix, permet de se régénérer et d'ignorer les effets du feu.

    // Artéfacts Mystiques
    CrystalOrb: 5,          // Orbe de cristal qui permet de voir à travers le temps et l'espace, donnant des visions de l'avenir.
    VoidStone: 6,           // Pierre sombre qui peut absorber la magie, annulant les sorts et affaiblissant les magiciens.
    EldritchTome: 7,        // Livre ancien renfermant des connaissances interdites, octroie des pouvoirs terrifiants mais à un prix.
    AstralAmulet: 8,        // Amulette qui connecte son porteur aux royaumes astraux, augmentant la puissance spirituelle.

    // Artéfacts de Protection
    AegisArmor: 9,          // Armure qui crée un champ de force autour de son porteur, réduisant les dégâts subis.
    GuardianHelm: 10,       // Casque légendaire qui protège l'esprit des attaques psychiques et des illusions.
    GaiaBracers: 11,        // Bracelets qui accordent une force surhumaine et la capacité de contrôler la terre et la nature.
    OceanicRing: 12,        // Anneau enchanté permettant de respirer sous l'eau et de communiquer avec les créatures marines.

    // Artéfacts Maudits
    BloodChalice: 13,       // Coupe maudite qui confère une grande puissance en échange de la vitalité du porteur.
    CursedBlade: 14,        // Épée légendaire qui augmente la force du porteur à chaque coup, mais enchaîne son âme à la lame.
    ShadowCloak: 15,        // Cape qui rend son porteur invisible dans l'obscurité, mais le corrompt lentement.
    SoulGem: 16,            // Gemme qui emprisonne les âmes des ennemis vaincus, augmentant les pouvoirs magiques du porteur.

    // Artéfacts Anciens
    TimeWornHourglass: 17,  // Sablier qui permet de manipuler le temps, ralentissant ou accélérant le flux à volonté.
    EternalCompass: 18,     // Boussole qui guide toujours son porteur vers son véritable objectif, mais jamais sans sacrifice.
    ArcaneLens: 19,         // Lentille magique capable de révéler les secrets cachés et les vérités dissimulées.
    RunicGauntlet: 20,      // Gantelet gravé de runes anciennes, augmente la maîtrise des sorts et des incantations.

    // Artéfacts Divins
    LightBringer: 21,       // Flambeau sacré qui dissipe les ténèbres et purifie les malédictions.
    CelestialCrown: 22,     // Couronne divine qui accorde sagesse et autorité absolue à celui qui la porte.
    WingsOfValor: 23,       // Ailes angéliques qui permettent de voler et de se déplacer à des vitesses divines.
    DivineChalice: 24,      // Calice béni, accorde des bénédictions divines et soigne les blessures mortelles.

    */
}

/*
Combat :
quand un joueur défie un autre on a un pile ou face pour qui qui choisit l'arene. Si la personne en a pas, c'est une arene aleatoire
*/

class BaseCard {
    constructor() {
        this.stats = {

        }
    }

    getCard(card) {

    }

    createCard(image) {

    }
}

class Card {
    constructor() {

    }
}

class Deck {
    constructor(userid) {
        // recup toutes les cartes d'un utilisateur
    }
}

module.exports = { CardType, CharacterType, Card}