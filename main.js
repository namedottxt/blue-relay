const token = '' // DO NOT SHARE

const { Client, Events, GatewayIntentBits } = require('discord.js')
const bluesky = require('./bluesky')

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
})

client.once(Events.ClientReady, () => {

    console.log(`Logged in as ${client.user.displayName}`);  

    let channelID = '' // Channel you want to redirect posts to
    let username = '' // BlueSky handle's name, not display name
    let intervalSeconds = 120 // How often to check
    
    bluesky.getPostID(client, channelID, username, intervalSeconds)

})

client.login(token)