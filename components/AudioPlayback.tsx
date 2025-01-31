"use client"
import { Pause, Play } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import AudioAnalyser from './AudioAnalyzer';

export default function AudioPlayback(props:{url: string}){
  const [playing, setPlaying] = useState(false);
  const [blob, setBlob] = useState<Blob | null>(null);

  const audio = useRef(new Audio());

  useEffect(()=>{
    fetch(props.url)
    .then(response => response.blob())
    .then(blob => {
        setBlob(blob);
        const blobUrl = URL.createObjectURL(blob);
        audio.current.src = blobUrl;
    })
  },[])

  const togglePlayback = () => {
    if (playing) {
      audio.current.pause();
    } else {
      audio.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <>
    <button onClick={togglePlayback}>
      {playing ? <Pause /> : <Play />}
    </button>
    <AudioAnalyser audioBlob={blob} />
    </>
  );
};