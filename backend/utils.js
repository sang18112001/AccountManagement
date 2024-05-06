const sqlite3 = require("sqlite3").verbose();
const util = require("util");
var CryptoJS = require("crypto-js");

let db = new sqlite3.Database(
  "./userData.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) console.error(err.message);
    console.log("Connected to the user database.");
  }
);

const dbAllAsync = util.promisify(db.all).bind(db);
const dbRunAsync = util.promisify(db.run).bind(db);
const dbGetAsync = util.promisify(db.get).bind(db);

const jwt = require("jsonwebtoken");
const tokenCreation = (data, key, expiredTime) => {
  return jwt.sign(data, key, {
    expiresIn: expiredTime,
  });
};

const decodePassword = (password) => {
  var bytes = CryptoJS.AES.decrypt(password, "secret key 123");
  var decryptedPass = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedPass
};

module.exports = { db, dbGetAsync, dbAllAsync, dbRunAsync, tokenCreation, decodePassword };
