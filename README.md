# Todo List on Ethereum

## Description of the project
The goal of the project is to create a todolist on the ethereum blockchain.

1. A user can connect using the "Sign In" button.
2. A user can add a task to the to do list associated to its ethereum address
3. The list of tasks that need to be done are retrieved from the blockchain an shown on the app.
4. A user can mark a task as done and change the state of the to do list on the blokchain.

The smart contract has been deployed on the Rinkeby testnet and can be seen here: https://rinkeby.etherscan.io/address/0x44c1061E5B1Ab4cf202Ec821Afda061E6957656e

## Tools
- Remix to deploy contract
- React to create the app
- ethers.js to interact with the contract


## Launch

The React app can be started by going into /my-app directory and launching:

	npm start

When the app is launched, the webserver can be started using node:

	node webserver.js

## Contract
The smart contract can be found in todolist.sol

## Interactions with the Smart Contract
All the interactions with the smart contract are made through mon-app/src/InteractSmartContract.js




