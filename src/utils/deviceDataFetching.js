import { collection, getDocs } from 'firebase/firestore';
import { getFirestoreDB } from '../../database/firebaseConfig';
import { format } from 'date-fns';

const db = getFirestoreDB();

export const fetchData = async (loggedUserId, setData) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'user-device'));
    const fetchedData = querySnapshot.docs
      .map((doc) => {
        const userData = doc.data();
        const userId = doc.id;
        const deviceIds = Object.keys(userData).filter(
          (key) => key !== 'userId'
        );

        return deviceIds.map((deviceId) => {
          const deviceData = userData[deviceId];
          const createdAt = deviceData.createdAt.toDate(); // Convert Firestore timestamp to a Date object
          const formattedCreatedAt = format(createdAt, 'yyyy-MM-dd HH:mm:ss'); // Format the date

          return {
            userId,
            deviceId,
            createdAt: formattedCreatedAt,
            ...deviceData,
          };
        });
      })
      .flat();

    const userDevices = fetchedData.filter(
      (deviceData) => deviceData.userId === loggedUserId
    );

    setData(userDevices);
  } catch (error) {
    console.error('Error fetching documents:', error);
  }
};
