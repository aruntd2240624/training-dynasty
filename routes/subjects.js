const express = require("express");
const Subjects = require("../models/Subjects");
const router = express.Router();

// Get all subjects
router.get("/", async (req, res) => { 
  const subject = await Subjects.find()
  .populate('stream')
  .populate('lastUpdatedBy')
  .sort({subject: req.query.sort || 1}).limit(req.query.limit || 10)
  res.send(subject);
});

// Get all subjects
router.post("/", async (req, res) => {
  const subject = new Subjects({
    subject: req.body.subject,
	stream:req.body.stream,
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

		if (req.body.subjects) {
			subject.subject = req.body.title
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
