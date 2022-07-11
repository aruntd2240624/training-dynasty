const express = require("express");
const Users = require("../models/Users");
const router = express.Router();

// Get all Users
router.get("/", async (req, res) => {
  const user = await Users.find().populate('role');
  res.send(user);
});

// Save User
router.post("/", async (req, res) => {
  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });
  await user.save();
  res.send(user);
});

// Get user by id
router.post("/:id", async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.params.id });
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "user doesn't exist!" });
  }
});

// Update user by id
router.patch("/:id", async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.params.id });

    if (req.body.name) {
      user.name = req.body.name;
    }


    if (req.body.role) {
      user.role = req.body.role;
    }

    await user.save();
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "user doesn't exist!" });
  }
});

// Update password
router.patch("/update-password", async (req, res) => {
  const { id,oldpassword, password } = req.body;
  if (!oldpassword) return res.send("Password is required");
  if (!password) return res.send("New Password is required");

  const user = await Users.findOne({ _id: id });

  if (!user) return res.send("User details not found");

  const validate = await bcrypt.compare(oldpassword, user.password);

  if (!validate) return res.send("User details not found");

  if (req.body.password) {
    user.password = req.body.password;
  }

  await user.save();
  res.send({
    message : "Password Updated successfully"
  });
});

// Get user by id
router.delete("/:id", async (req, res) => {
  try {
    await Users.deleteOne({ _id: req.params.id });
    res.send("user has been deleted");
  } catch {
    res.status(404);
    res.send({ error: "user doesn't exist!" });
  }
});

module.exports = router;
