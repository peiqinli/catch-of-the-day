import React from 'react';
import Header from './Header'
import Order from './Order'
import Fish from './Fish'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import base from '../base'

class App extends React.Component {
  constructor(){
    // once we call super, we can call (this) indicated App
    super()
    // get initial state
    this.state = {
      fishes: {},
      order: {}
    }

    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
  }
  // lifecycle hookup for syncing data from remote database or localstorage
  componentWillMount(){
    // thsi runs right before the app is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
      {
        context: this,
        state: "fishes"
      }
    )

    // check if there is any order in localstorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`)
    if (localStorageRef){

      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }
  }

  componentWillUnmount(){
    base.removeBinding(this.ref)
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order))
  }


  addFish(fish) {
    // update state
    // ... means take every item from object and spread into new object
    const fishes = {...this.state.fishes}
    // add new fish
    const timestamp = Date.now()
    fishes[`fish-${timestamp}`] = fish;
    // set state
    this.setState({ fishes })
  }

  removeFish(key) {
    const fishes = {...this.state.fishes}
    fishes[key] = null
    this.setState({fishes})
  }

  updateFish(key, updatedFish){
    const fishes = {...this.state.fishes}
    fishes[key] = updatedFish
    this.setState({fishes})
  }

  loadSamples(){
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder(key){
    // copy of our state
    const order = {...this.state.order}
    // update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1
    // update state
    this.setState({order: order})
  }

  removeFromOrder(key) {
    const order={...this.state.order}
    delete order[key]
    this.setState({ order })
  }
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header
            tagline="Fresh Seafood Market"
          ></Header>
          <ul className="list-of-fished">
            {
              Object.keys(this.state.fishes)
              .map(key => <Fish key={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}

                index={key}
                />)
            }
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
          fishes={this.state.fishes}
          loadSamples={this.loadSamples} />
      </div>
    )
  }
}

export default App;