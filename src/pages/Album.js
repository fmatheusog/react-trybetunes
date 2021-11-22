import { React, Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import * as favoriteApi from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      collectionName: '',
      loading: false,
      songs: [],
      favoriteSongs: [],
    };

    this.fetchSongs = this.fetchSongs.bind(this);
    this.fetchFavoriteSongs = this.fetchFavoriteSongs.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.fetchSongs();
    this.fetchFavoriteSongs();
  }

  onClick = async (song) => {
    const { favoriteSongs } = this.state;

    this.setState({
      loading: true,
    });

    const favorite = favoriteSongs.some((s) => s.trackId === song.trackId);

    if (favorite === true) {
      await favoriteApi.removeSong(song);

      this.setState({
        loading: false,
      }, () => this.fetchFavoriteSongs());
    } else {
      await favoriteApi.addSong(song);

      this.setState({
        loading: false,
      }, () => this.fetchFavoriteSongs());
    }
  }

  async fetchSongs() {
    const { match: { params: { id } } } = this.props;
    const songs = await getMusics(id);
    const { artistName, collectionName } = songs[0];

    this.setState({
      artistName,
      collectionName,
      songs,
    });
  }

  async fetchFavoriteSongs() {
    this.setState({
      loading: true,
    });

    const favoriteSongs = await favoriteApi.getFavoriteSongs();

    this.setState({
      loading: false,
      favoriteSongs,
    });
  }

  render() {
    const { artistName, collectionName, loading, songs, favoriteSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <h1 data-testid="artist-name">{ artistName }</h1>
          <h2 data-testid="album-name">{ collectionName }</h2>
        </section>

        { loading ? <Loading /> : songs
          .filter((music) => music.wrapperType !== 'collection'
            && music.previewUrl !== undefined)
          .map((music) => (
            <MusicCard
              key={ music.trackId }
              song={ music }
              trackId={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              isFavorite={ favoriteSongs
                .some((favSong) => favSong.trackId === music.trackId) }
              onClick={ () => this.onClick(music) }
            />)) }
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
