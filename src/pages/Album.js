import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../css/Album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorites: [],
      musics: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    this.setState({
      favorites: await getFavoriteSongs(),
      musics: result,
    });
  }

  saveFavorite = (track) => {
    const { favorites } = this.state;
    const result = favorites.find((ele) => ele.trackId === track);
    const type = typeof result === 'object';
    return type;
  };

  saveMusic = ({ target }) => {
    const { musics } = this.state;
    const info = musics.find((_ele, ind) => `${ind - 1}` === `${target.value}`);
    this.setState({ loading: true }, async () => {
      if (target.checked) {
        await addSong(info);
      } else {
        await removeSong(info);
      }
      this.setState({
        loading: false,
        favorites: await getFavoriteSongs(),
      });
    });
  };

  render() {
    const { musics, loading } = this.state;
    if (musics.length === 0) {
      return <Loading />;
    }
    return (
      <div data-testid="page-album">
        <Header />
        <div className="album-order">
          <p data-testid="album-name" className="ab-name">{ musics[0].collectionName }</p>
          <p data-testid="artist-name" className="ab-artist">{ musics[0].artistName }</p>
          <MusicCard
            data={ musics }
            load={ loading }
            saveMusic={ this.saveMusic }
            saveFavorite={ this.saveFavorite }
          />
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired }).isRequired }).isRequired,
};

export default Album;
