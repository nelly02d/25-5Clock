import { useState } from "react";

function App() {
  //initial state minutes multiply seconds = 1500 seconds
  const [displayTime, setDisplayTime] = useState( 25 * 60 );

  //a function that format time seconds to minutes, so we can have a value of 25 minutes
  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    return (
      (minutes < 10 ? '0' + minutes : minutes) +
      ':' +
      (seconds < 10 ? '0' + seconds : seconds)
    );
  };

  return (
    <div className="App">
      <div>
        <h1>Pamodoro Clock</h1>
      </div>
      <h1>{formatTime(displayTime)}</h1>

    </div>
  );
}

export default App;
