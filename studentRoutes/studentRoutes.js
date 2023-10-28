
// Connects frontend to the backend - one unit to the another
// To connect we need to use the module named router

const express = require("express");
const router = express.Router();
const studentSchema = require("../schema/studentSchema");



router.get("/", (req, res, next) => {
  studentSchema.find((err, data) => {
    if (err) {
      return next(err);
    } else {
      return res.json(data);
    }
  });
});


 router.post("/create-student", (req, res, next) => {
  studentSchema.create(req.body, (err, data) => {
      if(err) {
          return next (err);
      }
      else {
          res.json(data);
      }
  });
});

router.post("/login", (req, res) => {
  const {name, email, password} = req.body;  //debodying the object
  studentSchema.findOne({email : email }).then((student) => {
    if(student) {
      //databasepassword === entered password
      if(student.password === password){
        res.json("Login Successful");
      }
      else {
        res.json("Password Incorrect");
      }
    } else {
      res.json("No Records Found");
      //console.log("No Records Found");
    }
  })
});

router.delete("/delete-student/:id", (req, res, next) => {
  studentSchema.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      return next(err);
    } else {
      return res.json(data);
    }
  });
});

module.exports = router;

//used to go route to the particular id
router.route("/update-student/:id").get((req, res, next) => {
  studentSchema.findById(req.params.id, (err, data) => {
    if(err) {
      return next(err);
    } else {
      return res.json(data);
    }
  });
}).put((req, res, next) => {
  studentSchema.findByIdAndUpdate(
    req.params.id, 
    {$set: req.body}, 
    (err, data) => {
    if(err) {
      return next(err);
    } else {
      return res.json(data);
    }
  })
})

