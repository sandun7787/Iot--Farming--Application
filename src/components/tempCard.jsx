import { Card, CardContent, Typography, Box } from '@mui/material';

import HalfCircle from './halfCircle';

const TempCard = ({ temperature }) => {
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    ></Box>
  );

  return (
    <Card
      sx={{
        minWidth: 100,
        width: '100%',
        background: 'linear-gradient(to right, #3498db, #2c3e50 )',
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
          Temperature
          <HalfCircle temperature={temperature} />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TempCard;
