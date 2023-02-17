import Length from "./components/LengthTime";
import { useState } from "react";

function App() {
  //initial state minutes multiply seconds = 1500 seconds
  const [displayTime, setDisplayTime] = useState( 25 * 60 );
  //initial break time session 300 seconds
  const [breakTime, setBreakTime] = useState( 5 * 60 );
  const [sessionTime, setSessionTime] = useState( 25 * 60 );

  //a function that format time seconds to minutes, so we can have a value of 25 minutes
  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    //return time with 00:00
    return (
      (minutes < 10 ? '0' + minutes : minutes) +
      ':' +
      (seconds < 10 ? '0' + seconds : seconds)
    );
  };

    //funtion that adjust time
    const adjustTime = (amount, type) => {
      if(type === 'break') {
        if(breakTime <= 60 && amount < 0) return;
        setBreakTime((prev) => prev + amount);
      } else {
        if(sessionTime <= 60 && amount < 0) return;
        setSessionTime((prev) => prev + amount);
        if(null) {
          setDisplayTime(sessionTime + amount);
        }
      };
    };

  return (
    <div className="App">
      <h1>Pamodoro Clock</h1>
      <div>
      <h1>{formatTime(displayTime)}</h1>
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
