import React, { Component } from 'react';

const API = "http://localhost:3000/toys"

class ToyForm extends Component {
  state = {
    name: '',
    image: ''
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault()
    fetch(API, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        image: this.state.image
      })
    })
      .then(r => r.json())
      .then(newToy => {
          this.props.addNewToy(newToy)
          this.setState({
            name: "",
            image: ""
          });
        });
  };

  render() {
    return (
      <div className="ui container">
        <form className="add-toy-form" onSubmit={this.handleSubmit}>
          <h3>Create a Toy!</h3>
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
