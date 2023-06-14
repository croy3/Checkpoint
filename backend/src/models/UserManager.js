const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert({ login, password }) {
    const fields = "login, password";

    return this.database.query(
      `insert into ${this.table} (${fields}) values (?, ?)`,
      [login, password]
    );
  }

  update({ id, login, password }) {
    return this.database.query(
      `update ${this.table} set login = ?, password = ? where id = ?`,
      [login, password, id]
    );
  }
}

module.exports = UserManager;
