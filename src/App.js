import React, { useState, useRef } from "react";
import { FaPlayCircle, FaPauseCircle, FaSquare } from "react-icons/fa";
import "./App.css";

function padTime(time) {
  return time.toString().padStart(2, "0");
}

export default function App() {
  const [title, setTitle] = useState("Start your timer");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  function startTimer() {
    if (intervalRef.current !== null) return;

    setTitle("Keep going !!!");
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) return timeLeft - 1;
        resetTimer();
        return 0;
      });
    }, 1000);
  }

  function pauseTimer() {
    if (intervalRef.current === null) return;

    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle("You stopped your timer :(");
    setIsRunning(false);
  }

  function resetTimer() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle("Another round? :)");
    setTimeLeft(25 * 60);
    setIsRunning(false);
  }
  const minutes = padTime(Math.floor(timeLeft / 60));

  const seconds = padTime(timeLeft - minutes * 60);
  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && (
          <button onClick={startTimer}>
            <FaPlayCircle />
          </button>
        )}
        {isRunning && (
          <button onClick={pauseTimer}>
            <FaPauseCircle />
          </button>
        )}
        <button onClick={resetTimer}>
          <FaSquare />
        </button>
      </div>
    </div>
  );
}
