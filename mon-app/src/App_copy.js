import logo from './logo.svg';
import './App.css';
import { Wallet } from "ethers";
import { checkResultErrors } from '@ethersproject/abi';
//import { InfuraProvider } from 'ethers/provider'
import * as React from 'react'
var ethers = require('ethers')
var Eth = require('web3-eth');


const PRIVATE_KEY = '39c7cb141dd94ee632a1b15ca7a82a62805330b80aeb341cf2d4316cf08a9b2f'

class Component1 extends React.Component {
  constructor() {
    super();
    this.state = {
      gaspricesstate: 'not yet defined'
    }
  }

  gaspriceComponent() {
      //connect to rinkeby
      window.provider = new ethers.providers.InfuraProvider("rinkeby")
      var wallet = new Wallet(PRIVATE_KEY)
      var walletSigner = wallet.connect(window.provider)
      var gasprice = window.provider.getGasPrice().then((result) => { 
        this.setState(
          {
            gaspricesstate: gasprice.toString()
          }
        )
      })
    };

  //gaspriceComponent();

  render() {
    
    return (
      <div>
        <button onClick={() => this.gaspriceComponent()}> click here plz </button>
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
