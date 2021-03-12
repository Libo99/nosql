const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require('./User');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost/nosql", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error:"));

db.once("open",  () => {
  console.log("Successfully connected to MongoDB!");
});



app.get("/", function (req, res) {
  res.json({msg: "Hello Express!"});
});

//Signup API
app.post('/signup', (req, res) => {

  var newUser = new User(req.body);
  newUser.save((err,data) => {
      if(err){
          res.send(err);
      }else{
          res.send('User Registered');
      }
  })
});

//Login API
app.post('/login', (req,res) => {
    User.findOne({'email':req.body.email,'password':req.body.password}, (err,data) => {
        if(err){
            res.status(400).send(err);
        }else if(data){
            res.send('User Login Successful');
        }else {
            res.status(400).send('Wrong Username Password Combination');
        }
    })
});

const port = 3000;

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

