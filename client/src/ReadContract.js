import React from "react";

class ReadContract extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        'randomState': "",
        "supply": "",
        "address": ""

        }
  }

// This happens after the component output has been rendered to the DOM
  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    console.log(drizzle);
    console.log(drizzleState);
    console.log(drizzle.contracts.PenroseToken.address)


      const contract = drizzle.contracts.PenroseToken;
      // let drizzle know we want to watch the `getSupply` method
      const dataKey = contract.methods.getSupply().call().then( supply => {
        console.log(supply);
        this.setState({ supply });
        this.setState({'randomState': "ThisIsRandom"})
        });

      const address = contract.address;
      this.setState( { address });

              // save the `dataKey` to local component state for later reference
          console.log(this)
      }



  render() {
    return(
         // get the contract state from drizzleState
//         const { PenroseToken } = this.props.drizzleState.contracts;
    //     const address = this.state.address;
         // using the saved `dataKey`, get the variable we're interested in
    //     const myString = PenroseToken.testString[this.state.dataKey];

         // if it exists, then we display its value
         <div>
                 <h1>Welcome to Penrose Lotto!</h1>
                 <h2>Details about the game: </h2>
                 <p>Contract address is: {this.state.address} </p>
                 <p>Total supply of Penrose Tokens is: {this.state.supply} </p>
         </div>

    )
  }
}

export default ReadContract;