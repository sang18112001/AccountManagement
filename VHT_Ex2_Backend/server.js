const express = require("express");
const bodyParser = require("body-parser");
const authRouter = require("./routers/auth");
const userRouter = require("./routers/user");
const cookies = require("cookie-parser");
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

app.listen(port, () => {
  console.log("✨ Server is running on port " + port + " ✨");
});
