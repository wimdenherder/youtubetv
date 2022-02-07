import './App.css';
import { useState, useEffect } from 'react';
import ZapPlayer from './components/ZapPlayer';
import ReactPlayer from 'react-player';
import program from './assets/program.json';
import { useSearchParams } from 'react-router-dom';

function App() {
  const bufferSize = 5;
  let [searchParams, setSearchParams] = useSearchParams();
  const random = searchParams.get('startIndex') || Math.floor(Math.random() * (program.length - bufferSize));
  const selectionVideos = program.slice(random,random+bufferSize);
  console.log('random', random);
  useEffect(() => {
    // setSearchParams({ startIndex: random });
  },[])
  
  return (
    <>
     <ZapPlayer startIndex={random} program={selectionVideos}/>
    </>
  );
}

export default App;
