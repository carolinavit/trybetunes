import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    checked: false,
    loading: false,
  };

  componentDidMount() {
    const { trackId } = this.props;
    this.setState({ loading: true }, () => {
      getFavoriteSongs().then((result) => this.setState({
        checked: result.some((fav) => fav.trackId === trackId),
        loading: false,
      }));
    });
  }

  favoriteSong = (trackId, callback, checked) => {
    this.setState({ loading: true }, () => {
      callback(trackId).then(() => this.setState({
        checked,
        loading: false,
      }));
    });
  };

  addAndRemoveSong = ({ target }) => {
    const { trackId, trackName } = this.props;
    const favSongObj = {
      name: trackName,
      trackId,
    };
    return (target.checked ? this.favoriteSong(favSongObj, addSong, true)
      : this.favoriteSong(favSongObj, removeSong, false));
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;
    return (
      <div>
        <h3>{ trackName }</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            onChange={ this.addAndRemoveSong }
            checked={ checked }
          />
        </label>
        {loading ? <Loading /> : null}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  previewUrl: PropTypes.string.isRequired,
};

export default MusicCard;
