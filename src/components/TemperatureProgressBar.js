'use client';
// import React from 'react';
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';

// const TemperatureProgressBar = ({ temperature }) => {
//   const percentage = Math.min(temperature, 100); // Limit the maximum value to 100

//   const calcColor = (percent, start, end) => {
//     let a = percent / 100,
//       b = (end - start) * a,
//       c = b + start;

//     return `hsl(${c}, 100%, 50%)`;
//   };

//   return (
//     <div style={{ width: '100px' }}>
//       <CircularProgressbar
//         value={percentage}
//         text={`${temperature}°C`}
//         circleRatio={0.7} /* Make the circle only 0.7 of the full diameter */
//         styles={buildStyles({
//           trail: {
//             strokeLinecap: 'butt',
//             transform: 'rotate(-126deg)',
//             transformOrigin: 'center center',
//           },
//           path: {
//             strokeLinecap: 'butt',
//             transform: 'rotate(-126deg)',
//             transformOrigin: 'center center',
//             stroke: calcColor(percentage, 0, 120),
//           },
//           text: {
//             fill: '#ddd',
//           },
//         })}
//         strokeWidth={10}
//       />
//     </div>
//   );
// };

// export default TemperatureProgressBar;




/************************************************************************************************************ */
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const TemperatureProgressBar = ({ temperature }) => {
  const percentage = Math.min(temperature, 2000); // Limit the maximum value to 100

  const getColor = (value) => {
    if (value < 400) {
      return 'green';
    } else if (value >= 400 && value <= 800) {
      return 'yellow';
    } else {
      return 'red';
    }
  };

  return (
    <div style={{ width: '100px' }}>
      <CircularProgressbar
        value={percentage}
        text={`${temperature}°C`}
        // circleRatio={0.7}
        styles={buildStyles({
          textSize: '16px',
          pathTransitionDuration: 0.5,
          textColor: '#333',
          pathColor: getColor(percentage),
          trailColor: '#d6d6d6',
        })}
      />
    </div>
  );
};

export default TemperatureProgressBar;


/************************************************************************************************************ */

// import { Card, CardContent, Typography, Box } from '@mui/material';

// const TemperatureProgressBar = ({ temperature }) => {
//   const bull = (
//     <Box
//       component="span"
//       sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//     ></Box>
//   );

//   return (
//     <Card
//       sx={{
//         minWidth: 100,
//         width: '100%',
//         background: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
//       }}
//     >
//       <CardContent>
//         <Typography
//           variant="h5"
//           component="div"
//           color="white"
//           display={'flex'}
//           justifyContent={'space-between'}
//           alignItems={'center'}
//         >
//           Temperature
//           <h3 style={{ color: 'white', fontSize: 40, padding: 25, margin: 10 }}>
//             {temperature ? temperature : 0} °C
//           </h3>
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default TemperatureProgressBar;
