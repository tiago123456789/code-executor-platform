const jwt = require("jsonwebtoken")

class Link {

    generate(permission, gistId) {
        const token = jwt.sign({
            permission
        }, process.env.JWT_SECRET)

        return `${process.env.BASE_SHARE_LINK}?path=/code-share/${gistId}/${token}`
    }

    valid(token) {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        return payload.permission;
    }
}

module.exports = Link;