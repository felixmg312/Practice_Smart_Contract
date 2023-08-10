To Deploy contract on auroratestnet:
truffle migrate --network auroratestnet

Compiling Contract:
truffle compile

Test Contract:
truffle test

Enter dev mode:
truffle console --network auroratestnet
storage= await SimpleStorage.deployed()
storage.address
data= await storage.readData()
data.toString()