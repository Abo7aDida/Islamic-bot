const { Client, GatewayIntentBits, Partials, Collection, WebhookClient } = require('discord.js');

const { exec } = require('child_process');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds, 
	], 
	partials: [Partials.Channel, Partials.GuildMember, Partials.Reaction],
  fetchAllMembers: true,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  allowedMentions: {
   // parse: ["roles", "users", "everyone"],
    repliedUser: false,
  },

});



const fs = require('fs');
const config = require('./config.json');
require('dotenv').config()


client.events = new Collection();
client.slashCommands = new Collection();
client.prefix = config.prefix

module.exports = client;



fs.readdirSync('./handlers').forEach((handler) => {
	require(`./handlers/${handler}`)(client)
});


client.login(process.env.TOKEN)