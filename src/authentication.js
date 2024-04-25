import { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore, storage } from "./Firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  const getUserId = () => {
    return userId;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchProfileData(user.uid);
        setUserId(user.uid);
      }
    });

    return unsubscribe;
  }, []);

  const fetchProfileData = async (userId) => {
    try {
      const userDoc = await firestore.collection("users").doc(userId).get();
      console.log(userDoc.data())
      if (userDoc.exists) {
        const userData = userDoc.data();
        return userData;
      } else {
        console.error("User document does not exist.");
      }
    } catch (error) {
      console.error("Error fetching user profile data:", error);
    }
  };

  const login = async (email, password, rememberMe) => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      setUserId(user.uid);
      if (rememberMe) {
        localStorage.setItem("isAuthenticated", "true");
        // You can store additional user data here if needed
      }
      setIsAuthenticated(true);
    } catch (error) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        alert("Incorrect password. Please try again.");
      } else {
        console.error("Error logging in:", error.code);
      }
    }
  };

  const updateUserProfile = (userId, userData) => {
    return new Promise((resolve, reject) => {
      try {
        firestore
          .collection("users")
          .doc(userId)
          .update(userData)
          .then(() => {
            console.log("User profile updated successfully!");
            resolve();
          })
          .catch((error) => {
            console.error("Error updating user profile:", error);
            reject(error);
          });
      } catch (error) {
        console.error("Error updating user profile:", error);
        reject(error);
      }
    });
  };

  const logout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("isAuthenticated");
      setIsAuthenticated(false);
      setUserId(""); // Clear userId state on logout
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const register = async (
    email,
    password,
    confirmPassword,
    firstName,
    lastname,
    isOrganzier = false
  ) => {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await firestore
        .collection("users")
        .doc(user.uid)
        .set({
          email: user.email,
          password: password,
          name: `${firstName} ${lastname}`,
          bio: "",
          role: isOrganzier ? "organizer" : "user"
        });

      setUserId(user.uid);
  };

  const addEventSiteToFirestore = async (eventSiteData) => {
    try {
      const docRef = await firestore.collection("eventSites").add({
        ...eventSiteData,
        owner: userId,
      });

      const docId = docRef.id;

      return docId;
    } catch (error) {
      throw error;
    }
  };

  const uploadImageToStorage = async (file, eventLocation) => {
    try {
      // Create a reference to the Firebase Storage bucket
      const storageRef = storage.ref();

      // Generate a unique ID for the image
      const imageName = Date.now().toString();
      const locationName = eventLocation + Date.now().toString();

      // Upload the image file to Firebase Storage
      const imageRef = storageRef.child(
        `images/${userId}/${locationName}/${imageName}`
      );
      await imageRef.put(file);

      // Get the download URL of the uploaded image
      const imageURL = await imageRef.getDownloadURL();

      console.log("Image uploaded to Firebase Storage successfully:", imageURL);
      return imageURL;
    } catch (error) {
      console.error("Error uploading image to Firebase Storage:", error);
      throw error;
    }
  };

  const fetchAllEventSites = async () => {
    try {
      const eventSitesRef = firestore.collection("eventSites");
      const snapshot = await eventSitesRef.get();

      const eventSitesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return eventSitesData;
    } catch (error) {
      throw error;
    }
  };

  const fetchUserEventSites = async () => {
    try {
      const querySnapshot = await firestore
        .collection("eventSites")
        .where("owner", "==", userId)
        .get();
      const userEventSites = [];
      querySnapshot.forEach((doc) => {
        userEventSites.push({ id: doc.id, ...doc.data() });
      });
      return userEventSites;
    } catch (error) {
      throw error;
    }
  };

  const fetchEventDetails = async (eventId) => {
    try {
      const eventRef = firestore.collection("eventSites").doc(eventId);
      const eventDoc = await eventRef.get();
      if (eventDoc.exists) {
        return eventDoc.data();
      } else {
        throw new Error("venue not found");
      }
    } catch (error) {
      throw new Error("Error fetching venue details: " + error.message);
    }
  };

  const fetchConfirmedBookings = async (id, eventIds) => {
    try {
      const bookingsRef = firestore.collection("bookings");
      if (eventIds.length != 0) {
        const snapshot = await bookingsRef
          .where("eventId", "in", eventIds)
          .where("isPaid", "==", true)
          .get();
        const confirmedBookingsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return confirmedBookingsData;
      }
    } catch (error) {
      // console.error("Error fetching confirmed bookings:", error);
      throw error;
    }
  };

  const getUserDisplayName = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = firestore.collection("users").doc(user.uid);
        const userDoc = await userRef.get();
        if (userDoc.exists) {
          return userDoc.data().name || "";
        } else {
          console.log("No such user document!");
          return "";
        }
      } else {
        console.log("User is not logged in.");
        return "";
      }
    } catch (error) {
      console.error("Error fetching user display name:", error);
      return "";
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesSnapshot = await firestore.collection("categories").get();
      const categoriesData = categoriesSnapshot.docs.map((doc) => ({
        id: doc.id,
        label: doc.data().label,
        value: doc.data().value
      }));
      return categoriesData;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Error fetching categories");
    }
  };
  

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        register,
        addEventSiteToFirestore,
        uploadImageToStorage,
        fetchAllEventSites,
        fetchUserEventSites,
        fetchProfileData,
        getUserId,
        fetchEventDetails,
        updateUserProfile,
        fetchConfirmedBookings,
        getUserDisplayName,
        fetchCategories
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
