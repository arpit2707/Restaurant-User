// src/components/CategoryPage.js
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useParams, Link } from "react-router-dom";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipesCollection = collection(db, "recipes");
      const q = query(recipesCollection, where("category", "==", categoryName));
      const recipesSnapshot = await getDocs(q);
      const recipesList = recipesSnapshot.docs.map((doc) => doc.data());
      setRecipes(recipesList);
    };

    fetchRecipes();
  }, [categoryName]);

  return (
    <div>
      <h2>{categoryName}</h2>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>
            <Link to={`/recipe/${recipe.name}`}>{recipe.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
