const express = require("express");
const bodyParser = require("body-parser");
const authRouter = require("./routers/auth");
const userRouter = require("./routers/user");
const cookies = require("cookie-parser");
const fs = require("fs");
const https = require("https");
const helmet = require("helmet");
const options = {
  key: fs.readFileSync("./certificates/key.pem"),
  cert: fs.readFileSync("./certificates/cert.pem"),
};
const port = 8080;
const app = express();

var cors = require("cors");
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookies());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use(helmet()); // Add Helmet as a middleware

app.use((req, res) => {
  res.writeHead(200);
  res.end("hello world\n");
});

const server = https.createServer(options, app);

server.listen(port, () => {
  console.log("listening on port " + port);
});
