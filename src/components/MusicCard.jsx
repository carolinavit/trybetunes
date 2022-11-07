import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { musics } = this.props;
    return (
      <div>
        { musics.map((track) => {
          const { trackName, trackId, previewUrl } = track;
          if (previewUrl) {
            return (
              <div key={ trackId }>
                <h3>{ trackName }</h3>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                  <code>audio</code>
                </audio>
              </div>
            );
          }
          return '';
        })}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf(PropTypes.shape({
    trackName: PropTypes.string,
    trackId: PropTypes.number,
    previewUrl: PropTypes.string,
  })).isRequired,
};

export default MusicCard;
