'use client';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, collection, setDoc } from 'firebase/firestore';
import { getFirebaseAuth } from '../../database/firebaseConfig';
import { Google } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email address';
    } else {
      try {
        const response = await axios.get(
          `https://api.zerobounce.net/v2/validate?api_key=02bdbfe4652744af9a27c28a16c6162d&email=${email}`
        );
        const { status } = response.data;

        if (status === 'valid') {
          // Email is valid
        } else if (status === 'invalid') {
          errors.email = 'Invalid email address';
        } else if (status === 'catch-all') {
          errors.email = 'Email address is a catch-all';
        } else if (status === 'unknown') {
          errors.email = 'Email address status is unknown';
        }
      } catch (error) {
        console.log('Error validating email:', error);
      }
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const db = getFirestore();
      await setDoc(doc(collection(db, 'users'), user.uid), {
        name: name,
        email: email,
        password: password,
      });

      console.log('User created:', user);
      router.push('/dashboard');

      setName('');
      setEmail('');
      setPassword('');
      setErrors({});
    } catch (error) {
      console.log('Error signing up:', error);
    }
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(
        `https://api.email-validator.net/api/verify?EmailAddress=${email}&APIKey=02bdbfe4652744af9a27c28a16c6162d`
      );
      const data = response.data;
      return data.status === 'valid';
    } catch (error) {
      console.log('Error checking email:', error);
      return false;
    }
  };

  const handleSignUpWithGoogle = async () => {
    try {
      const auth = getFirebaseAuth();
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;

      console.log('User signed up with Google:', user);
      router.push('/dashboard');

      if (credential) {
        const googleIdToken = credential.idToken;
        const googleAccessToken = credential.accessToken;
      }
    } catch (error) {
      console.log('Error signing up with Google:', error);
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
        <Grid item xs={12} sm={6}>
          <CardMedia
            component="img"
            src="/signIn.jpg"
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
          <CardContent sx={{ padding: 2, marginTop: 2, marginBottom: 5 }}>
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: '30px',
              }}
            >
              Get Started
            </Typography>
            <Typography
              sx={{
                marginBottom: '50px',
                textAlign: 'center',
                fontSize: '12px',
                color: 'gray',
              }}
            >
              Register a new user
            </Typography>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              value={name}
              onChange={handleNameChange}
              error={!!errors.name}
              helperText={errors.name}
              sx={{ marginBottom: '20px', width: '100%' }}
            />
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
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: '100%' }}
            >
              Sign Up
            </Button>
            <Typography
              sx={{
                marginTop: '10px',
                textAlign: 'center',
                fontSize: '12px',
                color: 'gray',
              }}
            >
              Sign up with
            </Typography>
            <Typography
              variant="body2"
              sx={{ marginTop: '10px', textAlign: 'center' }}
            >
              <Button
                onClick={handleSignUpWithGoogle}
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
              Already have an account?{' '}
              <Link href="#" color="inherit">
                Sign in
              </Link>
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}
