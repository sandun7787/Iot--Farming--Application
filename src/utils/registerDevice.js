import { getFirestoreDB } from "../../database/firebaseConfig";
import { collection, getDoc, setDoc, updateDoc, doc } from "firebase/firestore";

const db = getFirestoreDB();
const collectionRef = collection(db, "user-device");

// Adding devices into firestore
export default function addDevice(userId, deviceId, data, callback) {
  const documentRef = doc(collectionRef, userId);

  getDoc(documentRef)
    .then((docSnapshot) => {
      if (docSnapshot.exists()) {
        // Document already exists, add the new subcollection
        updateDoc(documentRef, { [deviceId]: data }, { merge: true })
          .then((docRef) => {
            const msg = "New device registered successfully";
            console.log(msg);
            callback(true, msg);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      } else {
        setDoc(documentRef, { [deviceId]: data }, { merge: true })
          .then((docRef) => {
            const msg = "New device registered successfully";
            console.log("Document written successfully");
            callback(true, msg);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      }
    })
    .catch((error) => {
      console.error("Error checking document existence: ", error);
    });
}
