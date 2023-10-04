import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import getLoggedUserId from "./getLoggedUserId";
import { getDisplayName } from "next/dist/shared/lib/utils";

const firestore = getFirestore();

// Get a reference to the document
const getLoggedUsername = (callback) => {
  getLoggedUserId((userId,) => {
    const docRef = doc(collection(firestore, "users",), userId);

    // Get the document
    getDoc(docRef)
      .then((doc) => {
        if (doc.exists()) {
          // Access the email and name fields
          const name = doc.data().name;
          //   const email = doc.data().email;

          console.log(12,name)

          callback(name,);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  });
};

export default getLoggedUsername;
