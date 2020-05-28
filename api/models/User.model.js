const db = require("./db");

class User {
  constructor() {}

  static findAll(resultHandler) {
    db.query("SELECT * FROM users", (err, data) => {
      if (err) {
        resultHandler(err, null);
        return;
      }

      resultHandler(null, data);
    });
  }

  static findById(id, resultHandler) {
    db.query("SELECT * FROM users WHERE id = ?", id, (err, data) => {
      if (err) {
        resultHandler(err, null);
        return;
      }

      if (data.length) {
        resultHandler(null, data[0]);
        return;
      }

      resultHandler(
        {
          code: "not_found",
          message: `row ${id} was not found`,
        },
        null
      );
    });
  }

  static updateById(id, user, resultHandler) {
    db.query(
      "UPDATE users SET name = ?, surname = ?, email = ?, phone = ?, last_logged = CURRENT_TIMESTAMP() WHERE id = ?",
      [user.name, user.surname, user.email, user.phone, id],
      (err, data) => {
        if (err) {
          resultHandler(err, null);
          return;
        }

        if (data.affectedRows == 0) {
          resultHandler(
            {
              code: "not_found",
              message: `row ${id} was not found`,
            },
            null
          );

          console.log("updateById:", data);
          resultHandler(null, { id, ...user });
        }
      }
    );
  }
}

module.exports = User;
