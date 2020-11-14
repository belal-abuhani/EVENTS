import './App.css';
import React , {Component} from "react"
import CourseForm from "./components/courseForm"
import CourseList from "./components/courseList"

import axios from "axios"

class App extends Component {

  state = {
   courses:[],
    current: "",
  }
  updateCourse=(e)=>{
    this.setState({
      current:e.target.value
    })
    // console.log(e.target.value)
  }
  addCourse = (e)=>{
    e.preventDefault();
    let {current} = this.state
    let {courses} = this.state
      courses.push({name:current})
    axios.post("/courses",this.state.courses).then((response)=>{
      console.log(response)
    //    this.setState({
    //   courses:response.data,
    //   current:""
    // })
    this.componentDidMount()
    })

    // this.setState({
    //   courses,
    //   current:""
    // })

    // courses.push({name:current})
    // this.setState({
    //   courses,
    //   current:""
    // })

  }

  editCourse = (index,newValue)=>{
    let {courses} = this.state
    let course= courses[index]
    course["name"] = newValue
    this.setState({
      courses
    })
  }


  deleteCourse = (index)=>{
    let {courses} = this.state
    courses.splice(index,1);
    this.setState({courses});

  }
  componentDidMount =()=>{
    axios.get("/getcourses").then((response)=>{
      console.log(response.data)
      this.setState({
        courses : response.data
      })
      // if(!error && response.statusCode === 200){
      //   console.log(response.data)
      // }
      // console.log(response.data)

    })
  }
  render(){
    const {courses} = this.state ;
    const courseList = courses.map((course,index)=>{
      return  <CourseList editCourse={this.editCourse}  key={index} index={index}  detail = {course} deleteCourse = {this.deleteCourse}/>

    })

    return (

      <div className="App">
        <h2>Add Course</h2>
        <CourseForm  updateCourse={this.updateCourse} addCourse = {this.addCourse} current={this.state.current}/>
        <ul>{courseList}</ul>
      </div>
    );
  }

  }


export default App;
