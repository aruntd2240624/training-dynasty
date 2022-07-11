const express = require("express");
const Courses = require("../models/Courses");
const router = express.Router();

// Get all Courses
router.get("/", async (req, res) => {
  const course = await Courses.find().populate('type').populate({
    path : 'stream',
    match: {title : {$eq : req.query.stream }}
  }).populate({
    path : 'subjects',
    match: {title : {$eq : req.query.subject}}
  }).populate('lastUpdatedBy').limit( req.query.limit || 10);
  res.send(course);
});

// Get all Courses
router.post("/", async (req, res) => {
  const course = new Courses({
    title:  req.body.title,
    type:  req.body.type,
    stream: req.body.stream,
    subjects:  req.body.subjects,
    lastUpdatedBy:  req.user.id
  });
  await course.save();
  res.send(course);
});

// Get course by id
router.post("/:id", async (req, res) => {
  try {
    const course = await Courses.findOne({ _id: req.params.id });
    res.send(course);
  } catch {
    res.status(404);
    res.send({ error: "Subject doesn't exist!" });
  }
});

// Update course by id
router.patch("/:id", async (req, res) => {
  try {
    const course = await Courses.findOne({ _id: req.params.id });

    if (req.body.title) {
      course.title = req.body.title;
    }

    if (req.body.type) {
      course.type = req.body.type;
    }


		if (req.body.stream) {
			course.stream = req.body.stream
		}

    if (req.body.subjects) {
      course.subjects = req.body.subjects;
    }

    course.lastUpdatedBy =  req.user.id

    await course.save();
    res.send(course);
  } catch {
    res.status(404);
    res.send({ error: "course doesn't exist!" });
  }
});

// Get course by id
router.delete("/:id", async (req, res) => {
  try {
    await Courses.deleteOne({ _id: req.params.id });
    res.send("course has been deleted");
  } catch {
    res.status(404);
    res.send({ error: "course doesn't exist!" });
  }
});

module.exports = router;
