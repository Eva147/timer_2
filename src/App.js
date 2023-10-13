import React from 'react';
import { useEffect } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { useState } from 'react';
import './App.css';

const initialValue = 0;

export default function App() {

  const [mins, setMins] = useState(initialValue);
  const [secs, setSecs] = useState(initialValue);
  const [currentMins, setCurrentMins] = useState(initialValue);
  const [currentSecs, setCurrentSecs] = useState(initialValue);
  const [timerPaused, setTimerPaused] = useState(false);

  const onMinutesChange = (e) => {
    setCurrentMins(e.target.value);
  }

  const onSecondsChange = (e) => {
    setCurrentSecs(e.target.value);
  }

  const startTimer = () => {
    setMins(currentMins);
    setSecs(currentSecs);
    setCurrentMins(initialValue);
    setCurrentSecs(initialValue);
    setTimerPaused(false);
  }

  const stopTimer = () => {
    setTimerPaused(true);
    setMins(initialValue);
    setSecs(initialValue);
  }

  const pauseTimer = () => {
    setTimerPaused(timerPaused ? false : true);
  }

  useEffect(()=>{
    if(!timerPaused){
      let myInterval = setInterval(() => {
        if (secs > 0) {
            setSecs(secs - 1);
        }
        if (secs === 0) {
            if (mins === 0) {
                clearInterval(myInterval)
            } else {
                setMins(mins - 1);
                setSecs(59);
            }
        }
    }, 1000)
    return ()=> {
        clearInterval(myInterval);
      };
    }
  }, [mins, secs, timerPaused]);

  return (
    <ErrorBoundary>
      <div className='layout'>
        <div className='timeWrapper'>
          <div className='time'>
            <input type="number" min="0" max="59" value={currentMins} onChange={onMinutesChange} />
            <label>minutes</label>
          </div>

          <div className='time'>
            <input type="number" min="0" max="59" value={currentSecs} onChange={onSecondsChange} />
            <label>seconds</label>
          </div>
        </div>
        <div className='buttons'>
          <button onClick={startTimer}>Start</button>
          <button onClick={pauseTimer}>Pause/Resume</button>
          <button onClick={stopTimer}>Reset</button>
        </div>
        { mins === 0 && secs === 0
            ? <h1>{'00:00'}</h1>
            : <h1> {mins}:{secs < 10 ?  `0${secs}` : secs}</h1>
        }
    </div>
    </ErrorBoundary>
  );
}
