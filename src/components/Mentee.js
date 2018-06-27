import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Mentee extends Component {
    constructor(props){
        super(props);
        this.state={
            menteeTasks : [],
            submit: false
        }
    }
    handleClick(id){
        console.log(id);
        fetch('http://localhost:4000/mentee/tasks/sub?id='+id)
        .then(function(response) {
            return response.json();
        })
        .then(response => {
             console.log(response);
        }) 
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        })
        this.fetchFunc()
        this.setState(prevState => ({
            submit: !prevState.submit
          }));
    }
    fetchFunc(){
        fetch('http://localhost:4000/mentee/tasks')
        .then(function(response) {
            return response.json();
        })
        .then(response => {
            // console.log(response);
            this.getMenteeTasks(response)
        }) 
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        })
    }
    componentDidMount(){
        this.fetchFunc()
    }
    getMenteeTasks(res){
        let menteeTasks = res.filter(item => item.done === false);
        this.setState({
            menteeTasks : menteeTasks
        })
    }
    render() {
        let menteeTaskList = this.state.menteeTasks;
      return (
        <div className="container">
          <div className="header"><span>Mentee Dashboard</span></div>
          <div className="mentorName"><span>Hi Prabha!</span></div>
          <div className="lists">
            <div className="menteeTaskList">Assigned Tasks</div>
          </div>
          <div>{
              menteeTaskList.map((item,i)=>{
                return (
                <div className="menteeTasks">
                    <div id="menteeTasks">
                        <span>{item.task}</span>
                        <span className="due_date">{item.dueDate}</span>
                    </div>
                    <input id="submitButton" type="button"  value = {item.submitted? "Submitted" : "Submit for review"} onClick = {this.handleClick.bind(this,item._id)} /> 
                </div>
                )
              })
          }</div>
        </div>
      )
    }
  }
  
  export default Mentee;