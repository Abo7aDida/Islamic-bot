const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
const axios = require("axios")

module.exports = {
	name: 'allah',
	description: "Asma Al Husna / 99 Names of God.",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	run: async (client, interaction) => {

let x = Math.random() * 99;
const api = await axios.get(`http://api.aladhan.com/asmaAlHusna/${Math.floor(x)}`);
let res = api.data.data[0].name

const embed = new EmbedBuilder()
.setColor('Gold')
.setTitle(res)
.setDescription(`\`\`\`yml\nالـرقـم :\n${api.data.data[0].number}\nالـمـعـنـى :\n${api.data.data[0].en.meaning}\`\`\``)

return interaction.reply({ embeds: [embed] })
	}
};