const axios = require("axios");

const hasAuthenticated = async (request, response, next) => {
    try {
        let token = request.headers.authorization;
        token = token.replace("Bearer ", "")
        if (!token) {
            return response.status(statusCode).json({ message: "Necessary informate token!" })
        }
        const basicCredential = Buffer.from(`${token}:x-oauth-basic`).toString("base64")
        const url = `https://api.github.com/user`
        await axios.get(url, {
            headers: {
                "accept": "application/vnd.github.v3+json",
                Authorization: `Basic ${basicCredential}`
            }
        })
        next();
    } catch (error) {
        const statusCode = (error.response.status)
        if (statusCode == 401 || statusCode == 403) {
            return response.status(statusCode).json({ message: "Token invalid" })
        }
    }
}

module.exports = hasAuthenticated