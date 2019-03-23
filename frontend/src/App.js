import React, { Component } from 'react';
import './App.css';


class App extends Component {

  // State of the form
  state = {
    name: '',
    birth_date: '',
    forms: null  // I dediced to make this null to make it easier to see it should be empty
  }


  // This method was to make sure that the state can handle
  // text fields
  handleTextChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  // This will handle the form changing
  // In order to get "files", we need to get the Input value's files
  // If you only have one file (instead of multiple attribute), then it will only be in the 0 index
  handleFilesChange = (e) => {
      this.setState({
        forms: e.target.files
      })
  }


  // When we submit, we want to go through each of the keys of state
  // We want to add them to the formData (basically a big JSON formatter for us built in)
  // We will take the key name in state and match it to the value for everything that isn't a form
  // If it is a form, we want to then iterate and add each file into the array to get passed
  handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData()
    for(let key in this.state){
      if(key === 'forms'){
        for(let form of this.state.forms){
            data.append('forms[]', form)
        }
      } else {
        data.append(key, this.state[key])
      }
    }


    // We make a standard POST request to the route
    // We don't need to JSON.stringify because it will take care of it for us
    // If you open this in the browser, when you submit you will see the result
    // from the backend
    fetch('http://localhost:3000/children', {
      method: "POST",
      body: data
    })
    .then(res => res.json())
    .then(console.log)
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleTextChange} type='text' name='name' />
          <input onChange={this.handleTextChange} type='text' name='birth_date'/>
          <input name="forms" type="file" multiple onChange={this.handleFilesChange} />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default App;
