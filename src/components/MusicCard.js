import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import * as favoriteApi from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favorite: false,
    };

    this.onChange = this.onChange.bind(this);
    this.isFavorite = this.isFavorite.bind(this);
  }

  componentDidMount() {
    this.isFavorite();
  }

  onChange = (ev) => {
    this.setState({
      favorite: ev.target.checked,
    });
  }

  onClick = async (song) => {
    const { favorite } = this.state;

    this.setState({
      loading: true,
    });

    if (favorite === true) {
      await favoriteApi.removeSong(song);

      this.setState({
        favorite: false,
        loading: false,
      });
    } else {
      await favoriteApi.addSong(song);
      this.setState({
        favorite: true,
        loading: false,
      });
    }
  }

  isFavorite = () => {
    const { isFavorite } = this.props;

    if (isFavorite === true) {
      this.setState({
        favorite: true,
      });
    }
  }

  render() {
    const { trackId, trackName, previewUrl, song } = this.props;
    const { loading, favorite } = this.state;

    return loading ? <Loading /> : (
      <div>
        <span>{ trackName }</span>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId }>
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            checked={ favorite }
            name={ trackId }
            id={ trackId }
            onChange={ this.onChange }
            onClick={ () => this.onClick(song) }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default MusicCard;
