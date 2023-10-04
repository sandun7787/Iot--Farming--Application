import { useEffect } from "react";
import { getFirebaseAuth } from "../../database/firebaseConfig";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      const auth = getFirebaseAuth();
      // Check if the user is logged in
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) {
          // User is not logged in, redirect to login page
          router.push("/login"); // Replace '/login' with the actual URL of your login page
        }
      });

      return () => unsubscribe();
    }, []);

    // Render the target component if the user is logged in
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
