const CodeExecutor = require("../services/CodeExecutor");
const Link = require("../services/Link");
const Github = require("../services/Github");
const hasAuthenticated = require("../middlewares/HasAuthenticated");

const codeExecutor = new CodeExecutor();
const link = new Link();
const github = new Github()

module.exports = (app) => {

    app.post("/authenticate", (request, response) => {
        const { code } = request.body;
        github.authenticate(code)
            .then((accessToken) => {
                return response.cookie("accessToken", accessToken).json({
                    accessToken
                })
            })
            .catch((error) => {
                return response.status(400).json({
                    error: error
                });
            });
    })

    app.post("/code-executions", async (request, response) => {
        try {
            let language = request.body.language
            let code = request.body.code;
            const output = await codeExecutor.execute(code, language)
            response.json({ output: output });
        } catch (error) {
            response.json({ output: error });
        }
    });

    app.post("/generate-links/:gistId", hasAuthenticated, (request, response) => {
        const permission = request.body.permission
        const shareLink = link.generate(permission, request.params.gistId);
        response.json({
            link: shareLink
        })
    })

    app.get("/validate-links/:token", (request, response) => {
        try {
            const permission = link.valid(request.params.token)
            response.json({ permission: permission })
        } catch (error) {
            response.json({ error: "link inválido" })
        }
    })

}