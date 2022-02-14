import React from 'react';
import '../App.css';


export default function InputTask() {
    return(
        <div>
            <h4>
                write new task
            </h4>

            <div>
                <input>
                
                </input>
            </div>

            <div>
                <button style={{marginTop: "20px"}}>
                    Send to Ethereum
                </button>
            </div>
        </div>
    )
}


export class InputTask2 extends React.Component {
  constructor() {
    super();
    this.state = {
      task : "",
      task_list : []
    }
  }
  updateInputValue = (evt) => {
    this.setState({
      task: evt.target.value
    });
  }
  confirmTaskValue = () => {
    this.state.task_list.push(this.state.task)
    console.log(this.state.task_list)
  }

  renderTask(task) {
    return <h1> {task} </h1>
  }

  renderListOfTask(listOfTasks) {
    let allElements = [];
    for (let i=0; i<listOfTasks.length; i++) {
      allElements.push(this.renderTask(listOfTasks[i]));
    }
    console.log('list of elements :', allElements)
    return React.createElement('div', {}, [allElements])
  }
  
  render() {
    return (
    <div>
    <label for="input_task"> {this.state.task} </label>
    <input type="text" id="input_task" onChange={this.updateInputValue}></input>
    <button onClick={this.confirmTaskValue}> Create Task </button>
    <h1>{this.task}</h1>
    <div>{this.renderListOfTask(this.state.task_list)}</div>
    </div>
    )
  }
}