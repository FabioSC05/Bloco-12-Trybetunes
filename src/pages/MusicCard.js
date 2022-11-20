import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import '../css/MusicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    this.setState({
      loading: false,
    });
  }

  render() {
    const { data, load, saveMusic, saveFavorite } = this.props;
    const { loading } = this.state;
    if (load || loading) {
      return <Loading />;
    }
    return (
      <div>
        {data.filter((ele) => ele.trackName)
          .map((music, index) => (
            <div key={ music.trackId } className="music-track">
              <p>{ music.trackName }</p>
              <audio data-testid="audio-component" src={ music.previewUrl } controls>
                <track kind="captions" />
                <code>audio</code>
              </audio>
              <label
                htmlFor={ music.trackIdValue }
              >
                Favorita
                <input
                  type="checkbox"
                  data-testid={ `checkbox-music-${music.trackId}` }
                  onChange={ saveMusic }
                  checked={ saveFavorite(music.trackId) }
                  value={ index }
                />
              </label>
            </div>
          ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  ).isRequired,
  load: PropTypes.bool.isRequired,
  saveMusic: PropTypes.func.isRequired,
  saveFavorite: PropTypes.func.isRequired,
};

export default MusicCard;
