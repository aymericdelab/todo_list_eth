import logo from './logo.svg';
//import './App.css';
import styles from './App.css'
import { Wallet } from "ethers";
import { checkResultErrors } from '@ethersproject/abi';
//import { InfuraProvider } from 'ethers/provider'
import * as React from 'react'
// components
import InputTask from './components/InputTask'
import { ListTask } from './components/ToDoList'
import ConnexionButton from './components/Connexion'

var InteractSmartContract = require('./InteractSmartContract')

function App() {

  // user secret key
  const [usePrivateKey, setPrivateKey] = React.useState("");

  // input of the user for new task
  const [useNewTaskInput, setNewTaskInput] = React.useState("");

  // input of the user to mark tasks as done
  const [useCheckedTasks, setCheckedTasks] = React.useState(new Set([]));

  // list of todos retrieved from ethereum
  const [useTodoList, setTodoList] = React.useState([]);

  // only activate first time the app is rendered
  // add event listener
  React.useEffect(() => {InteractSmartContract.retrieveToDoList().then((list) => setTodoList(list))},
  []);
  
  // retrieve the list of tasks from ethereum

  return (
    <div className="App">

      <div id="header" className="headerBlock">

        <div id="title" className="header">
          <h1> To Do List </h1>
        </div>

        <div id="connexionButton" className="connexionButton">
          <ConnexionButton></ConnexionButton>
        </div>

      </div>

      <div id="newTask" className="newTask">
        <InputTask state={[useNewTaskInput, setNewTaskInput]} ></InputTask>
      </div>

      <div id="listTasks">
        <ListTask checkedState={[useCheckedTasks, setCheckedTasks]} 
                  todolistState={[useTodoList, setTodoList]}></ListTask>
      </div>

    </div>
  );
}

export default App;
