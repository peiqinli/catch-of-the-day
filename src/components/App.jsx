import React from 'react';
import Header from './Header'
import Order from './Order'
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
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header
            tagline="Fresh Seafood Market"
          ></Header>
        </div>
        <Order></Order>
        <Inventory
          addFish={this.addFish}
          loadSamples={this.loadSamples} />
      </div>
    )
  }
}

export default App;