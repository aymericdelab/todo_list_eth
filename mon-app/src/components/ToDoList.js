import React from 'react';
import { Wallet } from "ethers";
import '../App.css'
const InteractSmartContract = require('../InteractSmartContract')

var ethers = require('ethers')
var request = require('request')
var http = require('http')

function handleChecked(state, e) {
    const [useCheckedTasks, setCheckedTasks] = state;
    const taskNumber = e.target.attributes.taskNumber.value;
    //console.log(taskNumber);
    if (useCheckedTasks.has(taskNumber)) {
        useCheckedTasks.delete(taskNumber);
    }
    else {
        useCheckedTasks.add(taskNumber);
    }
    //console.log(useCheckedTasks);
}

function VariableList(props) {
    const listView = [];
    const tasks = props.tasks;
    for (let i=0; i<tasks.length; i++) {
        listView.push(
            <div style={{paddingLeft: "5px", marginTop: "5px", marginBottom: "5px"}}>
                <input taskNumber={i} type="checkbox" onChange={(e) => {handleChecked(props.checkedState, e)}}/>
                {tasks[i]}
            </div>
        )
    }
    return listView;
}

const handleSendToEthereum = ([checkedState, todolistState, keysState]) => {
    const [useCheckedTasks, setCheckedTasks] = checkedState;
    const [useTodoList, setTodoList] = todolistState;
    const [usePrivateKey, setPrivateKey] = keysState;
    //console.log(useCheckedTasks);
    //console.log(useTodoList);

    let taskListDone = [];

    //useCheckedTasks.forEach((i) => taskListDone.push(useTodoList[useCheckedTasks[i]]))
    useCheckedTasks.forEach((i) => taskListDone.push(useTodoList[i]));

    for (const taskDone of taskListDone) {
        usePrivateKey? InteractSmartContract.preSignTransaction(taskDone, false, usePrivateKey)
                            .then((e) => InteractSmartContract.sendToWebServer(e)): console.log('No Private Key Specified')
    }
}

export function ListTask(props) {
    const [useTodoList, setTodoList] = props.todolistState;
    const [usePrivateKey, setPrivateKey] = props.keys;
    return (
        <div>
            <h4>
                List of Tasks
            </h4>

            <div className="toDoListContainer">
                <VariableList checkedState={props.checkedState} tasks={useTodoList}></VariableList>
            </div>

            <div>
                <button checkedState={props.checkedState} 
                        todolistState={props.todolistState} 
                        style={{marginTop: "20px"}}
                        onClick={() => handleSendToEthereum([props.checkedState, props.todolistState, props.keys])}> Send to Ethereum </button>
            </div>

        </div>
    )
}

export default class ToDoList extends React.Component {
  constructor() {
    super();
    this.state = {
      success: false,
      address: 'no address',
      task_list: [],
    }
  }

}
