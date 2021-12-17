import logo from './logo.svg';
import './App.css';
import { Wallet } from "ethers";
import { checkResultErrors } from '@ethersproject/abi';
//import { InfuraProvider } from 'ethers/provider'
import * as React from 'react'
var ethers = require('ethers')
var request = require('request')
var http = require('http')
var https = require('https')

const PRIVATE_KEY = '39c7cb141dd94ee632a1b15ca7a82a62805330b80aeb341cf2d4316cf08a9b2f'


class ToDoList extends React.Component {
  constructor() {
    super();
    this.state = {
      success: false,
      address: 'no address'
    }
  }

  async createTask2() {
      //connect to rinkeby
      var provider = new ethers.providers.InfuraProvider("rinkeby");
      const contract_address = '0x44c1061E5B1Ab4cf202Ec821Afda061E6957656e'
      const abi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"string","name":"task","type":"string"},{"indexed":false,"internalType":"bool","name":"done","type":"bool"}],"name":"TaskLog","type":"event"},{"constant":false,"inputs":[{"internalType":"string","name":"task","type":"string"}],"name":"addTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"task","type":"string"}],"name":"completeTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getToDoList","outputs":[{"components":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"bool","name":"done","type":"bool"},{"internalType":"string","name":"task","type":"string"}],"internalType":"struct ContractToDoList.taskRecord[]","name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"toDoArray","outputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"bool","name":"done","type":"bool"},{"internalType":"string","name":"task","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]
      var wallet = new Wallet(PRIVATE_KEY)
      var walletSigner = wallet.connect(window.provider)
      var contract = new ethers.Contract(contract_address, abi, walletSigner);
      //var contract = new ethers.Contract(contract_address, abi, provider);
      //contract.attach(contract_address);
      //const contractAddress = contract.address;
      // signer.sendTransaction
      //walletSigner.populateTransaction()
      const todo = 'empty the bin can'
      const newtask = await contract.populateTransaction.addTask(todo);
      //const newtask = await contract.populateTransaction.completeTask('CLEAN THE DISHEEEES');
      const taskdata = newtask.data;
      const transactionCount = await walletSigner.getTransactionCount()
      var estimatedGas = await contract.estimateGas.addTask(todo);
      var transaction = {
        nonce: transactionCount,
        from: newtask.from,
        to: '0x44c1061E5B1Ab4cf202Ec821Afda061E6957656e',
        data: taskdata,
        gasPrice: null,
        chainId: 4,
        type: 2,
        maxPriorityFeePerGas: ethers.utils.parseUnits('2500000000', 'wei'),
        //maxFeePerGas: ethers.utils.parseUnits('2505687154', 'wei'),
        maxFeePerGas: ethers.utils.parseUnits('2605687154', 'wei'),
        //gasLimit: ethers.utils.parseUnits('80609','wei'),
        gasLimit: estimatedGas,
      }
      //const sent = await contract.addTask(todo)
      var signedtransaction = await walletSigner.signTransaction(transaction);
      //var sent = await provider.sendTransaction(signedtransaction);
      //console.log(sent)
      //this.setState({
        //address: JSON.stringify(sent, null, 4)
      //})
      // send the signed transaction
      //const httprequest = await http.request('http://localhost:8000/abi')
      //const result = await httprequest.response
      //var signedtransaction_content = JSON.stringify(results, null, 4);
      //const msg = 'http://localhost:8000/create-task/' + signedtransaction.tostring()
      //const msg = 'http://localhost:8000/abi'
      const options = {
      hostname: 'localhost',
      port: 8000,
      path: '/create-task/' + signedtransaction.toString(),
      method: 'GET'
      }
      //const req = https.get('https://api.openweathermap.org/data/2.5/weather?q=London', res => {
      const req = http.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)

      res.on('data', d => {
        //process.stdout.write(d)
        this.setState({
          address: d
          //address: JSON.stringify(d, null, 4)
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

  async createTask1() {
      //connect to rinkeby
      var provider = new ethers.providers.InfuraProvider("rinkeby");
      const contract_address = '0x44c1061E5B1Ab4cf202Ec821Afda061E6957656e'
      const abi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"string","name":"task","type":"string"},{"indexed":false,"internalType":"bool","name":"done","type":"bool"}],"name":"TaskLog","type":"event"},{"constant":false,"inputs":[{"internalType":"string","name":"task","type":"string"}],"name":"addTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"task","type":"string"}],"name":"completeTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getToDoList","outputs":[{"components":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"bool","name":"done","type":"bool"},{"internalType":"string","name":"task","type":"string"}],"internalType":"struct ContractToDoList.taskRecord[]","name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"toDoArray","outputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"bool","name":"done","type":"bool"},{"internalType":"string","name":"task","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]
      var wallet = new Wallet(PRIVATE_KEY)
      var walletSigner = wallet.connect(window.provider)
      var contract = new ethers.Contract(contract_address, abi, walletSigner);
      //contract.attach(contract_address);
      //const contractAddress = contract.address;
      // signer.sendTransaction
      const newtask = await contract.addTask('DO YOUR HOMEWORK')
      //const transactionCount = await walletSigner.getTransactionCount()
      this.setState({
        address: JSON.stringify(newtask, 4, null)
        //address: contract.address.toString(),
        //address: transactionCount.toString(),
        //address: 'helloooo'
      })
  } 

  render () {
    return (
      <div>
        <button onClick={() => this.createTask2()}>  Click here for contract address </button>
      <h1> {this.state.address} </h1> 
      </div>
    )
  }

}

class Component1 extends React.Component {
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

function Button1() {

  async function sendtx2() {
    try {
      const provider = ethers.getDefaultProvider();
      return await provider.getNetwork()
    } catch (e) {
      console.log(e)
    }
  }

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
  <Component1></Component1>
  <ToDoList></ToDoList>
  </div>)
}

function App() {
  return (
    <div className="App">
      <Button1> </Button1>
    </div>
  );
}

export default App;
