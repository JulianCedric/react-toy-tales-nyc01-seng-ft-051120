import React from 'react';
import './App.css';
import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './containers/ToyContainer'

const API = "http://localhost:3000/toys"

class App extends React.Component {
  state = {
    toys: [],
    display: false
  }

  componentDidMount() {
    fetch(API)
    .then(r => r.json())
    .then(toys => {
      this.setState({toys}, () => console.log(toys))
    })
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  addNewToy = (newToy) => {
    this.setState({toys: [...this.state.toys, newToy]}, () => console.log(this.state.toys))
  }

  deleteToy = (id) => {
    let newArr = this.state.toys.filter(toy => toy.id !== id)
    this.setState({toys: newArr}, () => console.log(newArr))
  }

  // 'addLike' is a method that takes in the id of the toy whose 'likes count' is being updated (i.e. increased by 1)
  // After a user clicks the like button, it invokes the 'handleLike' method (in ToyCard.js), which sends PATCH request to the specific object in the database
  // In the 'body: JSON.stringify()' part of the fetch, the database is instructed to replace the value of the object's likes key with the value specified (newLikes - from: let newLikes = this.props.likes + 1)
  // Then, the returned 'updatedToy' (object) is passed in as an argument of this 'addLike' method defined below (in App.js), whose job, ultimately, is to replace the current/previous array of 'toys' (in state) with the new, 'updatedToys' array 
  // Basically: 
    // While the 'handleLike' method answers "HOW is the value of the likes key being updated?" (increasing by one)..
    // .. the 'addLike' method answers "WHOSE likes key is being updated?" (via passing the toy's id as an argument)
  
  // addLike = (updatedToy) => {
  //   let newArr = this.state.toys.map(toy => toy.id === updatedToyId)
  //     this.setState({toys: newArr}, console.log(newArr))
  // }

  likeToy = (id, currentLikes) => {
    let newLikes = currentLikes + 1

    fetch(`http://localhost:3000/toys/${id}`, { 
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        // In 'body', we specify the change we want to make in the database
        // Here, it's to replace the current num of likes with 'newLikes'
        body: JSON.stringify({
            likes: newLikes 
        })
    })
    .then(r => r.json())
    // In the second '.then' below, we have the 'updateToyObject' and want to replace the current version of that object with 'updatedToyObject'
    // In order to do so, we need to map through the current toys array (in state) to find and then replace with 'updatedToyObject'
    // Lastly, we need to set state (.toys) to the 'updatedArray'
    .then(updatedToyObject => {
        let updatedToysArray = this.state.toys.map(toy => {
            // At this point, we've found the toy we're looking for (by matching id's).. 
            // Next, we need to replace that (current) toy with the 'updatedToyObject'.. 
            // Then, return that new/updated toys array.. 
            // And finally, set state (.toys) to updatedArray
                // The following conditional does the matching and basically says: 
                // If the id's match, then, as we're 'assembling' this new (mapped) array, put THAT object (updatedToyObject) in place of the original toy object, and
                // If they don't, then just place a copy of the original toy object into the new (again, mapped) array. 
            if (toy.id === id) {
                return updatedToyObject
            }
            return toy
        })})};

  addToyToFav = (toyObject) => {
    let newArray = this.state.toys.map(toy => toy.id === toyObject.id)
    console.log(newArray)
    this.setState({toys: newArray})
  };

  render(){
    return (
      <div>
      <Header />
        <div class="ui vertically divided grid">
          <div class="two column row">
            <div class="column">
              <ToyContainer toys={this.state.toys} deleteToy={this.deleteToy} handleClick={this.handleClick} likeToy={this.likeToy} addToyToFav={this.addToyToFav} />
            </div>
            <div class="column">
              {this.state.display
              ? <ToyForm addNewToy={this.addNewToy}/>
              : null}
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default App;