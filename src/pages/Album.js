import { React, Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      collectionName: '',
      musics: [],
    };

    this.fetchMusics = this.fetchMusics.bind(this);
  }

  componentDidMount() {
    this.fetchMusics();
  }

  async fetchMusics() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    const { artistName, collectionName } = musics[0];

    this.setState({
      artistName,
      collectionName,
      musics,
    });
  }

  render() {
    const { artistName, collectionName, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <h1 data-testid="artist-name">{ artistName }</h1>
          <h2 data-testid="album-name">{ collectionName }</h2>
        </section>

        { musics
          .filter((music) => music.wrapperType !== 'collection'
            && music.previewUrl !== undefined)
          .map((music) => (
            <MusicCard
              key={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
            />
          )) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.exact({
    isExact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default Album;
