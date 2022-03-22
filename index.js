const Discord = require("discord.js")
require("dotenv").config()

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})

client.on("ready", () => {
    console.log(`Logged is as ${client.user.tag}`)
})

client.on("messageCreate", (message) =>{
    if (message.content == "Здорово, бот!") {
        message.reply("Здорово " + message.author.tag)
    }
})

client.login(process.env.TOKEN)