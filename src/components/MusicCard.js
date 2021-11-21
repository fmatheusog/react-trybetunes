import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

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

  isFavorite = () => {
    const { isFavorite } = this.props;

    if (isFavorite === true) {
      this.setState({
        favorite: true,
      });
    }
  }

  render() {
    const { trackId, trackName, previewUrl, onClick } = this.props;
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
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            checked={ favorite }
            name={ trackId }
            id={ trackId }
            onChange={ this.onChange }
            onClick={ onClick }
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
  onClick: PropTypes.func.isRequired,
};

export default MusicCard;
