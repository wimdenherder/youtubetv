import { findDOMNode } from 'react-dom'
import { toast } from 'react-toastify';
import ReactPlayer from 'react-player';
import { useState } from 'react';

export default function FullScreenPlayer() {
    const [fullscreenMode, setFullscreenMode] = useState(true)
    const [player, setPlayer] = useState(null)
    const ref = p => setPlayer(p)
    
    const onStart = () => {
        if (fullscreenMode) {
            setTimeout(
                quitFullscreen,
                1000);
            findDOMNode(player).requestFullscreen().catch(
                (err) => 
                {
                    toast.error("Could not activate full-screen mode :(");
                    console.log("Could not activate full-screen mode :(", err);
                }
            );
            
        }
    }

    function quitFullscreen() {
        console.log('quiting full screen')
        findDOMNode(player).exitFullscreen().catch(
            (err) => 
            {
                toast.error("Could not exit full-screen mode :(");
                console.log("Could not exit full-screen mode :(", err);
            }
        );
    }

    const onEnded = () => {
        setFullscreenMode(document.fullscreenElement !== null);
    }

    return (
        <><button onClick={() => quitFullscreen()}>Quit</button><br/>
            <ReactPlayer
            ref={ref}
            url="https://www.youtube.com/watch?v=GoCASqOnyJ4" 
            onStart={onStart}
            onEnded={onEnded} />
        </>);
}