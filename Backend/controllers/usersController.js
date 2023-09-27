const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// POST /api/users
const register = async (req, res) => {
  let { name, email, phone, password, role = 0 } = req.body;

  // Validate presence of data
  if (!name || !email || !password) {
    res
      .status(400)
      .json({ error: "User must have a name, email and password." });
    return;
  }

  // Validate data types
  try {
    if (typeof role === "string") {
      role = parseInt(role);
    }
  } catch (err) {
    res
      .status(400)
      .json({ error: `Failed to convert role into an integer. Error: ${err}` });
    return;
  }

  // Check that user with this email does not exist
  const user = await User.findOne({ email });

  if (user) {
    res
      .status(400)
      .json({ error: `User with email ${email} already registered.` });
    return;
  }

  // Save to the database
  try {
    const payload = toUnderscoreCase({
      name,
      email,
      password: await hashPassword(password),
      phone,
      role,
    });

    const user = await User.create(payload);

    const resData = toCamelCase({
      _id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id),
    });

    res.status(200).json(resData);
  } catch (err) {
    res.status(500).json({ error: `Failed to register user. Error: ${err}` });
  }
};

// PATCH /api/users/
const update = async (req, res) => {
  const id = req.user.id;
  let { name, email, phone, password, role } = req.body;

  // Validate data types
  try {
    if (role) {
      role = parseInt(role);
    }
  } catch (err) {
    res
      .status(400)
      .json({ error: `Failed to convert role into an integer. Error: ${err}` });
    return;
  }

  if (!validId(id)) {
    res.status(400).json({ error: `${id} is not a valid user id.` });
    return;
  }

  // Update course
  try {
    const payload = toUnderscoreCase({
      name,
      email,
      password: await hashPassword(password),
      phone,
      role,
    });

    const user = await User.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });

    res.status(200).json(toCamelCase(user.toObject()));
  } catch (err) {
    res.status(500).json({ error: `Failed to update the user. Error: ${err}` });
  }
};

// DELETE /api/users/
const remove = async (req, res) => {
  const id = req.user.id;

  if (!validId(id)) {
    res.status(400).json({ error: `${id} is not a valid user id.` });
    return;
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    res.status(404).json({ error: `Failed to delete the user.` });
    return;
  }

  res.status(200).json(toCamelCase(user.toObject()));
};

// POST /api/users/login
const login = async (req, res) => {
  let { email, password } = req.body;

  // Validate presence of data
  if (!email || !password) {
    res.status(400).json({ error: "Please, provide email and password." });
    return;
  }

  // Find user
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(400).json({ error: "email or password is invalid." });
    return;
  }

  const resData = toCamelCase({
    _id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    token: generateToken(user._id),
  });

  res.status(200).json(resData);
};

const validId = (id) => {
  ObjectId = mongoose.Types.ObjectId;

  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const toUnderscoreCase = (obj) => {
  const res = {};

  for (const [key, val] of Object.entries(obj)) {
    if (val !== undefined) {
      const underscored = key
        .replace(/(?:^|\.?)([A-Z])/g, (x, y) => "_" + y.toLowerCase())
        .replace(/^_/, "");
      res[underscored] = val;
    }
  }

  return res;
};

const toCamelCase = (obj) => {
  const res = {};

  for (const [key, val] of Object.entries(obj)) {
    if (val !== undefined) {
      const camelCased = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      res[camelCased] = val;
    }
  }

  return res;
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "30d" });
};

const hashPassword = async (password) => {
  if (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
};

module.exports = {
  register,
  delete: remove,
  update,
  login,
};
