const bcrypt = require("bcrypt");
const {
  dbGetAsync,
  dbRunAsync,
  tokenCreation,
  decodePassword,
  db,
} = require("../constant");
const jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");

let refreshTokens = [];

const authController = {
  registerUser: async (req, res) => {
    const { username, name, password } = req.body;
    // const hashedPassword = await bcrypt.hash(password, 10);
    const selectQuery = `SELECT * FROM user WHERE username = ?`;
    const insertQuery = `INSERT INTO user (username, name, password) VALUES (?, ?, ?)`;

    try {
      const result = await dbGetAsync(selectQuery, [username]);
      if (result) return res.status(400).send("User already registered");

      await dbRunAsync(insertQuery, [username, name, password]);
      res.status(200).send(`User ${username} created successfully`);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  },

  loginUser: async (req, res) => {
    const { username, password, isCheck } = req.body;
    const selectQuery = `SELECT * FROM user WHERE username = ?`;

    try {
      const user = await dbGetAsync(selectQuery, [username]);
      if (!user)
        return res.status(400).send({
          wrongUserMsg: "Invalid username",
        });

      const reqPass = decodePassword(password);
      const dataPass = decodePassword(user.password);

      if (isCheck) {
        if (reqPass === dataPass) {
          return res.status(200).send(true);
        } else {
          return res.status(200).send(false);
        }
      }
      // const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (reqPass === dataPass) {
        const data = {
          id: user.id,
          admin: user.admin,
        };
        const accessToken = tokenCreation(data, "token", "1d");
        const refreshToken = tokenCreation(data, "refresh", "30d");
        refreshTokens.push(refreshToken);
        // save refresh token to cookie.
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...otherInfo } = user;
        return res.status(200).send({
          ...otherInfo,
          accessToken,
          message: "Login successfully",
        });
      }

      return res.status(400).send({
        wrongPasswordMsg: "Invalid password",
      });
    } catch (error) {
      return res.status(500).send("Internal Server Error");
    }
  },
  reqRefreshToken: async (req, res) => {
    // Take refresh token from user.
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("You're not authenticated");

    if (!refreshTokens.includes(refreshToken))
      return res.status(403).json("Refresh token is not valid");

    jwt.verify(refreshToken, "refresh", (err, user) => {
      if (err) console.log(err);

      refreshTokens = refreshTokens.filter((token) => token != refreshToken);
      //Create a new access token, refresh token
      const data = { id: user.id, admin: user.admin };
      const newAccessToken = tokenCreation(data, "token", "1d");
      const newRefreshToken = tokenCreation(data, "refresh", "30d");
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ accessToken: newAccessToken });
    });
  },
  logoutUser: async (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.status(200).json("Logged out successfully");
    res.end()

  },
  updateUser: async (req, res) => {
    const { username, name, password } = req.body;
    const { id } = req.user;
    const updateQuery = `UPDATE user SET name = ?,username = ?,password = ?
    WHERE id = ?`;
    db.run(updateQuery, [name, username, password, id], (err, result) => {
      if (err) {
        return res.status(400).json({ error: res.message });
      }
      return res.json({
        message: "success",
      });
    });
  },
  checkPassword: async (req, res) => {
    const { username, password } = req.body;
    const selectQuery = `SELECT * FROM user WHERE username = ?`;
    try {
      const user = await dbGetAsync(selectQuery, [username]);
      const reqPass = decodePassword(password);
      const dataPass = decodePassword(user.password);
      if (reqPass === dataPass) {
        return res.status(200).json(true);
      } else {
        return res.status(200).json(false);
      }
    } catch (error) {
      return res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = authController;
