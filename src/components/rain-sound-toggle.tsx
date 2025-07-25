"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";

const RainSoundToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(
        "https://www.soundjay.com/nature/sounds/rain-07.mp3"
      );
      audioRef.current.loop = true;
    }
  }, []);

  const toggleSound = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => console.error("Audio play failed:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleSound} aria-label="Toggle rain sound">
      {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
    </Button>
  );
};

export default RainSoundToggle;
