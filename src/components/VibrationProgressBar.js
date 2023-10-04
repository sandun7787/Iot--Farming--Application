'use client';
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const VibrationProgressBar = ({ vibration }) => {
  const percentage = Math.min(vibration, 100);
   // Limit the maximum value to 100

  const getColor = (value) => {
    if (value < 1 ) {
      return 'green';
    } else if (value >= 1.02 && value <= 1.06) {
      return 'yellow';
    } else {
      return 'red';
    }
  };

  return (
    <div style={{ width: '100px' }}>
      <CircularProgressbar
        value={percentage}
        text={`${vibration}W/m2`}
        styles={buildStyles({
          textSize: '16px',
          pathTransitionDuration: 0.1,
          textColor: '#333',
          pathColor: getColor(percentage),
          trailColor: '#d6d6d6',
        })}
      />
    </div>
  );
};

export default VibrationProgressBar;
