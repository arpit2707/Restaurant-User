// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import UserDashboard from "./components/UserDashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Categories from "./components/Categories";
import CategoryPage from "./components/CategoryPage";
import RecipeDetails from "./components/RecipeDetails";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/signup" element={<SignUp />} />

        <Route path="/signin" element={<SignIn />} />

        <Route
          path="/dashboard"
          element={user ? <UserDashboard /> : <SignIn />}
        />

        <Route path="/categories" element={<Categories />} />

        <Route path="/category/:categoryName" element={<CategoryPage />} />

        <Route path="/recipe/:recipeName" element={<RecipeDetails />} />

        <Route path="/" element={<SignIn />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
