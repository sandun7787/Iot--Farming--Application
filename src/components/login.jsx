'use client';

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { Google } from '@mui/icons-material';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFirebaseAuth } from '../../database/firebaseConfig';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const notify = (msg) => {
    msg;
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email address';
    }
    if (!password) {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const auth = getFirebaseAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log('Logged in :', user);

      router.push('/dashboard');

      setEmail('');
      setPassword('');
      setErrors({});
    } catch (error) {
      notify(
        toast.error(`😕 Invalid email or password`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      );
      console.log('Error signing in:', error);
    }
  };

  const handleGoogleLogin = async () => {
    const auth = getFirebaseAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        console.log('Logged in with Google:', user);
        router.push('/dashboard');
      }
      // Handle further actions after successful login
    } catch (error) {
      console.log('Error signing in with Google:', error);
    }
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',

        '@media (max-width: 600px)': {
          flexDirection: 'column',
          width: '100%',
        },
        '@media (max-width: 1000px)': {
          flexDirection: 'column',
          width: '80%',
        },
        '@media (max-width: 200px)': {
          flexDirection: 'column',
          width: '100%',
        },
      }}
    >
      <Grid container>
        <ToastContainer />
        <Grid item xs={12} sm={6}>
          <CardMedia
            component="img"
            src="/login.jpg"
            alt="Image"
            className="card-image"
            sx={{
              display: 'block',
              maxWidth: '100%',
              height: '100%',
              '@media (max-width: 600px)': {
                display: 'none',
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardContent sx={{ padding: 2, marginTop: 2, marginBottom: 10 }}>
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: '30px',
                marginBottom: '20px',
              }}
            >
              Login
            </Typography>

            <TextField
              id="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ marginBottom: '20px', width: '100%' }}
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              error={!!errors.password}
              helperText={errors.password}
              sx={{ marginBottom: '20px', width: '100%' }}
            />
            <Button
              onClick={handleLogin}
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: '100%' }}
            >
              Login
            </Button>
            <Typography
              sx={{
                marginTop: '10px',
                textAlign: 'center',
                fontSize: '12px',
                color: 'gray',
              }}
            >
              Login with
            </Typography>
            <Typography
              variant="body2"
              sx={{ marginTop: '10px', textAlign: 'center' }}
            >
              <Button
                onClick={handleGoogleLogin}
                variant="contained"
                sx={{
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                  },
                }}
              >
                <Google
                  sx={{
                    color: '#0466C8',
                  }}
                />
              </Button>
            </Typography>

            <Typography
              variant="body2"
              sx={{ marginTop: '10px', textAlign: 'center' }}
            >
              Don't have an account?{' '}
              <Link href="/signup" color="inherit">
                Sign Up
              </Link>
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}
