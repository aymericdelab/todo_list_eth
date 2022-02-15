var ethers = require('ethers')
var express = require('express');
var request = require('request');

var app = express();
var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: 'http://localhost:8000'}));


app.get('/presigned-transaction/:tx', function (req, res) {
  //console.log(req.params.tx)
  var provider = new ethers.providers.InfuraProvider("rinkeby");
  var signedtransaction = req.params.tx;
  //console.log('Signed transaction: ')
  //console.log(signedtransaction)
  //const transaction = provider.sendTransaction(signedtransaction)
  //const receipt = wait(transaction)
  //console.log('wille print receipt ...')
  //console.log(receipt);
  res.setHeader('Access-Control-Allow-Origin', '*')
  provider.sendTransaction(signedtransaction)
    .then((transaction) => { return (transaction.wait()) })
    .then((receipt) => res.status(200).send(receipt))
    .catch((error) => console.log(error));
  });

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