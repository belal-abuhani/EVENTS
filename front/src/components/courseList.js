import React , {Component} from "react"

class login extends Component {
  state= {
    isEdit:false
  }
  renderCourse = ()=>{
    return(
         <li>
          <span>{this.props.detail.name}</span>
          <button onClick={()=>{this.toggleState()}} type="submit"> Edit Course</button>
          <button  onClick= {()=> {this.props.deleteCourse(this.props.index)}}> delete </button>
        </li>
    )
  }

  toggleState =()=>{
   let  {isEdit} = this.state
    this.setState({
      isEdit: !isEdit
    })
  }
  updateCourse = (e)=>{
    e.preventDefault();
    this.props.editCourse(this.props.index,this.input.value);
    this.toggleState();
  }
  renderUpdateForm=()=>{
    return(
      <form onSubmit={this.updateCourse}>
        <input type="text" ref={(v)=>{this.input = v}} defaultValue={this.props.detail.name} />
        <button > update course</button>
      </form>
    )
  }
  render(){
    return (
       <React.Fragment>
       { this.state.isEdit ? this.renderUpdateForm() : this.renderCourse() }
      </React.Fragment>
    );
  }

  }


export default login;