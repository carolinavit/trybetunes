import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      btnDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const enabled = (target.value.length > 1);
    this.setState({
      btnDisabled: !enabled,
    });
  }

  render() {
    const { btnDisabled } = this.state;
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
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ btnDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
