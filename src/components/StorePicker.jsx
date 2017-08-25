import React from "react";
// import { render } from 'react-dom';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // constructor() {
    // super();
    // this inside the () indicates storePicker
    // this.goToStore = this.goToStore.bind(this)
  // }
  goToStore(event){
    event.preventDefault();
    // grab the test from the box
    this.context.router.transitionTo(`/store/${this.storeInput.value}`)
    // second we are going to transition from / to /store/:storeId

  }
  render() {

    return (
      // e indicates storePicker
      // another way is this.goToStore.bind(this)
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder="Store Name"
          defaultValue={getFunName()}
          ref={(input) => { this.storeInput = input}}
        />
          {
            // ref means $("input"), DOM element
          }
        <button type="submit">Visit Store -></button>
      </form>
    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}
export default StorePicker;