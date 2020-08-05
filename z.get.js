import React from 'react';
import './App.css';
import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

const API = "http://localhost:3000/toys"

class App extends React.Component {
  state = {
    toys: [],
    display: false,
    search: ''
  }

  componentDidMount() {
    fetch(API)
    .then(r => r.json())
    .then(toys => {
      this.setState({toys}, () => console.log(toys))
    })
  }
  
  render(){
    return (
      <div>
        <Header />
          {this.state.display
          ? <ToyForm addNewToy={this.addNewToy}/>
          : null}
        <div className="buttonContainer">
          <div class="ui center aligned segment">
          <div class="ui category search">
          <div class="ui left icon input">
          <i class="search icon"></i>
          <input name="search" value={this.state.search} class="prompt" placeholder="Search For a Toy" onChange={this.handleSearch}></input>
          </div></div>
          <div class="ui horizontal divider">or</div>
          <button className="ui button" onClick={this.handleClick}>Add a Toy</button>
        </div>
        </div>
        <ToyContainer toys={this.state.toys} deleteToy={this.deleteToy} addLike={this.addLike} filterBy={this.filterBy} handleSearch={this.handleSearch}/>
      </div>
    );
  };
};

export default App;