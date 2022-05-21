const axios = require("axios")

class Github {

    async authenticate(code) {
        const response = await axios.post(process.env.OAUTH_URL_ACCESS_TOKEN, {
            client_id: process.env.OAUTH_CLIENT_ID,
            client_secret: process.env.OAUTH_CLIENT_SECRET,
            code,
        });

        const accessToken = (response.data.split("&")[0].split("=")[1]);
        return accessToken;
    }
}

module.exports = Github;