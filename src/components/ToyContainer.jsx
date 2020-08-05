import React from 'react';
import ToyCard from './ToyCard'

class ToyContainer extends React.Component {
  state = {
    search: ""
  }

  filterBy = () => {
    return this.props.toys.filter(toy => toy.name.toLowerCase().includes(this.state.search.toLowerCase()))
  }

  handleSearch = e => {
    this.setState({search: e.target.value})
  }

  render() {
    let searchedToys = this.filterBy()
    return(
      <div id="toy-collection"> 
       <div className="buttonContainer">
          <div class="ui center aligned segment">
          <div class="ui category search">
          <div class="ui left icon input">
          <i class="search icon"></i>
          <input name="search" value={this.state.search} class="prompt" placeholder="Search For a Toy" onChange={this.handleSearch}></input>
          </div></div>
          <div class="ui horizontal divider">or</div>
          <button className="ui button" onClick={this.props.handleClick}>Add a New Toy</button>
        </div>
        </div>
        {searchedToys.map(toy => <ToyCard key={toy.id} {...toy} deleteToy={this.props.deleteToy} likeToy={this.props.likeToy} addToyToFav={this.props.addToyToFav} />)}
      </div>
    );
  };
};

export default ToyContainer; 