import { React, Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      searchButtonDisabled: true,
    };

    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.validateSearchInput = this.validateSearchInput.bind(this);
  }

  handleSearchInputChange = (ev) => {
    this.setState({
      searchInput: ev.target.value,
    }, () => this.validateSearchInput());
  }

  validateSearchInput = () => {
    const { searchInput } = this.state;
    const inputMinLen = 2;

    if (searchInput.length >= inputMinLen) {
      this.setState({
        searchButtonDisabled: false,
      });
    } else {
      this.setState({
        searchButtonDisabled: true,
      });
    }
  }

  render() {
    const { searchInput, searchButtonDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <input
          data-testid="search-artist-input"
          id="searchInput"
          type="text"
          placeholder="Nome da banda ou artista"
          onChange={ this.handleSearchInputChange }
          value={ searchInput }
        />
        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={ searchButtonDisabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
