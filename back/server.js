const mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect( process.env.DB_CONNECT,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })

  .then(() => console.log('MongoDB Connected correctly ...'))
  .catch(err => console.log(err))

const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true })) // to parse the data
app.use(express.json()) // to make the content header     application/json
// app.use(express.static(__dirname + '/../front/public'));
let courses = [];

// info = {
//     name :"ahmad",
//     age :26
// }


// app.post("/courses",(req,res)=>{
//     console.log(req.body)
//          let course  = new Course({
//           name:req.body[req.body.length -1 ].name
//          })
//          course.save()
//         // courses.push(req.body[req.body.length -1 ])
//         res.json(courses)

// })

// app.get("/getcourses",(req,res)=>{
//   Course.find().then((data)=>{
//     res.json(data)
//   })

// })
// app.get("/info",(req,res)=>{

//     res.json(courses)

// })

app.use('/users', require('./routes/users'))
app.use('/events', require('./routes/events'))


app.listen(5000, () =>{
    console.log('listening' )
})