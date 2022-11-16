import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    name: '',
    artistAlbum: '',
    tracks: [],
    loading: false,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true });
    const arrayApi = await getMusics(id);
    console.log(arrayApi);

    this.setState({
      name: arrayApi[0].artistName,
      artistAlbum: arrayApi[0].collectionName,
      tracks: arrayApi,
      loading: false,
    });
  }

  render() {
    const { name, artistAlbum, tracks, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading /> : null}
        Album
        <h1 data-testid="artist-name">{ name }</h1>
        <h2 data-testid="album-name">{ artistAlbum }</h2>
        <ul>
          {tracks.slice(1).map((track, index) => (
            <MusicCard
              key={ index }
              trackName={ track.trackName }
              previewUrl={ track.previewUrl }
              trackId={ track.trackId }
            />
          ))}
        </ul>

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
