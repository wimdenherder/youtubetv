import React, { useState, useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'
import './LoadedPlayer.css'
import { findDOMNode } from 'react-dom'
import { toast } from 'react-toastify'

export default function LoadedPlayer({...props}) {
  const [firstTime,setFirstTime] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0);
  const [player, setPlayer] = useState(null);
  const refContainer = useRef(null);
  const refPlayer = p => setPlayer(p);
  const [fullscreenMode, setFullscreenMode] = useState(true);

  useEffect(() => {
    setPlaying(true);
    if(!firstTime) {
      show();
      onStart();
    }
  }, [props.play]);

  function onPlay() {
    if(firstTime) {
      setPlaying(false);
      setFirstTime(false);
      setVolume(1);
      props.onReady();
    }
  }
  function onEnded() {
    console.log('onEnded ' + props.id);
    setFullscreenMode(document.fullscreenElement !== null);
    hide();
    props.onEnded();
    // quitFullscreen();
  }
  function show() {
    refContainer.current.className = 'visible';
  }
  function hide() {
    refContainer.current.className = 'hidden';
  }

  const onStart = () => {
    if (fullscreenMode) {
        console.log(findDOMNode(player))
        findDOMNode(player).requestFullscreen().catch(
            (err) => 
            {
                toast.error("Could not activate full-screen mode :(");
                console.log("Could not activate full-screen mode :(", err);
            }
        );
    }
  }

  const quitFullscreen = () => {
    document.exitFullscreen().catch(
        (err) => 
        {
            toast.error("Could not exit full-screen mode :(");
            console.log("Could not exit full-screen mode :(", err);
        }
    );
  }

  return (
      <div className="hidden" ref={refContainer}>
        <ReactPlayer
          ref={refPlayer}
          url={"https://www.youtube.com/watch?v=" + props.id}
          playing={playing}
          onPlay={onPlay}
          volume={volume}
          onEnded={onEnded}
          config={{
            youtube: {
              playerVars: { 
                controls: 0,
                start: props.start,
                end: props.end
              }
            }
          }}
        />
      </div>
  );
}