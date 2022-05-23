import TikTokPlayer from "./TikTokPlayer";
import { useState, useEffect } from "react";
import { LinearProgress } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Button from "@mui/material/Button";
import "./ZapPlayer.css";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

export default function ZapPlayer({ program }) {
  const startArray = new Array(program.length).fill(false);
  const [readyVideoList, setReadyVideoList] = useState(startArray);
  const [playVideoList, setPlayVideoList] = useState(startArray);
  const [allVideosReady, setAllVideosReady] = useState(false);
  const [finished, setFinished] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (
      readyVideoList.length === program.length &&
      readyVideoList.reduce((a, b) => a && b, true)
    )
      setAllVideosReady(true);
  }, [readyVideoList]);

  function onReady(index) {
    const newState = [...readyVideoList];
    newState[index] = true;
    setReadyVideoList(newState);
  }
  function setPlayVideo(index) {
    if (index >= playVideoList.length) {
      return setFinished(true);
    }
    setIndex(index);
    const newState = [...playVideoList];
    newState[index] = true;
    setPlayVideoList(newState);
  }
  return (
    <div className={allVideosReady ? "zapPlayer" : "loading"}>
      <>
        {program.map((video, index) => {
          return (
            <TikTokPlayer
              key={index}
              id={video.id}
              start={video.start}
              end={video.end}
              play={playVideoList[index]}
              onReady={() => onReady(index)}
              onEnded={() => setPlayVideo(index + 1)}
            />
          );
        })}
      </>
      {!allVideosReady ? (
        <>
          <div>
            <LinearProgress
              variant="determinate"
              value={
                (100 * (readyVideoList || []).filter((x) => x).length) /
                readyVideoList.length
              }
            />
          </div>
          <div className="parentCenteredChild absolutely">
            Buffering video's
            <br />
            <br />
          </div>
        </>
      ) : (
        !playVideoList.reduce((a, b) => a || b, false) && (
          <div className="parentCenteredChild">
            <PlayArrowIcon
              className="playButton"
              onClick={() => setPlayVideo(0)}
            />
          </div>
        )
      )}
      {finished && (
        <div className="parentCenteredChild">
          <p>
            Thank you for watching!
            <br />
            Refresh for new video's.
            <br />
            <br />
            {/* Wanna watch this series again?<br/>
          <a href={'http://localhost:3000/?startIndex=' + index}>Watch again the series again</a><br/>
          <a href={'http://localhost:3000/?startIndex=' + (index+5)}>Watch the next series again</a><br/> */}
          </p>
        </div>
      )}
    </div>
  );
}
