// src/components/UserDashboard.js
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

const UserDashboard = () => {
  const [categories, setCategories] = useState([]);
  const history = useHistory();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      history.push("/signin");
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryCollection = collection(db, "categories");
      const categorySnapshot = await getDocs(categoryCollection);
      const categoryList = categorySnapshot.docs.map((doc) => doc.data());
      setCategories(categoryList);
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h2>User Dashboard</h2>
      <button onClick={handleSignOut}>Sign Out</button>
      <div>
        <h3>Categories</h3>
        <ul>
          {categories.map((category, index) => (
            <li key={index}>{category.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
