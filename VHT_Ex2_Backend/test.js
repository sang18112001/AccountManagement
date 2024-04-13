const fs = require("fs");
const https = require("https");

const options = {
  key: fs.readFileSync("./cert/key.pem"),
  cert: fs.readFileSync("./cert/cert.pem"),
};

const server = https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end("Hello, secure world!");
});

server.listen(443, () => console.log("listening on port"));
