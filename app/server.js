require("dotenv/config");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const Constant = require("./constant");
const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "../access.log"),
  { flags: "a" }
);

console.log("access.log created successfully");

app.use(morgan("combined", { stream: accessLogStream }));

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).send({ status: 404, message: err.message });
  }
  next();
});

require("./middleware/isAuthenticated")(app);

require("./routes")(app);

app.use((req, res) => {
  res.status(404).send("404: Page not found");
});

app.listen(process.env.APP_PORT_LOCAL || 9090, () => {
  console.log(
    `Example app listening on port ${process.env.APP_PORT_LOCAL || 9090}!`
  );
});
