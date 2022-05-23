import { useState, useEffect } from "react";
import LoadedPlayer from "./LoadedPlayer";
import "./TikTokPlayer.css";

export default function TikTokPlayer({
  play: shouldPlay,
  onReady,
  start,
  end,
  id,
  onEnded,
}) {
  const [play, setPlay] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  useEffect(() => {
    console.log("play", play);
    console.log("playerReady", playerReady);
    if (shouldPlay === true && playerReady === true) {
      setPlay(true);
    }
  }, [shouldPlay, playerReady]);
  function startVideo() {
    setPlay(true);
  }
  function playerIsReady() {
    onReady();
    setPlayerReady(true);
  }
  return (
    <>
      <LoadedPlayer
        play={play}
        start={start}
        end={end}
        id={id}
        onReady={() => playerIsReady()}
        onEnded={() => (onEnded ? onEnded() : "")}
      />
    </>
  );
}
