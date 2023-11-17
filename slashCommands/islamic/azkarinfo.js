const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
const guilddata = require("../../models/guildssettings.js");

module.exports = {
	name: 'info',
	description: "Server azkar Setup info",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
	userPerms: ['Administrator'],

run: async (client, interaction) => {
//if(interaction.user.id != '295590388033388546') return interaction.reply({ content: 'maintenance mode!', ephemeral: true})
  
const data = await guilddata.findOne({ serverID: interaction.guild.id });

if(!data){ var channelid = 'لا يـوجـد'} else {channelid = `<#${data.channelID}>`}
  
const info = new EmbedBuilder()
	.setColor('#2F3136')
	.setTitle('مـعـلـومـات الـسـيـرفـر <:InfoV2:1026145513898254367>')
	.setDescription(`<:emoji_3:1017509848830709840> **قـنـاة الأذكـار** : \n ${channelid} \n **مـعـلـومـات الـبـوت** <:administrativeV2:1026145631783354421> : \n📡 عدد السيرفرات : ${client.guilds.cache.size}\n👥 عدد المستخدمين : ${client.users.cache.size}`)
  
return interaction.reply({ embeds: [info] });



  
}
}