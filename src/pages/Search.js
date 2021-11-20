import { React, Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      albums: [],
      loading: false,
      searchInput: '',
      artistResult: '',
      noResult: false,
      searchButtonDisabled: true,
    };

    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.validateSearchInput = this.validateSearchInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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

  handleSearch = async (ev) => {
    ev.preventDefault();
    this.setState({
      loading: true,
    });

    const { searchInput } = this.state;
    const result = await searchAlbumsAPI(searchInput);

    if (result.length === 0) {
      this.setState({
        loading: false,
        noResult: true,
        searchInput: '',
      });
    } else {
      const artistName = searchInput;

      this.setState({
        albums: result,
        loading: false,
        artistResult: `Resultado de álbuns de: ${artistName}`,
        searchInput: '',
      });
    }
  }

  render() {
    const {
      albums,
      loading,
      searchInput,
      searchButtonDisabled,
      artistResult,
      noResult,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : (
          <div>
            <form>
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
                onClick={ this.handleSearch }
              >
                Pesquisar
              </button>
            </form>

            <div>
              { noResult ? 'Nenhum álbum foi encontrado' : null }
              { artistResult }
              { albums.map((album) => (
                <div key={ album.collectionId }>
                  <Link
                    data-testid={ `link-to-album-${album.collectionId}` }
                    to={ `/album/${album.collectionId}` }
                  >
                    { album.collectionName }
                  </Link>
                </div>
              )) }
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Search;
