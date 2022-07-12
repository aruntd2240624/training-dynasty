const express = require("express");
const Courses = require("../models/Courses");
const CourseType = require("../models/CourseType");
const Subjects = require("../models/Subjects");
const Streams = require("../models/Streams");
const router = express.Router();

// Get all Courses
router.get("/", async (req, res) => {
  let tempSubjects=[]
  let tempTypes=[]
  let tempStreams=[] 
 
  if(req.query.subject && req.query.subject.length > 0){  //search by subject   
     //Get Subject ID by subject
      Subjects.find({subject:req.query.subject})
        .then(data => {
          //Push ID to Array  
          data.map((d, k) => {
            tempSubjects.push(d._id);
          })    
      //Filter Courses
        Courses.find({ subjects: { $in: tempSubjects } })//filter with Subject ID
        .populate('courseType')
        .populate('subjects')
        .populate('lastUpdatedBy')
        .limit( req.query.limit || 10)       
          .then(data => {
            res.send(data);
          })
          .catch(error => {
            res.send({ error: "Error in finding Course!" });
          })
      })
      .catch(error => {
        res.send({ error: "Subject doesn't exist!" });
      })

  }else if(req.query.type && req.query.type.length > 0){  //search by Type      

          //Get Course type ID by title
          CourseType.find({ title:req.query.type})
          .then(data => {
             //Push ID to Array  
              data.map((d, k) => {
                  tempTypes.push(d._id);
              })    

             Courses.find({ courseType: tempTypes }) //filter with Type ID
             .populate('courseType')
             .populate('subjects')
             .populate('lastUpdatedBy')
             .limit( req.query.limit || 10)           
              .then(data => {
                res.send(data);
              })
              .catch(error => {
                res.send({ error: "Error in finding Course!" });
              })
      })
      .catch(error => {
        res.send({ error: "Type doesn't exist!" });
      })
  }else if(req.query.stream && req.query.stream.length > 0){  //search by Stream  
         let streamsAry=[];
        //Get Streams ID by title
        //Main block
      Streams.find({ title:req.query.stream})  //Main block
        .then(data => {
           //Push ID to Array  
            data.map((d, k) => {
              tempStreams.push(d._id);
            }) 

           
            let streamId=tempStreams.toString();
            streamsAry.push(streamId);           

            //Seond block
            Subjects.find({ stream:{ $in: streamsAry }  }).limit( req.query.limit || 10) 
              .then(data1 => {
                //Push ID to Array  
                data1.map((d, k) => {
                  tempSubjects.push(d._id);
                })
                             
                         //3rd Block
                          Courses.find({ subjects: { $in: tempSubjects } }) //filter with Subject ID
                          .populate('courseType')
                          .populate('subjects')
                          .populate('lastUpdatedBy')
                          .limit( req.query.limit || 10)
                          .then(data2 => {
                            res.send(data2);
                          })//End 3rd Block
                          .catch(error => {
                            res.send({ error: "Error in finding Course!" });
                          })
            })//End Second Block
             .catch(error => {
              res.send({ error: "Stream doesn't exist!" });
            })             
    })//End Main Block
    .catch(error => {
      res.send({ error: "Stream doesn't exist!" });
    })
}else{  //Get All

  Courses.find().limit( req.query.limit || 10).distinct('title')  
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    res.send({ error: "Error in finding Course!" });
  })

}

 

   /* const course = await Courses.find().populate('courseType').populate({
      path : 'courseType',
      match: {courseType : {$eq : req.query.type }}
    }).limit( req.query.limit || 10);*/

   // console.log(course);

  //}
   


});

// Get all Courses
router.post("/", async (req, res) => {
  const course = new Courses({
    title:  req.body.title,
    courseType:  req.body.courseType,
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
