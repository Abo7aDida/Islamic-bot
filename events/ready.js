const client = require('..')
const chalk = require('chalk')
const mongoose = require('mongoose');
const guilddata = require("../models/guildssettings.js");
const axios = require("axios")
const { EmbedBuilder } = require('discord.js');

client.on("ready", async () => {
client.user.setActivity({ name: `${client.guilds.cache.size+3} / 59426 `, type: 1 });
client.user.setStatus('dnd');
console.log(`Connected in ${client.guilds.cache.size} Server`);

mongoose.connect(process.env.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
	console.log(chalk.green('Connected to MongoDB'))
})
console.log(chalk.green(`Ready as > ${client.user.username}`));

///// azkar
//https://ayah.nawafdev.com/api/dekr?types=m,e

  setInterval( async () => {
const azkarreq = await axios.get(`https://ayah.nawafdev.com/api/dekr?types=m,e`);

client.guilds.cache.forEach(async function(guild) {
      
let data;
 data = await guilddata.findOne({ serverID: guild.id });

if (data) {
var channel = client.channels.cache.get(data.channelID);
if (channel) {
const azkar = new EmbedBuilder()
.setColor('Gold')
.setTitle(azkarreq.data.category)
.setDescription(`- ${azkarreq.data.content} \n ${azkarreq.data.description}`)
.setFooter({ text: client.user.username, iconURL: client.user.avatarURL({ dynaimc: true }) });

return channel.send({ embeds: [azkar] });
}
}})
}, 3600000);

  
}
 );
