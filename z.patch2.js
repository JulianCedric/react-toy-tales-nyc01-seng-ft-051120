import React, { Component } from 'react';

const API = "http://localhost:3000/toys"

class ToyCard extends Component {
    state = {
        showFront: true
    }

    renderFront = () => {
        return (
            <>
                <h2>{this.props.name}</h2>
                <img src={this.props.image} className="toy-avatar" />
                <p>Likes: {this.props.likes}</p>    
            </>
        );
    };

    renderBack = () => {
        return (
            <>
                <br></br>
                <button className="like-btn" onClick={() => this.props.likeToy(this.props.id, this.props.likes)}>♥️</button>
                <button className="del-btn" onClick={this.handleDelete}>Donate to GoodWill</button>
            </>
        );
    };

    toggleFrontandBack = () => {
        let newShowFront = !this.state.showFront
        this.setState({showFront: newShowFront})
    };

    handleDelete = () => {
        fetch(API/`${this.props.id}`, { 
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
        .then(toy => {
            this.props.deleteToy(this.props.id)
        });
    };



    render() {
        return (
            <div className="card" onClick={this.toggleFrontandBack}>
               {this.state.showFront
               ? this.renderFront()
               : this.renderBack()}
            </div>
        );
    };
};

export default ToyCard;

    // While the 'handleLike' method answers "HOW is the value of the likes key being updated?" (increasing by one)..
    // .. the 'addLike' method answers "WHOSE likes key is being updated?" (via passing the toy's id as an argument)

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
    .then(updatedToyObject => 
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
        }));

                
            }
        })    
    );

};