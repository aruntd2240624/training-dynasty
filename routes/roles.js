const express = require("express");
const Roles = require("../models/Roles");
const router = express.Router();

// Get all Roles
router.get("/", async (req, res) => {
  const Role = await Roles.find();
  res.send(Role);
});

// Get all Roles
router.post("/", async (req, res) => {
  const Role = new Roles({
    title: req.body.title,
    level: req.body.level
  });
  await Role.save();
  res.send(Role);
});

// Get Role by id
router.get("/:id", async (req, res) => {
  try{
    const Role = await Roles.findOne({ _id: req.params.id })
	res.send(Role)
  }catch{
    res.status(404)
		res.send({ error: "Subject doesn't exist!" })
  }
});


// Update Role by id
router.patch("/:id", async (req, res) => {
  try {
		const Role = await Roles.findOne({ _id: req.params.id })

		if (req.body.title) {
			Role.title = req.body.title
		}

		if (req.body.level) {
			Role.level = req.body.level
		}

		await Role.save()
		res.send(Role)
	} catch {
		res.status(404)
		res.send({ error: "Role doesn't exist!" })
	}
});


// Get Role by id
router.delete("/:id", async (req, res) => {
  try {
		await Roles.deleteOne({ _id: req.params.id })
		res.send("Role has been deleted")
	} catch {
		res.status(404)
		res.send({ error: "Role doesn't exist!" })
	}
});

module.exports = router;
