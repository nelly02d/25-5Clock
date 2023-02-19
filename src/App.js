import Length from "./components/LengthTime";
import './App.css' 
import {FiPlay, FiPause} from 'react-icons/fi';
import {BsAlarm} from 'react-icons/bs';
import {DiCodeigniter} from 'react-icons/di';
import {BiReset} from 'react-icons/bi';
import { useState, useRef } from "react";
import alarm from './components/alarm.mp3';
import { IconContext } from "react-icons";


function App() {
  //Initial state minutes multiply seconds = 1500 seconds
  const [displayTime, setDisplayTime] = useState( 25 * 60 );
  //Initial break time session 300 seconds
  const [breakTime, setBreakTime] = useState( 5 * 60 );
  const [sessionTime, setSessionTime] = useState( 25 * 60 );  
  //A state that control time
  const [start, setStart] = useState(false);
  const [pause, setPause] = useState(true);
  //A state the switch to break time when session time is finished
  const [onBreak, setOnBreak] = useState(false);

  //A state that setting audio to session and break time
  const [onBreakAudio, setOnBreakAudio] = useState(new Audio(alarm));
  //Get interval current data
  const intervalRef = useRef();

  //A function that format time seconds to minutes, so we can have a value of 25 minutes
  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    //Return time with 00:00
    return (
      (minutes < 10 ? '0' + minutes : minutes) +
      ':' +
      (seconds < 10 ? '0' + seconds : seconds)
    );
  };

  //Funtion that adjust time
  const adjustTime = (amount, type) => {
    if(type === 'break') {
      if(breakTime <= 60 && amount < 0) return;
      setBreakTime((val) => val + amount);
    } else {
      if(sessionTime <= 60 && amount < 0) return;
      setSessionTime((val) => val + amount);
      if(!start) {
        setDisplayTime(sessionTime + amount);
      };
    };
  };

  //funtion that handle switch between session time to break time
  const decreaseTime = () => setDisplayTime((val) => {
    let setBreak = onBreak;

    if(val <= 0 && !setBreak) {
      setBreak = true;
      setOnBreak(true);
      playBreakAudio();

      return breakTime;
    } else if(val === 0) {
      setBreak = false;
      setOnBreak(false);
      setOnBreakAudio(playBreakAudio());
      
      return sessionTime;
    }

    return val - 1
  });

  //Funtion that play alaram when both session and breaktime is finished
  const playBreakAudio = () => {
    onBreakAudio.currentTime = 4;
    onBreakAudio.play();
  }

  //Funtion start button
  const handleStart = () => {
    if(start) {
      intervalRef.current = setInterval(decreaseTime, 1000);
      return () => clearInterval(intervalRef.current);
    } else {
      setStart(handlePause());
    };
  };

  //handle pause button
  const handlePause = () => {
    if(!pause) {
      clearInterval(intervalRef.current)
    } else {
      intervalRef.current = setInterval(decreaseTime, 1000);
    };
    setPause(!pause);
  };

  //reset the time on default
  const resetTime = () => {
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
  }

  return (
    <div className="App">
      <IconContext.Provider value={{size:'1.5rem'}}>
      <div className="container">
        <h1 className="clock-title">Pamodoro Clock</h1>
        <div className="clock-container">
          <div className="clock">
            {/* Break Time */}
            <Length 
              title={'Break length'}
              adjustTime={adjustTime}
              type={'break'}
              time={breakTime}
              formatTime={formatTime}
            />
            <div>
              <div className="clock-main">
                <div className="time-title" >{onBreak ? (<h2><BsAlarm /> Break Time</h2>) : (<h2><DiCodeigniter /> Session Time</h2>)}</div>
                <h1 className="display-time">{formatTime(displayTime)}</h1>
              </div>
              <div className="control-btn">
                {/* Control time */}
                <button onClick={handleStart}>{pause ? <FiPlay /> : <FiPause />}</button>
                <button onClick={resetTime}><BiReset/></button>
              </div>
            </div>
            {/* Session Time */}
            <Length 
              title={'Session length'}
              adjustTime={adjustTime}
              type={'session'}
              time={sessionTime}
              formatTime={formatTime}
            />
          </div>
        </div> 
      </div>
      </IconContext.Provider>
    </div>
  );
}

export default App;
