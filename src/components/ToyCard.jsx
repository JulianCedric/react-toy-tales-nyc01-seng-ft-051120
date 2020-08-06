import React, { Component } from 'react';

const API = "http://localhost:3000/toys"

class ToyCard extends Component {
    state = {
        showFront: true
    }

    handleFavClick = () => {
        this.props.addToyToFav(this.props.toy)
    }

    renderFront = () => {
        return (
            <>
                <h2>{this.props.name}</h2>
                <img src={this.props.image} className="toy-avatar" />
                <p>Likes: {this.props.likes}</p>
                <button onClick={this.handleFavClick} class="ui tiny button">Add to Favorites</button>    
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

    // While the 'handleLike' method answers "HOW is the value of the likes key being updated?" (increasing by one)..
    // .. the 'addLike' method answers "WHOSE likes key is being updated?" (via passing the toy's id as an argument)
    // handleLike = () => {
    //     let newLikes = this.props.likes + 1
    //     console.log(newLikes)

    //     fetch(`http://localhost:3000/toys/${this.props.id}`, { 
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json"
    //         },
    //         body: JSON.stringify({likes: newLikes })
    //     })
    //     .then(r => r.json())
    //     .then(updatedToy => {
    //         this.props.addLike(updatedToy.id)
    //     });
    // };

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