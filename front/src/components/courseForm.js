import React from "react";

let CourseForm =(props)=>{

  return (
    <form onSubmit={props.addCourse}>
      <input value={props.current} type="text"  onChange={props.updateCourse}/>
      <button type="submit"> Add Course</button>
    </form>
  )
}
export default CourseForm ;