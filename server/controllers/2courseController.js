const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const { AdminModel,UserModel } = require('../model/model');

// Define storage for image and video
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'image') {
      cb(null, path.join(__dirname, '../../client/public/photos')); // image destination
    } else if (file.fieldname === 'videos') {
      cb(null, path.join(__dirname, '../../client/public/videos')); // Video destination
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 2e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
},
});

const upload = multer({ storage: storage });




router.post('/course', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'videos', maxCount: 100 }]), async (req, res) => {
  const image = req.files['image'][0]; // Access the uploaded image file
  const videos = req.files['videos']; // Access the uploaded video files

  try {
    const newUser = new AdminModel({
      course: req.body.name,
      describtion: req.body.desc,
      category: req.body.category,
      duration: req.body.duration,
      certificate: req.body.certificate,
      image: image ? image.filename : null, // Corrected access to filename
      videos: videos ? videos.map(video => video.filename) : [], // Corrected mapping of filenames
    });
    const saveUser = await newUser.save();

    res.status(201).json({ user: saveUser });
  } catch (error) {
    res.status(500).json({ error: 'Could not insert data' });
  }
});





router.get('/courses', async (req, res) => {
  try {
   
    const adminData = await AdminModel.find({});
    res.status(200).json({ data: adminData });
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve data' });
  }
});


  router.delete('/delete/:id', async (req, res) => {
    try {
      const id = req.params.id;
      
      
      const deletedRecord = await AdminModel.findByIdAndRemove(id);
  
      if (deletedRecord) {
        res.status(200).json({ message: 'Record deleted successfully' });
      } else {
        res.status(404).json({ error: 'Record not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Could not delete record' });
    }
  });





 router.post('/join', async (req, res) => {
  try {
    const { selectedItemId } = req.body;

    
    const loginId = req.session.user_id;

    
    const newUser = new UserModel({
      loginId,
      selectedItemId,
    });

    const savedUser = await newUser.save();

    res.status(201).json({ user: savedUser });
  } catch (error) {
    res.status(500).json({ error: 'Could not join the course' });
  }
});




router.get('/getCourseData', async (req, res) => {
  try {
    const login = req.session.user_id;

    
    const userId = new mongoose.Types.ObjectId(login);

    const userData = await UserModel.aggregate([
      {
        $match: {
          loginId: userId, 
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "selectedItemId",
          foreignField: "_id",
          as: "allpost",
        },
      },
    ]);

    if (!userData || userData.length === 0) {
      console.log("No data found for the user.");
      res.status(404).json({ error: 'No data found' });
      return;
    }

    console.log(userData);
    res.status(200).json({ userData });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Could not retrieve user data' });
  }
});


  
  
  
  module.exports = router;
