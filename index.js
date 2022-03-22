//Followed tutorial at (https://www.youtube.com/watch?v=Zo184YYdqkQ&t=0s)


const utility = require('./utility');
const data = require('./data')

require("dotenv").config()
const Discord = require("discord.js")
const generateImage = require("./createImage")


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

    let containsZdorovo = utility.checkThatMessageHasWordFromSet(data.SET_ZDOROVO_SPELLING, message)
    let containsAmogus = utility.checkThatMessageHasWordFromSet(data.SET_AMOGUS, message)

    if (message.content.toLocaleLowerCase().includes("бот") && containsZdorovo) {
        message.reply("Здорово " + message.author.tag + "!")
    }

    if (containsAmogus && !message.author.bot) {
        message.reply(data.AMOGUS_COPY_PASTA)
    }

})

client.on("guildMemberAdd", async (member) =>{
    const img = await generateImage(member)
    member.guild.channels.cache.get(data.welcomeChannelId).send({
        content: `<@${member.id}> засосало в Дыру!`,
        files: [img]
    })
})

client.login(process.env.TOKEN)