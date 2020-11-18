import React, { Component } from "react";
import SearchForm from "./SearchForm";
import ResultList from "./ResultList";
import API from "../utils/API";

class SearchResultContainer extends Component {
  state = {
    search: "",
    results: []
  };

  // When this component mounts, search the Giphy API for pictures of kittens
  componentDidMount() {
    this.searchGiphy();
  }

  searchGiphy = () => {
    API.search()
      .then(res => this.setState({ results: res.data.results }))
      .then(data => {
        console.log(this.state.results);
      }) 
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    const filteredEmployees = this.state.results.filter(employee => employee.name.first.includes(value));
    this.setState({
      [name]: value,
      results: filteredEmployees
    });
  };

  // When the form is submitted, search the Giphy API for `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchGiphy(this.state.search);
  };

  handleButtonPush = event => {
    console.log("hit")
    let type = event.target.name;
    const sortedArray = this.state.results.sort (
      function (a, b) {
        const firstNameA = a.name.first.toLowerCase();
        const firstNameB = b.name.first.toLowerCase();

        if (firstNameA > firstNameB) {
          return 1
        } else if (firstNameA < firstNameB) {
          return -1
        } else { return 0 }
      }
    )
    this.setState({
      results: sortedArray
    })
  }

  render() {
    return (
      <div>
        <SearchForm
          search={this.state.search}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
        />
        <ResultList results={this.state.results}
        handleButtonPush={this.handleButtonPush}
         />
      </div>
    );
  }
}

export default SearchResultContainer;
