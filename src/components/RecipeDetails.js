// src/components/RecipeDetails.js
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { recipeName } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeRef = doc(db, "recipes", recipeName);
      const recipeSnapshot = await getDoc(recipeRef);
      if (recipeSnapshot.exists()) {
        setRecipe(recipeSnapshot.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchRecipe();
  }, [recipeName]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div>
      <h2>{recipe.name}</h2>
      <p>Category: {recipe.category}</p>
      <p>Ingredients: {recipe.ingredients}</p>
      <p>Price: ${recipe.price}</p>
      <img src={recipe.image} alt={recipe.name} />
      <button>Add to Cart</button>
    </div>
  );
};

export default RecipeDetails;
