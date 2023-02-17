import {BsFillArrowDownCircleFill, BsArrowUpCircleFill} from 'react-icons/bs';

function Length({title, adjustTime, type, time, formatTime}) {
  return (
    <div>
      <h3>{ title }</h3>
      <div>
        <button type="button" onClick={() => adjustTime(-60, type )}><BsFillArrowDownCircleFill /></button>
      </div>
      <h3>{formatTime(time)}</h3>
      <button type="button" onClick={() => adjustTime(60, type )}><BsArrowUpCircleFill /></button>
    </div>
  )
};

export default Length;