import logo from './monopoly.png';
import './App.css';
import React, { Component } from 'react';
import Evidence from './components/Evidence/Evidence';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import MyMap from './Map.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      bounties: [], formTextMission: '', formTextAmount: '', formTextLat: '38.8814', formTextLong: '-77.1098'};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  

  render() {
    return (
      <div className="App">
          <h1>Welcome, Bounty Hunter</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <h3>CHOOSE. YOUR. BOUNTY:</h3>


          <Router>
            <div>
              {/* render list */}
              <ul>
                {this.state.bounties.map(bounty => (
                  <li>
                      <Link className="App-link" to="/evidence">{bounty.mission} ${bounty.amount}</Link>
                  </li>
                ))}
              </ul>

              {/* route paths */}
              <Route path="/evidence">
                <Evidence />
              </Route>

            </div>
          </Router>

          {/* render map */}
          <MyMap bounties={this.state.bounties}/>

          
          {/* form input */}
          <form onSubmit={this.handleSubmit}>
            <input
              name="formTextMission"
              onChange={this.handleInputChange}
              value={this.state.formTextMission}
            />
            <input
              type="number"
              name="formTextAmount"
              onChange={this.handleInputChange}
              value={this.state.formTextAmount}
            />
            <input
              type="number"
              name="formTextLat"
              onChange={this.handleInputChange}
              value={this.state.formTextLat}
            />
            <input
              type="number"
              name="formTextLong"
              onChange={this.handleInputChange}
              value={this.state.formTextLong}
            />
            <button>
              Add Bounty
            </button>
          </form>


      </div>
    );
  }


  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    //edge case handling
    e.preventDefault();
    if (this.state.formTextMission.length === 0 || this.state.formTextAmount.length === 0) {
      return;
    }

    //construct new props here
    const bounty = {
      mission: this.state.formTextMission,
      amount: this.state.formTextAmount,
      lat: Number(this.state.formTextLat),
      long: Number(this.state.formTextLong),
      evidence: ''
    };

    //insert new bounty, clear form text
    this.setState(state => ({
      bounties: state.bounties.concat(bounty),
      formTextMission: '',
      formTextAmount: ''
    }));
  }

}


export default App;


