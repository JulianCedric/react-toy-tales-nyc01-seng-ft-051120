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
            image: "",
            likes: 0
          });
        });
  };

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.handleSubmit}>
          <h3>Create a Toy!</h3>
          <div class="ui big form"></div>
          <div class="two fields"></div>
          <div class="field">
          <input class="ui input" placeholder="Enter a Toy's Name.. " type="text" name="name" value={this.state.name} onChange={this.handleChange}></input>
          </div>
          <div class="field">
          <input class="ui input" placeholder="Enter a Toy's Image URL.. " type="text" name="image" value={this.state.image} onChange={this.handleChange}></input>
          </div><br></br>
          <button class="ui mini submit button" type="submit">Create New Toy</button>
        </form>
      </div>
    );
  }

}

export default ToyForm;

// <div class="ui mini form">
//   <div class="two fields">
//     <div class="field">
//       <label>First Name</label>
//       <input placeholder="First Name" type="text">
//     </div>
//     <div class="field">
//       <label>Last Name</label>
//       <input placeholder="Last Name" type="text">
//     </div>
//   </div>
//   <div class="ui submit button">Submit</div>
// </div>