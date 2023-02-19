import {BsFillArrowDownCircleFill, BsArrowUpCircleFill} from 'react-icons/bs';

function Length({title, adjustTime, type, time, formatTime}) {
  return (
    <div className='length'>
      <h3>{ title }</h3>
      <div className='length-ctrl'>
        <button className='length-btn' type="btn" onClick={() => adjustTime(-60, type )}><BsFillArrowDownCircleFill /></button> 
        <h3>{formatTime(time)}</h3>
        <button className='length-btn' type="btn" onClick={() => adjustTime(60, type )}><BsArrowUpCircleFill /></button>
      </div>
    </div>
  )
};

export default Length;