const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const guilddata = require("../../models/guildssettings.js");

module.exports = {
	name: 'azkar',
	description: "azkar setup.",
	type: ApplicationCommandType.ChatInput,
  userPerms: ['Administrator'],
	botPerms: ['Administrator'],
  options: [
        {
            name: 'setup',
            description: 'setup azkar channel.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
        {
            name: "channel",
            description: "channel for azkar.",
            type: ApplicationCommandOptionType.Channel,
            required: true,
        },
        ],
       },   
        {
            name: 'disable',
            description: 'disable azkar channel.',
            type: ApplicationCommandOptionType.Subcommand,
       },   
   ],
  
	run: async (client, interaction) => {
//if(interaction.user.id != '295590388033388546') return interaction.reply({ content: 'maintenance mode!', ephemeral: true})
const log = client.channels.cache.get('1017651913937911918')

    
if (interaction.options.getSubcommand() === 'setup') {
let channel = interaction.options.getChannel("channel");
const data = await guilddata.findOne({ serverID: interaction.guild.id });
if (!data || !data.serverID) {
new guilddata({ serverID: interaction.guild.id, channelID: channel.id}).save(() => {
return interaction.reply({ content: `تمَ تحديدٌ <#${channel.id}> كاقناة للاذكارْ` });
})} else if (data.channelID || data.serverID) {
data.deleteOne(() => {
new guilddata({ serverID: interaction.guild.id, channelID: channel.id}).save(() => {
 var added = new EmbedBuilder()
    .setColor("#2F3136")
    .setTitle("islami Log")
    .setDescription(
      `**Server Name : \`${interaction.guild.name}\`
   Server ID: \`${interaction.guild.id}\`
   Server Members : \`${interaction.guild.memberCount}\`
   Time Created: \`${interaction.guild.createdAt.toLocaleString()}\`
   Used  : \`added azkar channel\`
  **`)
    .setTimestamp()
    .setThumbnail(interaction.guild.iconURL());

log.send({ embeds: [added] });
return interaction.reply({ content: `تمَ تحديدٌ <#${channel.id}> كاقناة للاذكارْ` });

})})}
  

}
    
if (interaction.options.getSubcommand() === 'disable') {
const data = await guilddata.findOne({ serverID: interaction.guild.id });
if (!data || !data.serverID) {
return interaction.reply({ content: `لا توجدُ قناةٌ للاذكارْ في هذا السيرفر .` });
} else { data.deleteOne(() => {
   var remove = new EmbedBuilder()
    .setColor("#2F3136")
    .setTitle("islami Log")
    .setDescription(
      `**Server Name : \`${interaction.guild.name}\`
   Server ID: \`${interaction.guild.id}\`
   Server Members : \`${interaction.guild.memberCount}\`
   Time Created: \`${interaction.guild.createdAt.toLocaleString()}\`
   Used  : \`removed azkar channel\`
  **`)
    .setTimestamp()
    .setThumbnail(interaction.guild.iconURL());

log.send({ embeds: [remove] });

return interaction.reply({ content: `تمَ تعطيلٌ نضامَ الأذكار في هذا السيرفر .` });
           })
  }



  
}



    
}  
	}
