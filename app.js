const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const routes = require("./routes");

const app = express();

// app.use(cors);
// app.use(helmet);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send({ message: "welcome" }));

routes(app);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is ready at ${port}`));
