
export class Component1 extends React.Component {
  constructor() {
    super();
    this.state = {
      gaspricesstate: 'not yet defined'
    }
  }


  async gaspriceComponent1() {
      //connect to rinkeby
      var provider = new ethers.providers.InfuraProvider("rinkeby")
      const gasprices = await provider.getGasPrice()
      this.setState(
        {
          gaspricesstate: gasprices.toString()
        }
      );
      };

  render() {
    
    return (
      <div>
        <button onClick={() => this.gaspriceComponent1()}> click here plz </button>
      <div> {this.state.gaspricesstate} </div> 
      </div>

    )
  }
}