import { React, Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import * as favoriteApi from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favoriteSongs: [],
    };

    this.fetchFavoriteSongs = this.fetchFavoriteSongs.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
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

  fetchFavoriteSongs = async () => {
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
    const { loading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? <Loading /> : favoriteSongs
          .map((music) => (
            <MusicCard
              key={ music.trackId }
              song={ music }
              trackId={ Number(music.trackId) }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              isFavorite={ favoriteSongs.includes(music) }
              onClick={ () => this.onClick(music) }
            />
          )) }
      </div>
    );
  }
}

export default Favorites;
