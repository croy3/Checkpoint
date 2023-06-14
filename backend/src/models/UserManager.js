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

  update(user) {
    return this.database.query(`update ${this.table} set ? where id = ?`, [
      user,
      user.id,
    ]);
  }
}

module.exports = UserManager;
