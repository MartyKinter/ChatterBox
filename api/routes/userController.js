const bcrypt = require("bcrypt");
const User = require("../models/User");
const createToken = require("../helpers/createToken");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.register({ username, email, password });
    let token = createToken(user.id, username);
    return res.json({ status: true, token });
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    let user = await User.get(username);
    if (!user) {
      return res.json({ msg: "Incorrect username/password", status: false });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.json({ msg: "Incorrect username/password", status: false });
    }
    let token = createToken(user.id, username);
    return res.json({ status: true, token });
  } catch (err) {
    return next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    let id = req.params.id;
    const users = await User.findAllExceptUser(id);
    return res.json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
};
