import { useState, useEffect } from 'react';
import './App.css';

const Countdown = () => {
  const [goal, setGoal] = useState('Eat That Frog Until..');
  const [starttime, setStarttime] = useState(new Date());
  const [endtime, setEndtime] = useState('');
  const [currenttime, setCurrenttime] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrenttime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  let timeremaining = 0;
  let totaltime = 0;
  let progressWidth = 0;

  if (endtime) {
    timeremaining = new Date(endtime).getTime() - currenttime.getTime();
    totaltime = new Date(endtime).getTime() - starttime.getTime();
    progressWidth = (timeremaining / totaltime) * 100;
  }

  const secondsRemaining = Math.max(Math.floor(timeremaining / 1000), 0);
  const days = Math.floor(secondsRemaining / (3600 * 24));
  const hours = Math.floor((secondsRemaining % (3600 * 24)) / 3600);
  const minutes = Math.floor((secondsRemaining % 3600) / 60);
  const seconds = secondsRemaining % 60;

  const handleGoalChange = (e) => {
    setGoal(e.target.value);
  };

  const handleDateChange = (e) => {
    const inputdatetime = e.target.value;
    const newendtime = new Date(inputdatetime);
    setEndtime(newendtime);
    setStarttime(new Date());
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
    <div className='container'>
      <button onClick={toggleEditMode} className='editButton'>
        {isEditing ? (
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#5f6368">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"
              className='svgsave'
            />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
            <path
              d="M240-120q-45 0-89-22t-71-58q26 0 53-20.5t27-59.5q0-50 35-85t85-35q50 0 85 35t35 85q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T320-280q0-17-11.5-28.5T280-320q-17 0-28.5 11.5T240-280q0 23-5.5 42T220-202q5 2 10 2h10Zm230-160L360-470l358-358q11-11 27.5-11.5T774-828l54 54q12 12 12 28t-12 28L470-360Zm-190 80Z"
              className='svgedit'
            />
          </svg>
        )}
      </button>

      {isEditing ? (
        <>
          <input type="text" value={goal} onChange={handleGoalChange} placeholder='goalname goes here' className='inputGoalname' />
          <br />
          <input type="datetime-local" onChange={handleDateChange} className='inputGoaldate' />
          <p className='enddate'>{endtime ? new Date(endtime).toLocaleString() : ''}</p>
          <span className='span'>current timer:</span>
        </>
      ) : (
        <div>
          <h2 className='goalName'>{goal}</h2>
          <div className='timeLeft'>
            <span className='hourglass'>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="20px">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z" />
              </svg>
            </span>
            {days}d {hours}h {minutes}m {seconds}s
          </div>
          <div className='progressbarback'>
            <div className='progressBar' style={{ width: `${Math.max(progressWidth, 0)}%`, transition: 'width 1s linear' }} />
          </div>
          <div className='customdiv'>"relax! eveything's going to fall into place"</div>
        </div>
      )}
      
    </div>
    <a className='author' href='https://github.com/barelysomethin/time-until'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>barelysomethin</a>
    </>
  );
};

export default Countdown;