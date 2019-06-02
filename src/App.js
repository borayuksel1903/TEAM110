import React, { Component } from 'react'
import './App.css'
//import axios from 'axios'

class App extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      response1: ""
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {

    fetch('http://127.0.0.1:5000/todo/api/v1.0/tasks/2')
        .then(res => {
          alert("Hello");
        })
        .catch(err=> {
          alert(err);
        })
  }
  render () {
    return (
        <div className='button__container'>
          <button className='button' onClick={this.handleClick}>
            Click Me
          </button>
          <p>THis is the response: {this.state.response1}</p>
          <p>{this.state.username}</p>
        </div>
    )
  }
}
export default App
