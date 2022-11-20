import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';
import '../css/Favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      favorites: [],
    };
  }

  async componentDidMount() {
    const result = await getFavoriteSongs();
    this.setState({
      favorites: result,
      loading: false,
    });
  }

  saveFavorite = (track) => {
    const { favorites } = this.state;
    const result = favorites.find((ele) => ele.trackId === track);
    const type = typeof result === 'object';
    return type;
  };

  saveMusic = ({ target }) => {
    const { favorites } = this.state;
    const info = favorites.find((_ele, ind) => `${ind}` === `${target.value}`);
    this.setState({ loading: true }, async () => {
      await removeSong(info);
      this.setState({
        loading: false,
        favorites: await getFavoriteSongs(),
      });
    });
  };

  render() {
    const { loading, favorites } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="favorites-container">
          <MusicCard
            data={ favorites }
            load={ loading }
            saveMusic={ this.saveMusic }
            saveFavorite={ this.saveFavorite }
          />
        </div>
      </div>
    );
  }
}

export default Favorites;
