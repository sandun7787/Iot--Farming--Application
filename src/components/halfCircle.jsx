import React from 'react';

import ProgressBar from 'react-progressbar-semicircle';

export default function HalfCircle({ temperature }) {
  const getProgressColor = () => {
    if (temperature <= 40) {
      return '#02B732';
    } else if (temperature <= 80) {
      return 'yellow';
    } else {
      return 'red';
    }
  };
  return (
    <div>
      <div
        style={{
          width: '100%',
          height: '100px',
          paddingTop: '10px',
          position: 'relative',
        }}
      >
        <ProgressBar
          percentage={temperature ? (temperature / 100) * 100 : 0}
          strokeWidth={12}
          diameter={170}
          showPercentage={false}
          stroke={getProgressColor()}
          strokeLinecap="round"
          backgroundColor="rgba(255,255,255,0.3)"
        />

        <div
          style={{
            position: 'absolute',
            top: '80%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '24px',
            zIndex: 1,
            '@media screen and (max-width: 375px)': {
              fontSize: '16px',
            },
          }}
        >
          {temperature ? temperature : 0} °C
        </div>
      </div>
    </div>
  );
}
