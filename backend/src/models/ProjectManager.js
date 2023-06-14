/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "project" });
  }

  insert({ name, description, image_address, creation_date }) {
    const fields = "name, description, image_address, creation_date";

    return this.database.query(
      `insert into ${this.table} (${fields}) values (?, ?, ?, ?)`,
      [name, description, image_address, creation_date]
    );
  }

  update({ id, name, description, image_address, creation_date }) {
    return this.database.query(
      `update ${this.table} set name = ?, description = ?, image_address = ?, creation_date = ? where id = ?`,
      [name, description, image_address, creation_date, id]
    );
  }
}

module.exports = UserManager;
