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
                <button className="like-btn">♥️</button>
                <button className="del-btn" onClick={this.handleDelete}>Donate to GoodWill</button>
            </>
        );
    };

    toggleFrontandBack = () => {
        let newShowFront = !this.state.showFront
        this.setState({showFront: newShowFront})
    };

    handleDelete = (id) => {
        fetch(API/`${id}`, { 
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