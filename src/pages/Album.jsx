import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    name: '',
    artistAlbum: '',
    tracks: [],
  };

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const arrayApi = await getMusics(params.id);

    this.setState({
      name: arrayApi[0].artistName,
      artistAlbum: arrayApi[0].collectionName,
      tracks: arrayApi,
    });
  }

  render() {
    const { name, artistAlbum, tracks } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        Album
        <div>
          <h1 data-testid="artist-name">{ name }</h1>
          <h2 data-testid="album-name">{ artistAlbum }</h2>
        </div>
        <MusicCard musics={ tracks } />
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
