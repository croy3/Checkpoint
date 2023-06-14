const models = require("../models");

const userValidator = require("../services/validators/userValidator");

const { hashPassword } = require("../services/auth");

const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows.map((user) => ({ id: user.id, login: user.login })));
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.user
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send({ id: rows[0].id, login: rows[0].login });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = async (req, res) => {
  const user = req.body;

  const error = userValidator(user, false);
  if (error) res.sendStatus(422);

  user.id = parseInt(req.params.id, 10);

  if (user.password) user.password = await hashPassword(user.password);

  models.user
    .update(user)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = async (req, res) => {
  const user = req.body;

  const error = userValidator(user);
  if (error) res.sendStatus(422);

  user.password = await hashPassword(user.password);

  models.user
    .insert(user)
    .then(([result]) => {
      res.location(`/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.user
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUserByLoginToNext = async (req, res, next) => {
  const { login } = req.body;
  if (!login) res.sendStatus(422);
  models.user
    .getUserByLogin(login)
    .then(([result]) => {
      if (result[0] != null) {
        [req.user] = result;
        next();
      } else res.sendStatus(401);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  getUserByLoginToNext,
};
