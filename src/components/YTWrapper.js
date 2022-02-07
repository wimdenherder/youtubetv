
import YouTube from 'react-youtube';
import { useRef } from 'react';
import './YTWrapper.css'

export default function YTWrapper({ ...props }) {
    const ref = useRef(null);
    function show() {
        ref.current.className = 'visible';
    }
    function hide() {
      ref.current.className = 'hidden';
    }
    function hideOnEnd() {
      hide();
    }
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
          start: props.start,
          end: props.end,
          controls: 0,
          modestbranding: 1
        }
      };
    return (<>
       <div className="hidden" ref={ref}>
         <YouTube 
           videoId={props.videoId} 
           opts={opts} 
           onPlay={show} 
           onEnd={hideOnEnd}/>
      </div>
    </>);
}


