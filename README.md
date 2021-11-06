# How to run the React app

Dependencies:
* Truffle
* React.js
* Node

Useful articles:
* https://www.trufflesuite.com/guides/getting-started-with-drizzle-and-react
* https://www.trufflesuite.com/tutorial

## Prepare the local blockchain
Run the following commands:
* truffle develop --> starts local blockchain on port 9495 and opens console
* [in the console] compile --> compiles all contracts in /contracts and copies to /client/src/contracts
* [in the console] migrate --> runs the migrations defined in /migrations to write the contracts to the local blockchain

## Start the frontend app
Run the following commands:
* npm start --> starts a locally hosted app on port 3000 which can be viewed from any browser