var ethers = require('ethers')
var express = require('express');
var request = require('request');

var app = express();
var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: 'http://localhost:8000'}));

app.get('/create-task/:task', function (req, res) {
  var provider = new ethers.providers.InfuraProvider("rinkeby");
  var signedtransaction = req.params.task;
  console.log('Signed transaction: ')
  console.log(signedtransaction)
  provider.sendTransaction(signedtransaction).then((transaction) => {
  console.log(transaction)
  });
})

//ABI defines the methods and structures used to interact with the binary contract (bytecode)
app.get('/abi', function (req, res) {
    request({'uri' : 'https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=0x44c1061E5B1Ab4cf202Ec821Afda061E6957656e'
            }).pipe(res)
})

//app.listen(8000);
var server = app.listen(8000, function () {  
  var host = server.address().address  
  var port = server.address().port  
  console.log("Example app listening at http://%s:%s", host, port)  
})  