const { Client } = require("discord.js")

module.exports = {
    getPostID: async function (client, channelID, username, intervalSeconds) {

        /**
         * 
         * @param {Client} client
         * @param {String} channelID
         * @param {String} username
         * @param {Number} intervalSeconds
         * @returns {void}
         * 
         */

        async function getID(username) {

            const endpoint = `https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${username}`

            const res = await fetch(endpoint)
            const data = await res.json()

            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            if (data.feed[0] === undefined) throw new Error(`${username} has no posts`)
            
            return data.feed[0].post.uri.slice(-13) // Return the last 13 characters of the URI (those being the post's ID)

        }

        let old_ID = await getID(username)

        setInterval(async () => {

            let new_ID = await getID(username)

            if (new_ID != old_ID) {

                let url = `https://bsky.app/profile/${username}/post/${new_ID}`
                client.channels.cache.get(channelID).send(url)
                old_ID = new_ID
            
            }

        }, intervalSeconds * 1000);

    }

}