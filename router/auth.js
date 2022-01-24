const express = require("express");
const router = express.Router();
const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");


router.use(express.json());

router.get("/register", async (req, res) => {
  try {
    const studentsData = await User.find();
    res.send(studentsData);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Please Fill The Field Properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exist" });
    }
    else if (password != cpassword) {
      return res.status(422).json({ error: "Password and Confirm Password doesn't match" });
    }
    else {
      const user = new User({ name, email, phone, work, password, cpassword });

      await user.save();
      res.status(201).json({ message: "Successfully registered" });
    }

  } catch (err) {
    console.log(err);
  }
});


//login route
router.post("/signin", async (req, res) => {

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please Fill the data" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();
      console.log(token);
      res.cookie("jswtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true
      });
      if (!isMatch) {
        res.status(400).json({ message: "Invalid Credentials" })
      }
      else
        res.json({ message: " Sign in successful" });
    }


    console.log(userLogin);

  } catch (error) {
    console.log(error)

  }
})



//About Page
router.get('/about', authenticate, (req, res) => {
  res.send(req.rootUser);
})


//Contact Get Data 
router.get('/getdata', authenticate, (req, res) => {
  res.send(req.rootUser);
})

///Contact Page
router.post('/contact', authenticate, async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, phone, message } = req.body;
    // console.log(req.body.name);
    // console.log(req.body.email);
    // console.log(req.body.phone);
    // console.log(req.body.message);
    if (!name || !email || !phone || !message) {
      return res.json({ error: "Plz fill the form properly" })
    }
    const userContact = await User.findOne({ _id: req.userID });

    if (userContact) {
      const userMessage = await userContact.addMessage(name, email, phone, message);
      await userContact.save();
      res.status(201).json({ message: "User Contacted Successfully" })
    }

  } catch (error) {
    console.log(error)
  }
})

/////Logout Page
router.get('/logout',(req,res)=>{
  console.log('Hello my logout page');
  res.clearCookie('jswtoken',{path:'/'})
  res.status(200).send("User Logout");
})
module.exports = router;
