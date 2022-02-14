import logo from './logo.svg';
//import './App.css';
import styles from './App.css'
import { Wallet } from "ethers";
import { checkResultErrors } from '@ethersproject/abi';
//import { InfuraProvider } from 'ethers/provider'
import * as React from 'react'
// components
import InputTask from './components/InputTask'
import ToDoList, {Button1, ListTask} from './components/ToDoList'
import ConnexionButton from './components/Connexion'

function App() {
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
        <InputTask></InputTask>
      </div>

      <div id="listTasks">
        <ListTask></ListTask>
      </div>

    </div>
  );
}

export default App;
