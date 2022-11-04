import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      btnDisabled: true,
      value: '',
      saveValue: '',
      arrayObjApi: [],
      albumNotFound: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const enabled = (event.target.value.length > 1);
    this.setState({
      btnDisabled: !enabled,
    });
    this.setState({
      value: event.target.value,
    });
  }

  clickSearch = async (e) => {
    e.preventDefault();
    const { value } = this.state;
    const resultApi = await searchAlbumsAPI(value);

    this.setState({
      saveValue: value,
      value: '',
      arrayObjApi: resultApi,
      albumNotFound: true,
    });
  };

  render() {
    const { btnDisabled, value, saveValue, arrayObjApi, albumNotFound } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        Search
        <form>
          <label htmlFor="search">
            <input
              type="search"
              data-testid="search-artist-input"
              id="search"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ btnDisabled }
            onClick={ this.clickSearch }
          >
            Pesquisar
          </button>
        </form>
        <div>
          { (arrayObjApi.length === 0 && albumNotFound === true)
          && <h2>`Nenhum álbum foi encontrado`</h2> }
        </div>
        <div>
          <h1>{`Resultado de álbuns de: ${saveValue}`}</h1>
          <div>
            { arrayObjApi.map(({ collectionId, collectionName }) => (
              <nav key={ collectionId }>
                <Link
                  data-testid={ `link-to-album-${collectionId}` }
                  to={ `/album/${collectionId}` }
                >
                  {' '}
                  { collectionName }
                </Link>
              </nav>
            )) }
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
