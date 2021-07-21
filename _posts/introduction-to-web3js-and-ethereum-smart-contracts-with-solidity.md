---
title:  "An Introduction to Web3.js and Ethereum Smart Contracts with Solidity"
subtitle: Getting started with Web3.js and Ethereum Smart Contracts.
date: 2021-07-21T20:11:35+06:00
keywords: Introduction to Web3.js, Ethereum Smart Contracts tutorial, Solidity for beginners, Web3.js with JavaScript, How to connect front-end to Ethereum, Web3.js example code, Write Smart Contracts with Solidity, Blockchain development in 2021
author:
  name: Vishal Kumar Verma
---
**Namaste Developers!** 👋

Web3, Ethereum, and Smart Contracts – these words are buzzing everywhere, right? If you’re curious about how to connect your web apps to the Ethereum blockchain, this blog is for you. Don’t worry, I will explain everything **step-by-step** in simple words.

By the end of this blog, you’ll:

- ✅ Understand what Web3.js is.
- ✅ Know how Smart Contracts work with Solidity.
- ✅ Learn how to interact with Ethereum blockchain using Web3.js.

Let’s get started! 🚀

## 1. What is Web3.js?

Web3.js is a **JavaScript library** that allows you to interact with the Ethereum blockchain. You can:

- Connect your web app to Ethereum.
- Send transactions.
- Call Smart Contract functions.

To put it simply, **Web3.js is like a bridge** between your front-end application and the Ethereum blockchain.

## 2. What are Ethereum Smart Contracts?

A **Smart Contract** is like a program that runs on the Ethereum blockchain. You can write these contracts using a language called **Solidity**.

Smart Contracts are **self-executing** – once the conditions are met, the code will execute automatically.

For example:

Imagine you want to create a digital agreement. If Person A sends 1 ETH, then Person B receives a digital product. No middleman, no trust issues – just code doing its job.

## 3. Setting Up Solidity and Writing a Simple Smart Contract

To write Smart Contracts, you need to use **Solidity**. Here’s a basic example of a Smart Contract that stores a simple message:

### Step 1: Write the Smart Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleContract {
    string public message;

    constructor(string memory initMessage) {
        message = initMessage;
    }

    function updateMessage(string memory newMessage) public {
        message = newMessage;
    }
}
```

**What is happening here?**

1. *string public message*; – A public variable to store a message.
2. *constructor* – Sets the initial message when the contract is deployed.
3. *updateMessage* – A function to update the message.

## 4. Deploying the Smart Contract

You can deploy this Smart Contract on the Ethereum blockchain using tools like **Remix IDE** (a browser-based Solidity editor) or **Truffle**.

- Go to Remix IDE.
- Paste the code.
- Compile and deploy it using a test network like **Ropsten** or **Ganache**.

## 5. Connecting to the Smart Contract with Web3.js

Now that we have a deployed Smart Contract, let’s connect it to our front-end app using Web3.js.

### Step 1: Install Web3.js

Install the Web3 library using npm:

```bash
npm install web3
```

### Step 2: Connect to Ethereum

Here’s a simple script to interact with the Smart Contract:

```js
const Web3 = require('web3');

// Connect to an Ethereum node (Infura or Ganache)
const web3 = new Web3("https://ropsten.infura.io/v3/YOUR_INFURA_PROJECT_ID");

// Contract ABI and Address
const contractABI = [ /* Your Contract ABI Here */ ];
const contractAddress = "0xYourContractAddress";

// Load the contract
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Call the contract function
async function readMessage() {
  const message = await contract.methods.message().call();
  console.log("Current Message:", message);
}

// Update the message
async function updateMessage(newMessage, senderAddress, privateKey) {
  const tx = contract.methods.updateMessage(newMessage);
  const gas = await tx.estimateGas({ from: senderAddress });

  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: contractAddress,
      data: tx.encodeABI(),
      gas: gas,
    },
    privateKey
  );

  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log("Transaction Hash:", receipt.transactionHash);
}

// Run
readMessage();
```

## 6. Breaking It Down

1. Web3.js connects your app to Ethereum using an RPC endpoint (like Infura or Ganache).
2. contract.methods.message().call() – Reads the message variable from the Smart Contract.
3. contract.methods.updateMessage().send() – Sends a transaction to update the message.

## 7. Final Output

- Deploy the contract and get its address.
- Run the script above to *read* and *update* the message.

**Example Output**

```
Current Message: Hello, World!
Transaction Hash: 0xabc123...
```

## Final Words 🌟

Web3.js and Solidity are becoming super popular. If you’re a web developer, this is the perfect time to learn how to connect your web apps to the blockchain.

Here’s what you can do next:
- ✅ Start writing your first Smart Contract.
- ✅ Use Web3.js to connect and interact with it.
- ✅ Explore Ethereum test networks like Ropsten or Ganache.

**Happy coding!** 🚀
