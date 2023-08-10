const Web3 = require("web3");

// Loading the contract ABI
// (the results of a previous compilation step)
const fs = require("fs");
const { abi } = JSON.parse(fs.readFileSync("build/contracts/SimpleStorage.json"));

async function main() {
  // Configuring the connection to an Ethereum node
  const network = process.env.ETHEREUM_NETWORK;
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://aurora-testnet.infura.io/v3/${process.env.API_KEY}`,
    ),
  );
  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.SIGNER_PRIVATE_KEY,
  );
  web3.eth.accounts.wallet.add(signer);
  // Creating a Contract instance
  const contract = new web3.eth.Contract(
    abi,
    // Replace this with the address of your deployed contract
    process.env.DEMO_CONTRACT,
  );
  // Issuing a transaction that calls the `updateData` method
  const tx = contract.methods.updateData(20);
  const receipt = await tx
    .send({
      from: signer.address,
      gas: await tx.estimateGas(),
    })
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log("tx hash is: ", txhash);
    });
  // The transaction is now on chain!
  console.log(`Mined in block ${receipt.blockNumber}`);

  const contractInstance = new web3.eth.Contract(abi,process.env.DEMO_CONTRACT);

  // Call the readData() function to get the returned value
  const returnedValue = await contractInstance.methods.readData().call();
  
  console.log("Returned value:", returnedValue);

}

require("dotenv").config();
main();