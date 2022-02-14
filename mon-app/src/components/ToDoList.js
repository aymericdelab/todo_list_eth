import React from 'react';
import { Wallet } from "ethers";
import '../App.css'

var ethers = require('ethers')
var request = require('request')
var http = require('http')

const PRIVATE_KEY = '39c7cb141dd94ee632a1b15ca7a82a62805330b80aeb341cf2d4316cf08a9b2f'
const CONTRACT = '0x44c1061E5B1Ab4cf202Ec821Afda061E6957656e'

const toDoListArray = ["Do the dishes", "Clean the Room", "Finish the App", "Deploy Smart Contract"];

function VariableList(props) {
    const listView = [];
    const tasks = props.tasks;
    for (let i=0; i<tasks.length; i++) {
        listView.push(
            <div style={{paddingLeft: "5px", marginTop: "5px", marginBottom: "5px"}}>
                <input type="checkbox" value="false"/>
                {tasks[i]}
            </div>
        )
    }
    return listView;
}

export function ListTask() {
    return (
        <div>
            <h4>
                List of Tasks
            </h4>

            <div className="toDoListContainer">
                <VariableList tasks={toDoListArray}></VariableList>
            </div>

            <div>
                <button style={{marginTop: "20px"}}> Send to Ethereum </button>
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


  async createTask() {
      //connect to rinkeby
      var provider = new ethers.providers.InfuraProvider("rinkeby");
      const contract_address = '0x44c1061E5B1Ab4cf202Ec821Afda061E6957656e'
      const abi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"string","name":"task","type":"string"},{"indexed":false,"internalType":"bool","name":"done","type":"bool"}],"name":"TaskLog","type":"event"},{"constant":false,"inputs":[{"internalType":"string","name":"task","type":"string"}],"name":"addTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"task","type":"string"}],"name":"completeTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getToDoList","outputs":[{"components":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"bool","name":"done","type":"bool"},{"internalType":"string","name":"task","type":"string"}],"internalType":"struct ContractToDoList.taskRecord[]","name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"toDoArray","outputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"bool","name":"done","type":"bool"},{"internalType":"string","name":"task","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]
      var wallet = new Wallet(PRIVATE_KEY)
      var walletSigner = wallet.connect(window.provider)
      var contract = new ethers.Contract(contract_address, abi, walletSigner);
      const todo = 'ranger sa chambre'
      const newtask = await contract.populateTransaction.addTask(todo);
      const taskdata = newtask.data;

      //const maxFeePerGas = newtask.maxFeePerGas;
      //test that

      const transactionCount = await walletSigner.getTransactionCount()
      var estimatedGas = await contract.estimateGas.addTask(todo);
      var transaction = {
        nonce: transactionCount,
        from: newtask.from,
        to: CONTRACT,
        data: taskdata,
        gasPrice: null,
        chainId: 4,
        type: 2,
        maxPriorityFeePerGas: ethers.utils.parseUnits('2500000000', 'wei'),
        maxFeePerGas: ethers.utils.parseUnits('2605687154', 'wei'),
        gasLimit: estimatedGas,
      }
      //const sent = await contract.addTask(todo)
      var signedtransaction = await walletSigner.signTransaction(transaction);
      const options = {
      hostname: 'localhost',
      port: 8000,
      path: '/create-task/' + signedtransaction.toString(),
      method: 'GET'
      }
      const req = http.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)

      res.on('data', d => {
        this.setState({
          address: d
        })
      })
    })

    req.on('error', error => {
      console.error(error)
        this.setState({
          address: "Got error : " + error
        })
    })

    req.end()

  }

  render () {
    return (
      <div>
        <button onClick={() => this.createTask()}>  Click here for contract address </button>
      <h1> {this.state.address} </h1> 
      </div>
    )
  }

}

export class Component1 extends React.Component {
  constructor() {
    super();
    this.state = {
      gaspricesstate: 'not yet defined'
    }
  }


  async gaspriceComponent1() {
      //connect to rinkeby
      var provider = new ethers.providers.InfuraProvider("rinkeby")
      const gasprices = await provider.getGasPrice()
      this.setState(
        {
          gaspricesstate: gasprices.toString()
        }
      );
      };

  render() {
    
    return (
      <div>
        <button onClick={() => this.gaspriceComponent1()}> click here plz </button>
      <div> {this.state.gaspricesstate} </div> 
      </div>

    )
  }
}

export function Button1() {

  const provider = ethers.getDefaultProvider();
  var accountPromise = provider.getNetwork();
  var results = accountPromise.then(function(address) {
        if (!address) {
            console.log('No accounts.');
            return 'nothgin'
        } else {
            console.log('Current Account: ' + address);
            return address
        }
      });

  async function sendtx() {
    //connect to rinkeby
    window.provider = new ethers.providers.InfuraProvider("rinkeby")
    var wallet = new Wallet(PRIVATE_KEY)
    var walletSigner = await wallet.connect(window.provider)
    var gasprice = window.provider.getGasPrice().then((result) => { 
      return result })
    return gasprice
  }
  var gasprice2 = sendtx()
  //var gasprice2 = sendtx2()
  return (
  <div>
  <button> click here </button>
  <div> {gasprice2.toString()} </div>
  <div> {results.toString()} </div>
  <Component1> </Component1>
  <ToDoList> </ToDoList>
  </div>)
}