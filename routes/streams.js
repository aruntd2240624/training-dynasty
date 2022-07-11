const express = require("express");
const Streams = require("../models/Streams");
const router = express.Router();

// Get all Streams
router.get("/", async (req, res) => {
  const Stream = await Streams.find();
  res.send(Stream);
});

// Get all Streams
router.post("/", async (req, res) => {
  const Stream = new Streams({
    title: req.body.title
  });
  await Stream.save();
  res.send(Stream);
});

// Get Stream by id
router.post("/:id", async (req, res) => {
  try{
    const Stream = await Streams.findOne({ _id: req.params.id })
	res.send(Stream)
  }catch{
    res.status(404)
		res.send({ error: "Stream doesn't exist!" })
  }
});


// Update Stream by id
router.patch("/:id", async (req, res) => {
  try {
		const Stream = await Streams.findOne({ _id: req.params.id })

		if (req.body.title) {
			Stream.title = req.body.title
		}


		await Stream.save()
		res.send(Stream)
	} catch {
		res.status(404)
		res.send({ error: "Stream doesn't exist!" })
	}
});


// Get Stream by id
router.delete("/:id", async (req, res) => {
  try {
		await Streams.deleteOne({ _id: req.params.id })
		res.send("Stream has been deleted")
	} catch {
		res.status(404)
		res.send({ error: "Stream doesn't exist!" })
	}
});

module.exports = router;
