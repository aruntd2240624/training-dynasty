const express = require("express");
const Subjects = require("../models/Subjects");
const router = express.Router();

// Get all subjects
router.get("/", async (req, res) => {
  console.log(req);
  const subject = await Subjects.find().sort({title: req.query.sort || 1}).limit(req.query.limit || 10);
  res.send(subject);
});

// Get all subjects
router.post("/", async (req, res) => {
  const subject = new Subjects({
    title: req.body.title,
    lastUpdatedBy: req.user.id,
  });
  await subject.save();
  res.send(subject);
});

// Get subject by id
router.post("/:id", async (req, res) => {
  try{
    const subject = await Subjects.findOne({ _id: req.params.id })
	res.send(subject)
  }catch{
    res.status(404)
		res.send({ error: "Subject doesn't exist!" })
  }
});


// Update subject by id
router.patch("/:id", async (req, res) => {
  try {
		const subject = await Subjects.findOne({ _id: req.params.id })

		if (req.body.title) {
			subject.title = req.body.title
		}


    subject.lastUpdatedBy = req.user.id

		await subject.save()
		res.send(subject)
	} catch {
		res.status(404)
		res.send({ error: "Subject doesn't exist!" })
	}
});


// Get subject by id
router.delete("/:id", async (req, res) => {
  try {
		await Subjects.deleteOne({ _id: req.params.id })
		res.send("Subject has been deleted")
	} catch {
		res.status(404)
		res.send({ error: "Subject doesn't exist!" })
	}
});

module.exports = router;
