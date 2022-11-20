import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumSelect from './AlbumSelect';
import Loading from './Loading';
import '../css/Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      saveName: '',
      disable: true,
      loading: false,
      object: [],
      render: false,
    };
  }

  enableButton = ({ target }) => {
    const { value } = target;
    const num2 = 2;
    const result = value.length >= num2;
    this.setState({
      name: value,
      disable: !result,
    });
  };

  clickButton = async () => {
    const { name } = this.state;
    this.setState({ loading: true, render: false, saveName: name }, async () => {
      this.setState({
        object: await searchAlbumsAPI(name),
        name: '',
        loading: false,
        render: true,
      });
    });
  };

  render() {
    const { name, disable, loading, render, object, saveName } = this.state;
    return (
      <div data-testid="page-search" className="search-container">
        <Header />
        <form className="search-form">
          <input
            type="text"
            value={ name }
            onChange={ this.enableButton }
            placeholder="Digite o nome do álbum"
            data-testid="search-artist-input"
            className="search-input"
          />
          <button
            type="button"
            disabled={ disable }
            onClick={ this.clickButton }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
        { loading ? <Loading /> : '' }
        { render ? <AlbumSelect music={ object } save={ saveName } /> : ''}
      </div>
    );
  }
}

export default Search;
