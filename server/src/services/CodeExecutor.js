const App = require("../constants/App");
const { exec } = require("child_process");

class CodeExecutor {

    async execute(code, language) {
        code = decodeURI(code)
        code = code.replace(/'([0-9A-Za-z])+'/g, '"$1"')
        const command = App.COMMAND_EXECUTE_CODE_BY_LANGUAGE[language];
        let output = await new Promise((resolve, reject) => {
            exec(`${command} '${code}'`, (error, stdout, stderr) => {
                if (error) {
                    return reject(stderr)
                }
              
                return resolve(stdout)
            });
        })
        output = output.toString();
        return output
    }
}

module.exports = CodeExecutor