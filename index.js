//Followed tutorial at (https://www.youtube.com/watch?v=Zo184YYdqkQ&t=0s)


const Discord = require("discord.js")
const generateImage = require("./createImage")
const welcomeChannelId = "955842187965366272"
const SET_ZDOROVO_SPELLING = new Set(['здорова', 'здарова', 'здорово', 'здарово'])
const SET_AMOGUS = new Set(['сас', 'амонг', 'импостер','сус', 'among', 'amogus', 'sus', 'imposter'])
const AMOGUS_COPY_PASTA = "STOP 🛑 POSTING📱ABOUT AMONG☝️US 👨‍👩‍👧‍👦 I’M 👨 TIRED 🥱 OF 🤬 SEEING 👀 IT 🤡!❗️My 👨 friends 👫 on 🔛 tiktok ⏱ send 👨‍💻💬 me 👨 memes 🖥😂, on 🔛 discord 👾 it’s FUCKING 😩👉👌 memes 🖥😂. I 👁 was 🤔 in ⤵️ a server 👨‍👩‍👧‍👦 right ➡️?❓and ALL 😵 of 😡 the channels 📺 are just 🙄 among☝️us 👨‍👩‍👧‍👦 stuff 🤓. I-I 👁 SHOWED 👀 MY 👨 CHAMPION 🏆 UNDERWEAR 🩲 TO MY 👨 GIRLFRIEND 🧍‍♀️, and the logo 👾 I flipped 🔁 it 🤡 and I 👁 said 🗣 “Hey 👋 babe 🥰, when 🤔 the underwear 🩲 sus 😳.” HAHA 😂!❗️DING 🔔🔊 DING 🔔🔊 DING 🔔🔊 DING 🔔🔊 DING 🔔🔊 DING 🔔🔊 DING 🔔🔊 DING 🔔🔊 DING 🔔🔊 DING 🔔🔊🎶!❗️I 👁 fucking 😩👉👌 looked 👀 at a trash 🗑 can, I 👁 said 🗣 “That’s 😱 a bit 🤏 sussy 😳!❗️” I 👁 looked 👀 at my 👨 penis 🍆, I 👁 think 🤔 of the astronaut’s 👨‍🚀 helmet 🪖 and I 👁 go🚦🗣 “PENIS 🍆?❓more 🤪 like 😬 pen-SUS 😳!❗️” AHHHHHHHHH!❗️😱🤬🗣"
require("dotenv").config()

function checkThatMessageHasWordFromSet(set, message) {
    let containsWord = false
    set.forEach(spelling =>{
        if (message.content.toLocaleLowerCase().includes(spelling.toLowerCase())) {
            containsWord = true
        }
    })
    return containsWord
  }

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

client.on("ready", () => {
    console.log(`Logged is as ${client.user.tag}`)
})

client.on("messageCreate", (message) =>{

    let containsZdorovo = checkThatMessageHasWordFromSet(SET_ZDOROVO_SPELLING, message)
    let containsAmogus = checkThatMessageHasWordFromSet(SET_AMOGUS, message)

    if (message.content.toLocaleLowerCase().includes("бот") && containsZdorovo) {
        message.reply("Здорово " + message.author.tag + "!")
    }

    if (containsAmogus && !message.author.bot) {
        message.reply(AMOGUS_COPY_PASTA)
    }

})

client.on("guildMemberAdd", async (member) =>{
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}> засосало в Дыру!`,
        files: [img]
    })
})

client.login(process.env.TOKEN)