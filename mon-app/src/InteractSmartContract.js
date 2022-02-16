var ethers = require('ethers')
var http = require('http')
var React = require('react')


const retrieveAddressFromPK = (pk) => {
    var wallet = new ethers.Wallet(pk);
    //console.log(wallet.address);
    return wallet.address;
}

const listenEvents = (pk) => {
    const CONTRACT = '0x44c1061E5B1Ab4cf202Ec821Afda061E6957656e';
    const provider = new ethers.providers.InfuraProvider("rinkeby")
    const abi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"string","name":"task","type":"string"},{"indexed":false,"internalType":"bool","name":"done","type":"bool"}],"name":"TaskLog","type":"event"},{"constant":false,"inputs":[{"internalType":"string","name":"task","type":"string"}],"name":"addTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"task","type":"string"}],"name":"completeTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getToDoList","outputs":[{"components":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"bool","name":"done","type":"bool"},{"internalType":"string","name":"task","type":"string"}],"internalType":"struct ContractToDoList.taskRecord[]","name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"toDoArray","outputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"bool","name":"done","type":"bool"},{"internalType":"string","name":"task","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]
    var wallet = new ethers.Wallet(pk)
    var walletSigner = wallet.connect(provider)
    var contract = new ethers.Contract(CONTRACT, abi, walletSigner);
    //contract.on("TaskLog", (event) => {console.log('aymeric'); console.log(useEventCounter)});
    return contract;
}

const retrieveToDoList = (pk) => {
    const CONTRACT = '0x44c1061E5B1Ab4cf202Ec821Afda061E6957656e';
    const provider = new ethers.providers.InfuraProvider("rinkeby")
    const abi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"string","name":"task","type":"string"},{"indexed":false,"internalType":"bool","name":"done","type":"bool"}],"name":"TaskLog","type":"event"},{"constant":false,"inputs":[{"internalType":"string","name":"task","type":"string"}],"name":"addTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"task","type":"string"}],"name":"completeTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getToDoList","outputs":[{"components":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"bool","name":"done","type":"bool"},{"internalType":"string","name":"task","type":"string"}],"internalType":"struct ContractToDoList.taskRecord[]","name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"toDoArray","outputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"bool","name":"done","type":"bool"},{"internalType":"string","name":"task","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]
    var wallet = new ethers.Wallet(pk)
    var walletSigner = wallet.connect(provider)
    var contract = new ethers.Contract(CONTRACT, abi, walletSigner);
    const promiseList = contract.getToDoList();
    return promiseList.then((list) => {return parseToDoList(list)});
}

const parseToDoList = (list) => { 
    const address = '0x4DAb0993C8c2A235ee12B1981746B892bb676A60';
    let ownerList = [];
    for (let i in list) {
        if ((list[i][0] == address) && (list[i][1] == false)) {
            ownerList.push(list[i][2]);
        };
    };
    return ownerList
}

const preSignTransaction = (task, is_new_task=true, pk) => {
    //const PRIVATE_KEY = '39c7cb141dd94ee632a1b15ca7a82a62805330b80aeb341cf2d4316cf08a9b2f';
    const CONTRACT = '0x44c1061E5B1Ab4cf202Ec821Afda061E6957656e';
    const provider = new ethers.providers.InfuraProvider("rinkeby")
    const abi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"string","name":"task","type":"string"},{"indexed":false,"internalType":"bool","name":"done","type":"bool"}],"name":"TaskLog","type":"event"},{"constant":false,"inputs":[{"internalType":"string","name":"task","type":"string"}],"name":"addTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"task","type":"string"}],"name":"completeTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getToDoList","outputs":[{"components":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"bool","name":"done","type":"bool"},{"internalType":"string","name":"task","type":"string"}],"internalType":"struct ContractToDoList.taskRecord[]","name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"toDoArray","outputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"bool","name":"done","type":"bool"},{"internalType":"string","name":"task","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]
    var wallet = new ethers.Wallet(pk)
    var walletSigner = wallet.connect(provider)
    var contract = new ethers.Contract(CONTRACT, abi, walletSigner);

    //promises
    const promise1 = walletSigner.getTransactionCount()
    const promise2 = is_new_task? contract.estimateGas.addTask(task): contract.estimateGas.completeTask(task);
    const promise3 = is_new_task? contract.populateTransaction.addTask(task): contract.populateTransaction.completeTask(task);
    
    // resolve all promises at once
    return (Promise.all([promise1, promise2, promise3]).then(([transactionCount, estimatedGas, newtask]) => {
    return ({
        nonce: transactionCount,
        from: newtask.from,
        to: CONTRACT,
        data: newtask.data,
        gasPrice: null,
        chainId: 4,
        type: 2,
        maxPriorityFeePerGas: ethers.utils.parseUnits('2500000000', 'wei'),
        maxFeePerGas: ethers.utils.parseUnits('2605687154', 'wei'),
        gasLimit: estimatedGas,
    })
    })
    .then((transaction) => {
        return (walletSigner.signTransaction(transaction));
        })
    .catch((error) => console.log(error))
    )
}

const sendToWebServer = (preSignedTx) => {
    const options = {
        hostname: 'localhost',
        port: 8000,
        path: '/presigned-transaction/' + preSignedTx.toString(),
        method: 'GET'
    };
    const req = http.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            console.log(d.toString());
        })
    });
    req.on('error', error => {
        console.error(error)
    });
    req.end();
};

//export { preSignTransaction, sendToWebServer };

exports.preSignTransaction = preSignTransaction;
exports.sendToWebServer = sendToWebServer;
exports.retrieveToDoList = retrieveToDoList;
exports.listenEvents = listenEvents;
exports.retrieveAddressFromPK = retrieveAddressFromPK;


//listenEvents();