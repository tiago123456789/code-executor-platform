import httpClient from "./HttpClient"

class Gist {

    update(id, data, accessToken) {
        return httpClient.patch(
            `https://api.github.com/gists/${id}`, 
            data,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        )
    }

    async create(data, accessToken) {
        return httpClient.post("https://api.github.com/gists", data,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    }

    async get(accessToken) {
        const response = await httpClient.get("https://api.github.com/gists", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response.data
    }

    getById(id, accessToken) {
        return httpClient.get(`https://api.github.com/gists/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    }

    async generateLink(gist, accessToken, permission) {
        const response = await httpClient.post(`${process.env.REACT_APP_API_URL}generate-links/${gist.id}`, {
            permission
        }, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
        return response.data
    }

    validateLink(token) {
        return httpClient.get(
            `${process.env.REACT_APP_API_URL}validate-links/${token}`,
        );
    }
}

export default Gist;