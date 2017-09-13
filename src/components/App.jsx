import React from 'react';
import Header from './Header'
import Order from './Order'
import Fish from './Fish'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'


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
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
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
        />
        <Inventory
          addFish={this.addFish}
          loadSamples={this.loadSamples} />
      </div>
    )
  }
}

export default App;