import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import "./LoadedPlayer.css";
import { Button } from "@mui/material";

export default function LoadedPlayer({ ...props }) {
  const [firstTime, setFirstTime] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0);
  const [ready, setReady] = useState(false);
  const ref = useRef(null);
  const refMenu = useRef(null);
  let menuTimeout = null;

  useEffect(() => {
    const canPlay = ReactPlayer.canPlay(
      "https://www.youtube.com/watch?v=" + props.id
    );
    console.log({ canPlay });
  }, []);
  useEffect(() => {
    setPlaying(true);
    if (!firstTime) showAll();
  }, [props.play]);

  function onPlay() {
    if (firstTime) {
      console.log("firstTime");
      setPlaying(false);
      setFirstTime(false);
      setVolume(1);
      props.onReady();
    }
  }
  function onEnded() {
    console.log("onEnded " + props.id);
    hideAll();
    props.onEnded();
  }
  function showAll() {
    ref.current.className = "visible";
  }
  function hideAll() {
    ref.current.className = "hidden";
  }
  function nextVideo() {
    setPlaying(false);
    onEnded();
  }
  function handleMouseMove(ev) {
    console.log("handleMouseMove");
    showMenu();
    clearTimeout(menuTimeout);
    menuTimeout = setTimeout(() => {
      hideMenu();
    }, 300);
  }
  function showMenu() {
    refMenu.current.className = "menuVisible";
  }
  function hideMenu() {
    refMenu.current.className = "menuHidden";
  }
  return (
    <div
      id="loadedPlayer"
      className="hidden"
      ref={ref}
      onMouseMove={(ev) => handleMouseMove(ev)}
    >
      <div className="menuVisible" ref={refMenu}>
        <Button onClick={nextVideo}>Next</Button>
      </div>
      <ReactPlayer
        width="100vw"
        height="100vh"
        url={"https://www.youtube.com/watch?v=" + props.id}
        playing={playing}
        onPlay={onPlay}
        volume={volume}
        onEnded={onEnded}
        onError={(e) => console.log("error", e)}
        config={{
          youtube: {
            playerVars: {
              controls: 1,
              start: props.start,
              end: props.end,
              origin: "http://localhost:3000",
            },
          },
        }}
      />
    </div>
  );
}
