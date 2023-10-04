'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { firestore } from '../../database/firebaseConfig';

export default function UserProfile() {
  //   const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // const { userId } = router.query;

    const fetchUser = async () => {
      try {
        const userRef = firestore.collection('users').doc(userId);
        const userData = await userRef.get();
        if (userData.exists) {
          setUser(userData.data());
        } else {
          // User not found, handle accordingly (e.g., show an error message or redirect)
        }
      } catch (error) {
        // Error fetching user details, handle accordingly
      }
    };

    
  }, []);

  if (!user) {
    // Render loading state or handle user not found
    return <div>Loading...</div>;
  }

  // Render the user profile with the fetched user details
  return (
    <div>
      <h1>User Profile: {user.displayName}</h1>
      {/* Render other user details */}
    </div>
  );
}
