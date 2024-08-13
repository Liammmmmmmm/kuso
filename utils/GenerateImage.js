const { error, debug } = require("./Console");
const { CardType, CharacterType } = require("./Card");

const ImagesStyles = {
    Anime: "Anime",
    Realistic: "Realistic",
    Cyberpunk: "Cyberpunk",
    Other: "Other",
}

const prompts = {
    CharacterType: {
        Human: [
            "%PROMPT%, human, %STYLE%, ancient battlefield, golden hour, warm earth tones, card art style, ultra-high resolution",
            "%PROMPT%, human, %STYLE%, jungle ruins, soft diffused light, vibrant greens and browns, card art style, 8k resolution",
            "%PROMPT%, human, %STYLE%, grand library, candlelight, rich and warm hues, card art style, 4k resolution",
            "%PROMPT%, human, %STYLE%, war-torn landscape, harsh daylight, muted and gritty tones, card art style, high resolution",
            "%PROMPT%, human, %STYLE%, bustling medieval market, overcast day, earthy and muted colors, card art style, high resolution",
            "%PROMPT%, human, %STYLE%, futuristic city skyline, neon lights, bright and vivid colors, card art style, ultra-high resolution",
            "%PROMPT%, human, %STYLE%, serene beach at sunset, soft twilight, pastel tones, card art style, 4k resolution",
            "%PROMPT%, human, %STYLE%, crowded urban street, night time, contrasting light and shadows, card art style, high resolution",
            "%PROMPT%, human, %STYLE%, peaceful countryside, morning light, fresh and natural colors, card art style, 8k resolution",
            "%PROMPT%, human, %STYLE%, ancient temple, midday sun, warm and golden hues, card art style, ultra-high resolution"
        ],
        Dwarf: [
            "%PROMPT%, dwarf, %STYLE%, underground cavern, torchlight, rich and dark hues, card art style, high resolution",
            "%PROMPT%, dwarf, %STYLE%, mountain fortress, dim firelight, cold and metallic tones, card art style, ultra-high resolution",
            "%PROMPT%, dwarf, %STYLE%, mining expedition, lantern light, earthy and rugged colors, card art style, 8k resolution",
            "%PROMPT%, dwarf, %STYLE%, ancient forge, glowing embers, warm and fiery tones, card art style, high resolution",
            "%PROMPT%, dwarf, %STYLE%, underground city, artificial lighting, shadowy and mysterious hues, card art style, 4k resolution",
            "%PROMPT%, dwarf, %STYLE%, deep forest hideout, moonlit night, deep greens and browns, card art style, ultra-high resolution",
            "%PROMPT%, dwarf, %STYLE%, ancient stronghold, flickering torches, golden and bronze tones, card art style, high resolution",
            "%PROMPT%, dwarf, %STYLE%, snowy mountain pass, dawn light, crisp and icy colors, card art style, 8k resolution",
            "%PROMPT%, dwarf, %STYLE%, subterranean tavern, candlelit, warm and welcoming tones, card art style, high resolution",
            "%PROMPT%, dwarf, %STYLE%, hidden vault, low light, cool metallic and stone hues, card art style, ultra-high resolution"
        ],
        Elf: [
            "%PROMPT%, elf, %STYLE%, enchanted forest, dappled moonlight, cool and vibrant colors, card art style, high resolution",
            "%PROMPT%, elf, %STYLE%, ancient elven city, soft morning light, pastel and ethereal tones, card art style, ultra-high resolution",
            "%PROMPT%, elf, %STYLE%, mystical glade, twilight, glowing and serene colors, card art style, 8k resolution",
            "%PROMPT%, elf, %STYLE%, hidden woodland sanctuary, golden hour, warm and lush hues, card art style, high resolution",
            "%PROMPT%, elf, %STYLE%, elven palace, starlit night, silver and blue tones, card art style, 4k resolution",
            "%PROMPT%, elf, %STYLE%, sacred grove, dawn light, fresh and vibrant colors, card art style, ultra-high resolution",
            "%PROMPT%, elf, %STYLE%, crystal clear riverbank, midday sun, bright and natural tones, card art style, high resolution",
            "%PROMPT%, elf, %STYLE%, ancient library, candlelight, rich and golden colors, card art style, 8k resolution",
            "%PROMPT%, elf, %STYLE%, ethereal meadow, early morning mist, soft pastel hues, card art style, high resolution",
            "%PROMPT%, elf, %STYLE%, secluded waterfall, sunset light, deep greens and blues, card art style, ultra-high resolution"
        ],
        Demon: [
            "%PROMPT%, demon, %STYLE%, fiery underworld, harsh red lighting, intense and contrasting colors, card art style, high resolution",
            "%PROMPT%, demon, %STYLE%, infernal castle, flickering flames, dark and ominous tones, card art style, ultra-high resolution",
            "%PROMPT%, demon, %STYLE%, cursed battlefield, stormy skies, violent and chaotic colors, card art style, 8k resolution",
            "%PROMPT%, demon, %STYLE%, hellish wasteland, glowing embers, deep reds and blacks, card art style, high resolution",
            "%PROMPT%, demon, %STYLE%, ritual chamber, eerie green light, dark and sinister hues, card art style, 4k resolution",
            "%PROMPT%, demon, %STYLE%, volcanic chasm, molten lava glow, fiery and destructive colors, card art style, ultra-high resolution",
            "%PROMPT%, demon, %STYLE%, shadowy forest, moonlit night, cold and ghostly tones, card art style, high resolution",
            "%PROMPT%, demon, %STYLE%, haunted ruins, dim torchlight, grim and decayed colors, card art style, 8k resolution",
            "%PROMPT%, demon, %STYLE%, demonic throne room, dark red light, oppressive and foreboding tones, card art style, high resolution",
            "%PROMPT%, demon, %STYLE%, abyssal pit, flickering shadows, dark and terrifying hues, card art style, ultra-high resolution"
        ]
    },
    WeaponType: {
        Sword: [
            "%PROMPT%, %STYLE%, sword, intricately designed blade, glowing runes, dark background, card art style, high resolution",
            "%PROMPT%, %STYLE%, sword, ancient and weathered, surrounded by mystical flames, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, sword, elegant and slender, bathed in moonlight, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, sword, legendary weapon with gold accents, radiant aura, card art style, high resolution",
            "%PROMPT%, %STYLE%, sword, dark and menacing, dripping with shadowy energy, card art style, 4k resolution",
            "%PROMPT%, %STYLE%, sword, crafted from crystal, surrounded by ethereal light, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, sword, ancient, blood-red background, card art style, high resolution",
            "%PROMPT%, %STYLE%, sword, divine blade, with a halo of light, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, sword, cursed sword, emitting dark smoke, card art style, high resolution",
            "%PROMPT%, %STYLE%, sword, enchanted with ice, frosty and cold, card art style, ultra-high resolution"
        ],
        Axe: [
            "%PROMPT%, %STYLE%, axe, massive double-bladed, engraved with runes, card art style, high resolution",
            "%PROMPT%, %STYLE%, axe, bloodstained and brutal, set against a fiery background, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, axe, dwarven craftsmanship, surrounded by sparks, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, axe, glowing with enchanted energy, hovering above a stone pedestal, card art style, high resolution",
            "%PROMPT%, %STYLE%, axe, dark and cursed, with ominous aura, card art style, 4k resolution",
            "%PROMPT%, %STYLE%, axe, adorned with ancient symbols, bathed in twilight, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, axe, powerful and heavy, splintered wood background, card art style, high resolution",
            "%PROMPT%, %STYLE%, axe, with a handle wrapped in dragon leather, crackling with lightning, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, axe, Viking style, surrounded by stormy clouds, card art style, high resolution",
            "%PROMPT%, %STYLE%, axe, carved from obsidian, with a molten lava glow, card art style, ultra-high resolution"
        ],
        Bow: [
            "%PROMPT%, %STYLE%, bow, elegant elven design, glowing with magic, card art style, high resolution",
            "%PROMPT%, %STYLE%, bow, rugged and battle-worn, surrounded by arrows, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, bow, made from twisted vines, glowing with nature's energy, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, bow, sleek and modern, with a neon glow, card art style, high resolution",
            "%PROMPT%, %STYLE%, bow, ancient and mystical, surrounded by ethereal mist, card art style, 4k resolution",
            "%PROMPT%, %STYLE%, bow, enchanted with frost, icy blue glow, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, bow, crafted from bone, eerie and haunting, card art style, high resolution",
            "%PROMPT%, %STYLE%, bow, golden and radiant, set against a bright sun, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, bow, simple but deadly, arrows dipped in poison, card art style, high resolution",
            "%PROMPT%, %STYLE%, bow, ornate and regal, with a royal crest, card art style, ultra-high resolution"
        ],
        Dagger: [
            "%PROMPT%, %STYLE%, dagger, sleek and deadly, with a curved blade, card art style, high resolution",
            "%PROMPT%, %STYLE%, dagger, ancient and cursed, glowing with dark energy, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, dagger, intricately designed with gold inlay, set against a velvet backdrop, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, dagger, dripping with venom, surrounded by toxic fumes, card art style, high resolution",
            "%PROMPT%, %STYLE%, dagger, small but sharp, with a hidden compartment, card art style, 4k resolution",
            "%PROMPT%, %STYLE%, dagger, crafted from obsidian, with a cold blue glow, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, dagger, wrapped in dark cloth, exuding a sense of stealth, card art style, high resolution",
            "%PROMPT%, %STYLE%, dagger, with a jeweled hilt, shimmering in the light, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, dagger, with ancient runes, glowing faintly, card art style, high resolution",
            "%PROMPT%, %STYLE%, dagger, hidden in a shadow, barely visible, card art style, ultra-high resolution"
        ],
        Staff: [
            "%PROMPT%, %STYLE%, staff, adorned with crystals, glowing with arcane energy, card art style, high resolution",
            "%PROMPT%, %STYLE%, staff, ancient and twisted, surrounded by a dark aura, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, staff, made from ancient wood, with a dragon carved into it, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, staff, topped with a glowing orb, pulsating with power, card art style, high resolution",
            "%PROMPT%, %STYLE%, staff, elegant and refined, with a silver finish, card art style, 4k resolution",
            "%PROMPT%, %STYLE%, staff, crackling with lightning, surrounded by storm clouds, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, staff, emitting a soft glow, with ethereal symbols floating around it, card art style, high resolution",
            "%PROMPT%, %STYLE%, staff, with roots growing from it, symbolizing nature's power, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, staff, with dark thorns, surrounded by shadowy tendrils, card art style, high resolution",
            "%PROMPT%, %STYLE%, staff, forged from ancient metal, radiating heat, card art style, ultra-high resolution"
        ],
        Spear: [
            "%PROMPT%, %STYLE%, spear, with a sharp and gleaming tip, set against a stormy background, card art style, high resolution",
            "%PROMPT%, %STYLE%, spear, ancient and battle-worn, dripping with blood, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, spear, with a glowing crystal tip, radiating energy, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, spear, carved from bone, surrounded by eerie mist, card art style, high resolution",
            "%PROMPT%, %STYLE%, spear, with a golden shaft, shining brightly, card art style, 4k resolution",
            "%PROMPT%, %STYLE%, spear, glowing with enchanted light, hovering above the ground, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, spear, forged from black metal, with a dark and ominous aura, card art style, high resolution",
            "%PROMPT%, %STYLE%, spear, with intricate engravings, bathed in soft light, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, spear, wielded by a legendary hero, surrounded by flames, card art style, high resolution",
            "%PROMPT%, %STYLE%, spear, frozen in ice, cold and deadly, card art style, ultra-high resolution"
        ],
        Hammer: [
            "%PROMPT%, %STYLE%, hammer, massive and powerful, with a thunderous aura, card art style, high resolution",
            "%PROMPT%, %STYLE%, hammer, ancient and worn, engraved with runes, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, hammer, glowing with holy light, surrounded by divine energy, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, hammer, forged from dark iron, with a menacing presence, card art style, high resolution",
            "%PROMPT%, %STYLE%, hammer, crackling with electricity, set against a stormy sky, card art style, 4k resolution",
            "%PROMPT%, %STYLE%, hammer, with a golden handle, radiating warmth, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, hammer, heavy and destructive, surrounded by rubble, card art style, high resolution",
            "%PROMPT%, %STYLE%, hammer, enchanted with fire, glowing with intense heat, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, hammer, covered in frost, exuding a cold aura, card art style, high resolution",
            "%PROMPT%, %STYLE%, hammer, with a polished head, reflecting light, card art style, ultra-high resolution"
        ],
        Crossbow: [
            "%PROMPT%, %STYLE%, crossbow, sleek and deadly, with a metallic finish, card art style, high resolution",
            "%PROMPT%, %STYLE%, crossbow, crafted from wood and steel, with glowing runes, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, crossbow, modern and high-tech, with a digital display, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, crossbow, ancient and battle-worn, with a worn leather strap, card art style, high resolution",
            "%PROMPT%, %STYLE%, crossbow, engraved with intricate designs, surrounded by smoke, card art style, 4k resolution",
            "%PROMPT%, %STYLE%, crossbow, enchanted with lightning, crackling with energy, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, crossbow, lightweight and portable, with a sharp and precise aim, card art style, high resolution",
            "%PROMPT%, %STYLE%, crossbow, camouflaged for stealth, surrounded by leaves, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, crossbow, with a golden finish, glowing softly, card art style, high resolution",
            "%PROMPT%, %STYLE%, crossbow, emitting a faint glow, surrounded by darkness, card art style, ultra-high resolution"
        ],
        Wand: [
            "%PROMPT%, %STYLE%, wand, delicate and slender, glowing with magical energy, card art style, high resolution",
            "%PROMPT%, %STYLE%, wand, ancient and twisted, surrounded by dark mist, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, wand, crafted from silver, with a sparkling tip, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, wand, emanating light, with mystical symbols floating around it, card art style, high resolution",
            "%PROMPT%, %STYLE%, wand, decorated with precious gems, set against a dark background, card art style, 4k resolution",
            "%PROMPT%, %STYLE%, wand, glowing softly, with an ethereal aura, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, wand, made from ancient wood, with a nature motif, card art style, high resolution",
            "%PROMPT%, %STYLE%, wand, with dark energy swirling around it, surrounded by shadows, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, wand, with a crystalline structure, reflecting light, card art style, high resolution",
            "%PROMPT%, %STYLE%, wand, ancient and powerful, emitting a blue glow, card art style, ultra-high resolution"
        ],
        Gun: [
            "%PROMPT%, %STYLE%, gun, sleek and modern, with a matte black finish, card art style, high resolution",
            "%PROMPT%, %STYLE%, gun, antique and rusty, surrounded by smoke, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, gun, futuristic with neon highlights, glowing in the dark, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, gun, with intricate engravings, set against a blood-red background, card art style, high resolution",
            "%PROMPT%, %STYLE%, gun, old and battle-scarred, with a wooden handle, card art style, 4k resolution",
            "%PROMPT%, %STYLE%, gun, surrounded by lightning, crackling with energy, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, gun, engraved with mystical symbols, glowing faintly, card art style, high resolution",
            "%PROMPT%, %STYLE%, gun, lightweight and compact, with a silencer, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, gun, emitting a soft glow, with a metallic sheen, card art style, high resolution",
            "%PROMPT%, %STYLE%, gun, surrounded by flames, fiery and intense, card art style, ultra-high resolution"
        ],
        Mace: [
            "%PROMPT%, %STYLE%, mace, heavy and brutal, with spiked edges, card art style, high resolution",
            "%PROMPT%, %STYLE%, mace, ancient and corroded, surrounded by dark energy, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, mace, with a golden head, glowing softly, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, mace, forged from dark metal, with a sinister aura, card art style, high resolution",
            "%PROMPT%, %STYLE%, mace, crackling with electricity, surrounded by sparks, card art style, 4k resolution",
            "%PROMPT%, %STYLE%, mace, with intricate engravings, set against a stormy background, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, mace, with a polished finish, reflecting light, card art style, high resolution",
            "%PROMPT%, %STYLE%, mace, ancient and powerful, surrounded by flames, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, mace, wrapped in chains, exuding menace, card art style, high resolution",
            "%PROMPT%, %STYLE%, mace, with dark smoke swirling around it, card art style, ultra-high resolution"
        ],
        Shield: [
            "%PROMPT%, %STYLE%, shield, sturdy and round, with intricate patterns, card art style, high resolution",
            "%PROMPT%, %STYLE%, shield, battle-worn and scarred, surrounded by fire, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, shield, glowing with magical energy, with runes inscribed, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, shield, crafted from enchanted wood, surrounded by leaves, card art style, high resolution",
            "%PROMPT%, %STYLE%, shield, shining with a golden glow, set against a dark background, card art style, 4k resolution",
            "%PROMPT%, %STYLE%, shield, massive and heavy, surrounded by rubble, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, shield, emitting a soft light, with ethereal symbols, card art style, high resolution",
            "%PROMPT%, %STYLE%, shield, with a polished surface, reflecting the surroundings, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, shield, with a cracked surface, glowing with inner light, card art style, high resolution",
            "%PROMPT%, %STYLE%, shield, ancient and powerful, surrounded by mist, card art style, ultra-high resolution"
        ]
    },
    Place: {
        Forest: [
            "%PROMPT%, %STYLE%, dense forest with towering trees, dappled sunlight filtering through leaves, mystical atmosphere, card art style, high resolution",
            "%PROMPT%, %STYLE%, enchanted forest illuminated by bioluminescent plants, ethereal glow, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, autumn forest with falling leaves, warm hues, serene setting, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, dark and mysterious forest shrouded in mist, eerie ambiance, card art style, high resolution",
            "%PROMPT%, %STYLE%, ancient forest with twisted trees and hidden pathways, mystical aura, card art style, 4k resolution",
            "%PROMPT%, %STYLE%, snowy forest under a starlit sky, tranquil and cold, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, tropical forest with vibrant flora and fauna, lush and lively, card art style, high resolution",
            "%PROMPT%, %STYLE%, forest clearing with a sparkling pond, peaceful and inviting, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, foggy forest at dawn, soft light filtering through, mysterious vibe, card art style, high resolution",
            "%PROMPT%, %STYLE%, magical forest with floating lanterns, enchanting atmosphere, card art style, ultra-high resolution"
        ],
        Mountain: [
            "%PROMPT%, %STYLE%, towering mountain peaks covered in snow, dramatic skies, majestic scenery, card art style, high resolution",
            "%PROMPT%, %STYLE%, rocky mountain range during sunset, warm glow, breathtaking vista, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, misty mountains with cascading waterfalls, serene and mystical, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, rugged mountains under stormy clouds, intense atmosphere, card art style, high resolution",
            "%PROMPT%, %STYLE%, alpine mountains with lush meadows, vibrant and lively, card art style, 4k resolution",
            "%PROMPT%, %STYLE%, volcanic mountains with glowing lava flows, fiery and dynamic, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, mountain pass illuminated by moonlight, mysterious and tranquil, card art style, high resolution",
            "%PROMPT%, %STYLE%, snow-capped mountains reflected in a pristine lake, peaceful setting, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, ancient mountains with hidden caves, adventurous vibe, card art style, high resolution",
            "%PROMPT%, %STYLE%, mountainous landscape with a winding river, picturesque and serene, card art style, ultra-high resolution"
        ],
        Desert: [
            "%PROMPT%, %STYLE%, vast desert with rolling dunes, golden sands under a blazing sun, card art style, high resolution",
            "%PROMPT%, %STYLE%, desert oasis with palm trees and clear water, refreshing contrast, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, desert landscape at dusk, soft pink and purple hues, tranquil ambiance, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, ancient desert ruins partially buried in sand, mysterious and historical, card art style, high resolution",
            "%PROMPT%, %STYLE%, desert storm with swirling sands, intense and dramatic, card art style, 4k resolution",
            "%PROMPT%, %STYLE%, night desert under a starry sky, serene and vast, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, desert canyon with towering rock formations, rugged beauty, card art style, high resolution",
            "%PROMPT%, %STYLE%, cracked desert ground during drought, harsh and desolate, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, caravan traversing the desert, adventurous spirit, card art style, high resolution",
            "%PROMPT%, %STYLE%, desert landscape with mirage in the distance, surreal and captivating, card art style, ultra-high resolution"
        ],
        Swamp: [
            "%PROMPT%, %STYLE%, dense swamp with murky waters and gnarled trees, eerie atmosphere, card art style, high resolution",
            "%PROMPT%, %STYLE%, swamp illuminated by will-o'-the-wisps, mystical glow, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, foggy swamp at dawn, soft light filtering through, mysterious vibe, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, ancient swamp with overgrown ruins, hidden secrets, card art style, high resolution",
            "%PROMPT%, %STYLE%, swamp with thick vegetation and exotic creatures, vibrant ecosystem, card art style, 4k resolution",
            "%PROMPT%, %STYLE%, night swamp under a full moon, hauntingly beautiful, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, swamp path with wooden boardwalks, adventurous journey, card art style, high resolution",
            "%PROMPT%, %STYLE%, swamp with reflective waters and cypress trees, serene setting, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, swamp hut with glowing windows, inviting yet mysterious, card art style, high resolution",
            "%PROMPT%, %STYLE%, swamp landscape with a lurking silhouette, ominous presence, card art style, ultra-high resolution"
        ],
        City: [
            "%PROMPT%, %STYLE%, bustling medieval city with cobblestone streets, lively markets, card art style, high resolution",
            "%PROMPT%, %STYLE%, futuristic cityscape with towering skyscrapers and neon lights, vibrant energy, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, ancient city with grand architecture and wide plazas, historical grandeur, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, city at night under a starry sky, illuminated streets, serene ambiance, card art style, high resolution",
            "%PROMPT%, %STYLE%, steampunk city with intricate machinery and smokestacks, industrial vibe, card art style, 4k resolution",
            "%PROMPT%, %STYLE%, coastal city with buildings along the shoreline, picturesque setting, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, city during a festival with colorful decorations, lively atmosphere, card art style, high resolution",
            "%PROMPT%, %STYLE%, snow-covered city in winter, cozy and inviting, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, desert city with sandstone buildings, warm hues, exotic feel, card art style, high resolution",
            "%PROMPT%, %STYLE%, city in ruins overtaken by nature, post-apocalyptic scene, card art style, ultra-high resolution"
        ],
        Castle: [
            "%PROMPT%, %STYLE%, majestic castle atop a hill, overlooking vast lands, regal presence, card art style, high resolution",
            "%PROMPT%, %STYLE%, haunted castle shrouded in mist, eerie and mysterious, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, snow-covered castle during winter, serene and majestic, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, castle with towering spires under a sunset sky, warm glow, card art style, high resolution",
            "%PROMPT%, %STYLE%, ruined castle overgrown with vines, historical decay, card art style, 4k resolution",
            "%PROMPT%, %STYLE%, castle surrounded by a moat with drawbridge lowered, inviting yet fortified, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, castle during a festival with banners and flags, lively ambiance, card art style, high resolution",
            "%PROMPT%, %STYLE%, dark castle illuminated by lightning, ominous atmosphere, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, floating castle among the clouds, fantastical and surreal, card art style, high resolution",
            "%PROMPT%, %STYLE%, castle courtyard with blooming gardens, peaceful and elegant, card art style, ultra-high resolution"
        ],
        Volcano: [
            "%PROMPT%, %STYLE%, active volcano erupting with lava flows, fiery and intense, card art style, high resolution",
            "%PROMPT%, %STYLE%, dormant volcano under a starry sky, calm yet imposing, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, volcanic landscape with molten lava rivers, dramatic scenery, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, volcano silhouetted against a setting sun, warm and vibrant hues, card art style, high resolution",
            "%PROMPT%, %STYLE%, volcanic crater with steaming vents, raw and powerful, card art style, 4k resolution",
            "%PROMPT%, %STYLE%, island volcano surrounded by the ocean, isolated and majestic, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, volcano with ash clouds billowing into the sky, intense atmosphere, card art style, high resolution",
            "%PROMPT%, %STYLE%, volcanic cave with glowing lava pools, mysterious interior, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, ancient volcano with lush vegetation on its slopes, contrast of fire and life, card art style, high resolution",
            "%PROMPT%, %STYLE%, night view of a volcano with glowing lava, captivating and dangerous, card art style, ultra-high resolution"
        ],
        Ice: [
            "%PROMPT%, %STYLE%, vast icy tundra under a pale sky, cold and desolate, card art style, high resolution",
            "%PROMPT%, %STYLE%, glacier with towering ice formations, majestic and pristine, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, frozen lake reflecting the aurora borealis, enchanting and serene, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, snow-covered landscape with gentle snowfall, tranquil and cold, card art style, high resolution",
            "%PROMPT%, %STYLE%, icy cave with sparkling icicles, mystical interior, card art style, 4k resolution",
            "%PROMPT%, %STYLE%, iceberg floating in the ocean, solitary and grand, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, frozen waterfall captured in motion, dynamic and beautiful, card art style, high resolution",
            "%PROMPT%, %STYLE%, polar landscape with distant mountains, vast and open, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, ice palace illuminated by soft light, ethereal and elegant, card art style, high resolution",
            "%PROMPT%, %STYLE%, snow-covered forest under a full moon, peaceful and silent, card art style, ultra-high resolution"
        ],
        Ocean: [
            "%PROMPT%, %STYLE%, vast ocean with waves crashing against the shore, dynamic and powerful, card art style, high resolution",
            "%PROMPT%, %STYLE%, underwater coral reef teeming with marine life, vibrant and colorful, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, calm ocean at sunset with golden reflections, serene and beautiful, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, stormy sea with dark clouds and towering waves, intense atmosphere, card art style, high resolution",
            "%PROMPT%, %STYLE%, deep-sea trench illuminated by bioluminescent creatures, mysterious depths, card art style, 4k resolution",
            "%PROMPT%, %STYLE%, oceanic vista with distant islands, expansive and inviting, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, ship sailing on the open sea under a starlit sky, adventurous spirit, card art style, high resolution",
            "%PROMPT%, %STYLE%, crystal-clear tropical waters with sandy seabed, tranquil and bright, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, ocean whirlpool swirling dramatically, powerful natural phenomenon, card art style, high resolution",
            "%PROMPT%, %STYLE%, underwater cave with shafts of light penetrating the surface, enchanting and mysterious, card art style, ultra-high resolution"
        ],
        Graveyard: [
            "%PROMPT%, %STYLE%, old graveyard shrouded in mist, eerie and somber, card art style, high resolution",
            "%PROMPT%, %STYLE%, moonlit graveyard with ancient tombstones, hauntingly beautiful, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, overgrown graveyard with ivy-covered monuments, forgotten and melancholic, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, graveyard during autumn with falling leaves, reflective atmosphere, card art style, high resolution",
            "%PROMPT%, %STYLE%, graveyard under stormy skies with flashes of lightning, intense and dramatic, card art style, 4k resolution",
            "%PROMPT%, %STYLE%, graveyard with glowing ghostly figures, supernatural presence, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, war-torn graveyard with broken crosses, poignant and solemn, card art style, high resolution",
            "%PROMPT%, %STYLE%, ancient graveyard with mausoleums and statues, historical depth, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, snow-covered graveyard in winter, silent and cold, card art style, high resolution",
            "%PROMPT%, %STYLE%, graveyard with a single blooming flower, symbolizing hope, card art style, ultra-high resolution"
        ],
        AncientRuins: [
            "%PROMPT%, %STYLE%, sprawling ancient ruins overgrown with vegetation, lost in time, card art style, high resolution",
            "%PROMPT%, %STYLE%, desert ruins with crumbling pillars and arches, historical mystery, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, jungle ruins reclaimed by nature, hidden and enigmatic, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, underwater ruins with remnants of a lost civilization, captivating and mysterious, card art style, high resolution",
            "%PROMPT%, %STYLE%, ruins illuminated by the setting sun, warm and nostalgic, card art style, 4k resolution",
            "%PROMPT%, %STYLE%, mountain ruins shrouded in mist, ethereal and majestic, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, ruins during a full moon with shadows dancing, haunting ambiance, card art style, high resolution",
            "%PROMPT%, %STYLE%, frozen ruins encased in ice, timeless and preserved, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, ancient temple ruins with faded murals, cultural depth, card art style, high resolution",
            "%PROMPT%, %STYLE%, ruins with a lone standing statue, symbolizing resilience, card art style, ultra-high resolution"
        ],
        Sky: [
            "%PROMPT%, %STYLE%, expansive sky with fluffy clouds and bright sun, uplifting and open, card art style, high resolution",
            "%PROMPT%, %STYLE%, night sky filled with stars and a prominent Milky Way, awe-inspiring and vast, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, stormy sky with dark clouds and lightning bolts, dramatic and intense, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, sunset sky with vibrant oranges and pinks, warm and calming, card art style, high resolution",
            "%PROMPT%, %STYLE%, dawn sky with soft pastel colors, fresh and serene, card art style, 4k resolution",
            "%PROMPT%, %STYLE%, sky with a double rainbow after rain, hopeful and magical, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, sky filled with hot air balloons, colorful and festive, card art style, high resolution",
            "%PROMPT%, %STYLE%, aurora borealis dancing across the sky, mesmerizing and ethereal, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, clear blue sky with a single soaring eagle, freedom and majesty, card art style, high resolution",
            "%PROMPT%, %STYLE%, twilight sky with emerging stars, peaceful transition, card art style, ultra-high resolution"
        ],
        Battlefield: [
            "%PROMPT%, %STYLE%, medieval battlefield, intense and chaotic, card art style, high resolution",
            "%PROMPT%, %STYLE%, somber and reflective, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, dynamic and explosive, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, gritty and dramatic, card art style, high resolution",
            "%PROMPT%, %STYLE%, historical depth, card art style, 4k resolution",
            "%PROMPT%, %STYLE%, poignant and powerful, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, fast-paced and thrilling, card art style, high resolution",
            "%PROMPT%, %STYLE%, turbulent seas, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, fantastical and vibrant, card art style, high resolution",
            "%PROMPT%, %STYLE%, aftermath and silence, card art style, ultra-high resolution"
        ],
        Temple: [
            "%PROMPT%, %STYLE%, serene and spiritual, card art style, high resolution",
            "%PROMPT%, %STYLE%, warm and inviting, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, mystical and forgotten, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, ethereal and majestic, card art style, high resolution",
            "%PROMPT%, %STYLE%, historical and grand, card art style, 4k resolution",
            "%PROMPT%, %STYLE%, lively and cultural, card art style, ultra-high resolution",
            "%PROMPT%, %STYLE%, beautiful and serene, card art style, high resolution",
            "%PROMPT%, %STYLE%, mysterious and captivating, card art style, 8k resolution",
            "%PROMPT%, %STYLE%, peaceful and silent, card art style, high resolution",
            "%PROMPT%, %STYLE%, architectural marvel, card art style, ultra-high resolution"
        ],
        Labyrinth: [
            "%PROMPT%, %STYLE%, mysterious and challenging, card art style, high resolution",
        ]
    },

}


