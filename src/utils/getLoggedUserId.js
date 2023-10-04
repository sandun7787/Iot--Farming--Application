import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, collection } from 'firebase/firestore';
import { getFirebaseAuth } from '../../database/firebaseConfig';

const auth = getFirebaseAuth();

export default function getLoggedUserId(callback) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is logged in
      const {email,uid,displayName,...others} = user
      console.log(displayName);
      console.log(others);

      callback(uid,email,displayName);
    } else {
      // User is logged out
      console.log('No user is logged in.');
    }
  });
}
