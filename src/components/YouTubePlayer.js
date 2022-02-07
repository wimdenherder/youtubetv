import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import classes from './styles/YouTubePlayer.css';

function YouTubePlayer({ id}) {
    const [player, setPlayer] = React.useState('not yet');
    const [currentTime, setCurrentTime] = React.useState(0);
    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        window.onYouTubeIframeAPIReady = loadVideo;
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    },[]);

    const loadVideo = async () => {
        console.log('loadVideo');
        const player = new window.YT.Player(`youtube-player-${id}`, {
                videoId: id,
                playerVars: { controls: 0 },
                events: {
                    onReady: onPlayerReady,
                    onStateChange: onStateChange
                },
        });
        console.log({player});
    };

    function onPlayerReady(event) {
        console.log('event.target',event.target);
        setPlayer(event.target);
        setInterval(() => {
            player.playVideo()}, 
            2000);
    }

    function onStateChange(event) {
        console.log('onStateChange', event);
        // event.target.playVideo();
    }

    return (
      <div className={classes.container}>
        <pre>{player && 'player'}</pre>
        <div id={`youtube-player-${id}`} className={classes.video} />
        <button onClick={() => player.playVideo()}>PLAY</button>
        {currentTime}
      </div>
    ); 
}

YouTubePlayer.propTypes = {
    id: PropTypes.string.isRequired,
}

export default YouTubePlayer;