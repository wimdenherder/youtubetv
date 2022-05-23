import "./App.css";
import { useState, useEffect } from "react";
import ZapPlayer from "./components/ZapPlayer";
import ReactPlayer from "react-player";
import program from "./assets/program.json";
import { useSearchParams } from "react-router-dom";

function App() {
  return (
    <>
      <ZapPlayer startIndex={0} program={program} />
    </>
  );
}

export default App;
