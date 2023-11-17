const { model, Schema } = require("mongoose");
const GuildSchema = new Schema({
  
serverID: String, 
channelID: String,
 
})


module.exports = model("guilds", GuildSchema);
