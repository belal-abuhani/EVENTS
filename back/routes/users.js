
const express = require('express');
const router = express.Router();
const {User} = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const joi = require( "@hapi/joi");


const userSchema = joi.object({
  name : joi.string().min(6).required(),
  email : joi.string().min(6).required().email(),
  password : joi.string().min(6).required()

});

const loginSchema = joi.object({
  email : joi.string().min(6).required().email(),
  password : joi.string().min(6).required()

});


router.post("/add",async (req,res)=>{
  const {error} = userSchema.validate(req.body)
  if(error) res.send(error.details[0].message)

  const isEmailExsist = await User.findOne({email:req.body.email})
  if(isEmailExsist) return res.status(400).send("email already exist")

  const salt  = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password,salt)

  const user = new User({
    name : req.body.name,
    email:req.body.email,
    password :hashPassword
  });

  try{
    const savedUser = await  user.save();
    res.send(savedUser);
  }
  catch(err){
    res.status(400).send(err);
  }

});

router.post("/login", async(req,res)=>{

const {error} = loginSchema.validate(req.body);
  if(error) res.send(error.details[0].message);

  const user = await User.findOne({email:req.body.email});
  if( !user) return res.status(400).send("email dose not exist");

  const validPassword = await bcrypt.compare(req.body.password,user.password);
  if( !validPassword) return res.status(400).send("password is wrong");

  const token = jwt.sign({_id:user._id},process.env.TOKEN);
  console.log(token);
  res.header("login",token).send(token);

});

module.exports = router
