import React, { Component } from 'react';

class SubmittedTasks extends Component {
    constructor(props){
        super(props);
        this.state={
            tasks: [],
            done: false,
            func : this.props.func
        }
        
       console.log(props);
       
    }
    componentDidMount(){
        this.fetchData()
    }
    fetchData(){
        fetch('http://localhost:4000/mentor/tasks')
        .then(function(response) {
            return response.json();
        })
        .then(response => {
            console.log(response);
            this.getTasks(response)
        }) 
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        })
    }
    getTasks(res){
        console.log(res);
        // var taskList=[],members=[],date=[];
        var groups = {};
        for (var i = 0; i < res.length; i++) {
            if(res[i].submitted && !res[i].done){
                var groupName = res[i].member;
                if (!groups[groupName]) {
                     groups[groupName] = [];
                }
             groups[groupName].push({task: res[i].task , dueDate: res[i].dueDate, ids: res[i]._id});
            }
        }   
        let myArray=[];
        for (groupName in groups) {
            myArray.push({member: groupName, tasks: groups[groupName]});
        }
    
        console.log(myArray);
        this.setState({
            tasks : myArray
        })
    }
    handleSubmit(id){
        // console.log(id);
        fetch('http://localhost:4000/mentee/tasks/complete?id='+id)
        .then(function(response) {
            return response.json();
        })
        .then(response => {
            console.log(response);
            this.fetchData()
             
        }) 
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        })
        this.props.func
    }
    handleReassign(id){
        console.log(id);
        fetch('http://localhost:4000/mentee/tasks/reassign?id='+id)
        .then(function(response) {
            return response.json();
        })
        .then(response => {
            console.log(response);
            this.fetchData()
             
        }) 
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        })
        this.props.func
    }    
  render() {
    let taskList = this.state.tasks;
    // let members = this.state.members;
    // let date = this.state.date;
    console.log(taskList);
        return(
            <div>{
                taskList.map((item,i)=>{
                    // console.log("inside map"+item);
                    return (
                    <div className="assignedTasks">
                        <div className="member">{item.member}</div>{
                        item.tasks.map((val,i)=>{
                           return ( <div><div><span>{val.task}</span><span className="due-date">Due date: {val.dueDate}</span></div>
                            <div className="buttons"><input type="button" onClick={this.handleReassign.bind(this,val.ids)} value="improvement needed"/><input type="button" onClick={this.handleSubmit.bind(this,val.ids)} className="complete"value="completed"/></div>
                           </div>)  
                        })
                        }
                    </div>
                    )
                })

            }
            </div>            
        )
  }
}

export default SubmittedTasks;
