import React, { Component } from "react";
import SearchForm from "./SearchForm";
import ResultList from "./ResultList";
import API from "../utils/API";

class SearchResultContainer extends Component {
  state = {
    employees: [],
    search: "",
    results: [],
    sortRule: ""
  };


  // When this component mounts, search the Giphy API for pictures of kittens
  componentDidMount() {
    this.searchGiphy();
  }

  searchGiphy = query => {
    API.search(query)
      .then(res => {
        this.setState({ employees: res.data.results })
        this.setState({ results: res.data.results })
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    this.setState({
      search: event.target.value
    });

    if (event.target.value === "" || event.target.value === undefined){
      this.setState({ results: this.state.employees });
    } else if (event.target.value.indexOf(" ") < 0){
      this.setState({ results: this.state.employees.filter(employee => {
        return ((employee.name.first.toLowerCase().startsWith(event.target.value.toLowerCase())) || (employee.name.last.toLowerCase().startsWith(event.target.value.toLowerCase())))
      })
    });
    } else {
      this.setState({ results: this.state.employees.filter(employee => {
        return ((employee.name.first + " " + employee.name.last).toLowerCase().startsWith(event.target.value.toLowerCase()));
      })})
    }
  };

  handleFormSubmit = event => {
    event.preventDefault();
  }

  handleButtonPush = event => {
    let type = event.target.name;
    this.setState({
      sortRule: type
    });

  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h1>Employee Directory</h1>
          <h5>click on category names to sort, or use the search bar to narrow your results.</h5>
        </div>
        <SearchForm
          search={this.state.search}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
        />
        <ResultList results={this.state.results} handleButtonPush={this.handleButtonPush}/>
      </div>
    );
  }
}

export default SearchResultContainer;