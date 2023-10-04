import { Card, CardContent, Typography, Box } from '@mui/material';
import ProgressBar from 'react-progressbar-semicircle';

const VibCard = ({ vibration }) => {
  const getProgressColor = () => {
    if (vibration <= 40) {
      return '#02B732';
    } else if (vibration <= 80) {
      return 'yellow';
    } else {
      return 'red';
    }
  };

  return (
    <Card
      sx={{
        minWidth: 100,
        width: '100%',
        background:
          'linear-gradient( 109.6deg,  rgba(61,131,97,1) 11.2%, rgba(28,103,88,1) 91.1% )',
        '@media screen and (max-width: 375px)': {
          maxWidth: '100%',
          margin: '0 0',
        },
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          color="white"
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          sx={{
            '@media screen and (max-width: 376px)': {
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            },
          }}
        >
          Vibration
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
                percentage={vibration ? (vibration / 100) * 100 : 0}
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
                {vibration ? vibration : 0}W/m2
              </div>
            </div>
          </div>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VibCard;
