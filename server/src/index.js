const app = require("./configs/Server")

app.listen(
    process.env.PORT,
    () => console.log(`Server is running in address: http://localhost:${process.env.PORT}`)
)
