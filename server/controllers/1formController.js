//form controller.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { DataModel, LoginModel } = require('../model/model');

router.post('/user_reg',async(req,res)=>{

    try 
    {
        const newUser=new DataModel({
            name:req.body.name,
            address:req.body.address,
        })
        const saveUser=await newUser.save();
        const saltRounds = 10;
        const { email, password } = req.body;
        var usertype=1;
        var loginid =saveUser._id;

        
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newLogin = new LoginModel({ email, password: hashedPassword,usertype:usertype,loginid:loginid });

        const savedLogin = await newLogin.save();
    

        res.status(201).json({ user: saveUser, login: savedLogin }); 
    } catch (error) {
        res.status(500).json({ error: 'Could not insert data' });

    }
})
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const loginData = await LoginModel.findOne({ email });
      // console.log("nayana"+loginData)
  
      if (loginData) {
        bcrypt.compare(password, loginData.password, function (err, result) {
          if (err) {
            throw err;
          } else {
            
            if (result) {
              req.session.user_id = loginData._id;
              req.session.usertype = loginData.usertype;
              if (loginData.usertype === 0) {
                // console.log("admin")
                userTypeString = 'admin';
              } else if (loginData.usertype === 1) {
                // console.log("user")
                userTypeString = 'user';
              } else if (loginData.usertype === 2) {
                // console.log("hr")
                userTypeString = 'hr';
              }
              res.status(201).json({ user: result,usertype: userTypeString  });
            } else {
              // console.log("Login failed");
              res.status(401).json({ error: 'Login failed' });
            }
          }
        });
      } else {
        console.log("User not found");
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
  

module.exports = router;
