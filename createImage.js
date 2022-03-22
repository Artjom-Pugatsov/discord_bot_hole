const Canvas = require("canvas")
const Discord = require("discord.js")
const backURL = 'https://i.imgur.com/cSuRaxm.png'

const av = {
    size: 256, 
    x: 660,
    y: 370
}

const dim = {
    height: 1000,
    width: 1500,
    margin: 50
}

const generateImage = async (member) => {
    let username = member.user.username
    let discrim = member.user.discriminator
    let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: false, size: av.size})
    
    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext("2d")

    const bck = await Canvas.loadImage(backURL)
    ctx.drawImage(bck,0,0)
    

    const avimg = await Canvas.loadImage(avatarURL)
    ctx.save()
    ctx.beginPath()
    av.size = avimg.height
    ctx.arc(av.x + av.size / 2, av.y +av.size/2, av.size /2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avimg, av.x, av.y)
    ctx.restore()
    ctx.fillStyle = "white"
    ctx.textAlign = "center"

    ctx.font = "90px Arial"
    ctx.fillText(username +"#"+ discrim, dim.width/2, 800 )

    ctx.restore()

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
    return attachment

}

module.exports = generateImage