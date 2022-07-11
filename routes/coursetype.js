const express = require("express");
const CourseType = require("../models/CourseType");
const router = express.Router();

// Get all CourseType
router.get("/", async (req, res) => {
  const courseType = await CourseType.find();
  res.send(courseType);
});

// Get all CourseType
router.post("/", async (req, res) => {
  const courseType = new CourseType({
    title: req.body.title
  });
  await courseType.save();
  res.send(courseType);
});

// Get courseType by id
router.post("/:id", async (req, res) => {
  try{
    const courseType = await CourseType.findOne({ _id: req.params.id })
	res.send(courseType)
  }catch{
    res.status(404)
		res.send({ error: "Subject doesn't exist!" })
  }
});


// Update courseType by id
router.patch("/:id", async (req, res) => {
  try {
		const courseType = await CourseType.findOne({ _id: req.params.id })

		if (req.body.title) {
			courseType.title = req.body.title
		}

		await courseType.save()
		res.send(courseType)
	} catch {
		res.status(404)
		res.send({ error: "courseType doesn't exist!" })
	}
});


// Get courseType by id
router.delete("/:id", async (req, res) => {
  try {
		await CourseType.deleteOne({ _id: req.params.id })
		res.send("courseType has been deleted")
	} catch {
		res.status(404)
		res.send({ error: "courseType doesn't exist!" })
	}
});

module.exports = router;