class GenerateImage {
    /**
     * 
     * @param {*} prompt 
     */
    constructor(prompt) {
        this.prompt = prompt;
        this.originalPrompt = prompt;
    }

    /**
     * 
     * @param {CardType} category 
     */
    setCategory(category) {

        switch (category) {
            case CardType.Character:
                this.prompt = "A detailed illustration of a fantasy character, showing expressive emotions and intricate details in their clothing and features. " + this.prompt;
                break;
            case CardType.Weapon:
                this.prompt = "A high-quality render of a fantasy weapon, showing ornate details, sharp edges, and a powerful aura. " + this.prompt;
                break;
            case CardType.Object:
                this.prompt = "An artistic depiction of an object, radiating energy, with intricate engravings and an ancient look. " + this.prompt;
                break;
            case CardType.Place:
                this.prompt = "A breathtaking landscape of a fantasy place, with detailed architecture, lush environments, and a mystical atmosphere. " + this.prompt;
                break;
            default:
                this.prompt = "An artistic illustration. " + this.prompt;
        }

    }
}

async function saveImage(imagelink, nsfw = 0) {
    if(nsfw) {
        try {
            let result = 0;
            const image1 = { source: url, filename: 'nsfw' }
            await imgbox(image1, {content_type: "adult"})
            .then(res => {    
                if(res.ok) {
                    result = res.data[0].original_url;
                }
            }).catch();
            return result;
        } catch (err) {
            error('Error uploading image to ImgBox');
            debug.error(err)
            return 0;
        }
    } else {
        const imgurClientId = process.env.IMGUR_CLIENT_ID;
        const imgurApiUrl = 'https://api.imgur.com/3/image';
        
        try {
            const imgurResponse = await fetch(imgurApiUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Client-ID ${imgurClientId}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: imagelink,
                    type: 'url',
                }),
            });
        
            if (!imgurResponse.ok) {
                return 0;
            }
        
            const imgurData = await imgurResponse.json();
            const imgurImageUrl = imgurData.data.link;
        
            return imgurImageUrl;
           
        } catch (err) {
            error('Error uploading image to Imgur');
            debug.error(err)
            return 0;
        }
    }
}
	
