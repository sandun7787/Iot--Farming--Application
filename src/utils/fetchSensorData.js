import { getRealtimeDB } from "../../database/firebaseConfig";
import { ref, onValue } from "firebase/database";

const db = getRealtimeDB();
const databaseRef = ref(db);

// Listening & fetching all the sensor data from the real-time database
export default function fetchAllData(callback) {
  // prettier-ignore
  onValue(databaseRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        callback(data);
        // console.log(data);
      } else {
        console.log("No data available");
        callback(null);
      }
    },
    (error) => {
      // Handle errors
      console.error("Error listening to data changes:", error);
    }
  );
}
