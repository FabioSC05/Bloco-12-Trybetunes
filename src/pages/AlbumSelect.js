import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../css/AlbumSelect.css';

class AlbumSelect extends React.Component {
  render() {
    const { music, save } = this.props;
    if (music.length === 0) {
      return <p>Nenhum álbum foi encontrado</p>;
    }
    return (
      <div>
        <p>{`Resultado de álbuns de: ${save}`}</p>
        <div className="album-container">
          {music.map((ele) => (
            <div key={ ele.collectionId } className="album-card">
              <Link
                to={ `/album/${ele.collectionId}` }
                data-testid={ `link-to-album-${ele.collectionId}` }
              >
                <img
                  src={ ele.artworkUrl100 }
                  alt={ ele.collectionName }
                />
              </Link>
              <p>{ ele.collectionName }</p>
              <p>{ ele.artistName }</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

AlbumSelect.propTypes = {
  music: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  ).isRequired,
  save: PropTypes.string.isRequired,
};

export default AlbumSelect;
