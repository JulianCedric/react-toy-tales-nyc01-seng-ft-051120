import React, { Component } from 'react';

class ToyCard extends Component {
    state = {
        showFront: true
    }

    renderFront = () => {
        return (
            <h2>{this.props.name}</h2>
            <img src={this.props.image} className="toy-avatar" />
            <p>Likes: {this.props.likes}</p>    
        );
    };

    renderBack = () => {
        return (
            <button className="like-btn">♥️</button>
            <button className="del-btn">Donate to GoodWill</button>
        );
    };

    toggleFrontandBack = () => {
        let newShowFront = !this.state.showFront
        this.setState({showFront: newShowFront})
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

dog = {
    "id": 1,
    "name": "Happy Slay",
    "img": "https://www.sciencenews.org/sites/default/files/2018/08/main/articles/082918_lh_crispr-beagles_feat_REV.jpg",
    "breed": "Beagle"
}

{...dog}