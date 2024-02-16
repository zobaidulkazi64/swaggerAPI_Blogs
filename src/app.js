const express = require("express");
const applyOpenApi = require('./middleware')
const routes = require("./routes");

const app = express();
applyOpenApi(app);
app.use(routes);
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello World from the express server");
})

app.use((error,req, _res, next) => {

    console.log(error)
    res.status(error.status || 500).json({
        message: error.message,
        errors: error.errors
    })
    next();
})


module.exports = app;