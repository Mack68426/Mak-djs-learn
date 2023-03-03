import {SlashCommandBuilder} from 'discord.js'


// 建立斜線指令
const command =  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("ping command")

// 執行指令後的動作
const action = async (inters) => { 
    inters.reply("pong!") 
}

export {
    command,
    action
}

