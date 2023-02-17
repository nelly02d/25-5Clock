import Length from "./components/LengthTime";
import {FiPlay, FiPause} from 'react-icons/fi';
import {BsAlarm} from 'react-icons/bs';
import {DiCodeigniter} from 'react-icons/di';
import { useState, useRef } from "react";
import alarm from './components/alarm.mp3';

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
      playBreakAudio();
      
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

  return (
    <div className="App">
      <h1>Pamodoro Clock</h1>
      <div>
        <h2>{onBreak ? (<div><BsAlarm/> Break Time</div>) : (<div><DiCodeigniter/> Session Time</div>)}</h2>
        <h1>{formatTime(displayTime)}</h1>
        {/* Control time */}
        <button type="button" onClick={handleStart}>{pause ? <FiPlay /> : <FiPause/>}</button>
        {/* Break Time */}
        <Length 
          title={'Break length'}
          adjustTime={adjustTime}
          type={'break'}
          time={breakTime}
          formatTime={formatTime}
          />
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
  );
}

export default App;
