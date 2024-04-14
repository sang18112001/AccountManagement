const bcrypt = require("bcrypt");
const { dbAllAsync, dbRunAsync, db } = require("../utils");

const userController = {
  getUsers: async (req, res) => {
    try {
      const rows = await dbAllAsync("SELECT * FROM user");
      res.send(rows);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  deleteUser: async (req, res) => {
    const id = req.params.id;
    const deleteQuery = `DELETE FROM user WHERE id = ?`;
    db.run(deleteQuery, [id], function (err) {
      if (err) {
        return res.status(500).send("Internal Server Error");
      }
      if (this.changes === 0) {
        res.status(400).send("User not found");
      } else {
        res.status(200).send(`User with id ${id} deleted successfully.`);
      }
    });
  },
};

module.exports = userController;
