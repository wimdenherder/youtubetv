import { useState, useEffect } from 'react';
import LoadedPlayer from './LoadedPlayer';
import './TikTokPlayer.css';


export default function TikTokPlayer({...props}) {
  const [play, setPlay] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  useEffect(() => {
    console.log('props.play',props.play);
    console.log('playerReady',playerReady);
    if(props.play === true && playerReady === true) {
      setPlay(true);
    }
  },[props.play, playerReady])
  function startVideo() {
    setPlay(true);
  }
  function playerIsReady() {
    props.onReady();
    setPlayerReady(true);
  }
  return (
      <><LoadedPlayer 
        play={play} 
        start={props.start} 
        end={props.end}
        id={props.id}
        onReady={() => playerIsReady()}
        onEnded={() => props.onEnded ? props.onEnded() : ''}
        /> 
        </>
  );
}
