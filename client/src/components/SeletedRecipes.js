// SelectedRecipes.js

import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function SelectedRecipes() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [checkedRecipe, setCheckedRecipe] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility
  const [message, setMessage] = useState(""); // State to manage success message
  const [note, setNote] = useState(""); // State to store note for selected recipe

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    try {
      const api = await fetch(process.env.REACT_APP_FOOD_API_KEY);
      const data = await api.json();
      setAllRecipes(data.recipes);
      setLoading(false);
    } catch (error) {
      setError("Error fetching recipes. Please try again later.");
      setLoading(false);
      console.error("Error fetching recipes:", error);
    }
  };

  const handleDietClick = (diet) => {
    setSelectedDiet(diet);
    if (diet === "VEGAN") {
      const filtered = allRecipes
        .filter((recipe) =>
          recipe.diets.some((d) => d.toUpperCase() === diet.toUpperCase())
        )
        .slice(0, 10);
      setFilteredRecipes(filtered);
    } else if (diet === "GLUTEN FREE") {
      const filtered = allRecipes
        .filter((recipe) =>
          recipe.diets.some((d) => d.toLowerCase() === "gluten free")
        )
        .slice(0, 10);
      setFilteredRecipes(filtered);
    } else if (diet === "WHOLE 30") {
      const filtered = allRecipes
        .filter((recipe) =>
          recipe.diets.some((d) => d.toUpperCase() === diet.toUpperCase())
        )
        .slice(0, 10);
      setFilteredRecipes(filtered);
    } else if (diet === "PALEOLITHIC") {
      const filtered = allRecipes
        .filter((recipe) =>
          recipe.diets.some((d) => d.toLowerCase() === "paleolithic")
        )
        .slice(0, 10);
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes([]);
    }
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCheckboxChange = (recipeId) => {
    if (checkedRecipe === recipeId) {
      setCheckedRecipe(null);
    } else {
      setCheckedRecipe(recipeId);
    }
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleSubmit = async () => {
    const userEmail = cookies.Email;

    if (!checkedRecipe) {
      console.error("No recipe selected.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/recipe/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: userEmail,
          recipeIds: [checkedRecipe],
          note: note, // Include note in the request body
        }),
      });

      if (response.ok) {
        setMessage("Selected recipe added successfully!"); // Set success message
        setModalVisible(false); // Close the modal after successful submit
        // Clear note after saving
        setNote("");
        // Any additional logic after successful saving, e.g., feedback to user or UI update
      } else {
        throw new Error(`Error saving selected recipe: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error adding recipe ID:", error);
    }
  };

  return (
    <div>
      <div className="diet-list-menu">
        <div onClick={() => handleDietClick("VEGAN")}>
          <h3>VEGAN</h3>
        </div>
        <div onClick={() => handleDietClick("GLUTEN FREE")}>
          <h3>GLUTEN FREE</h3>
        </div>
        <div onClick={() => handleDietClick("WHOLE 30")}>
          <h3>WHOLE 30</h3>
        </div>
        <div onClick={() => handleDietClick(null)}>
          <h3>Show All</h3>
        </div>
        <div>
          <button className="save-recipe" onClick={handleSubmit}>
            Save Recipe
          </button>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {message && <p>{message}</p>} {/* Display success message */}
      {selectedDiet && (
        <div>
          <p>You have selected {selectedDiet}.</p>
          {filteredRecipes.length === 0 ? (
            <p>No recipes found for {selectedDiet}</p>
          ) : (
            filteredRecipes.map((recipe) => (
              <div className="card" key={recipe.id}>
                <input
                  type="checkbox"
                  id={`recipe-${recipe.id}`}
                  checked={checkedRecipe === recipe.id}
                  onChange={() => handleCheckboxChange(recipe.id)}
                />
                <label htmlFor={`recipe-${recipe.id}`}>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    onClick={() => handleRecipeClick(recipe)}
                    style={{ cursor: "pointer" }}
                  />
                  <div className="recipe-title">
                    <h2>{recipe.title}</h2>
                  </div>
                  {/* End Note Input */}
                  {selectedRecipe && selectedRecipe.id === recipe.id && (
  <div className="recipe">
    <h3>Details:</h3>
    <ol>
      {recipe.analyzedInstructions[0]?.steps && // Check if steps array exists
        recipe.analyzedInstructions[0].steps.map((step, index) => (
          <li key={index}>{step.step}</li>
        ))}
    </ol>
    <p>Ready in {recipe.readyInMinutes} minutes</p>
    <h3>Ingredients:</h3>
    <ul>
      {recipe.extendedIngredients.map((ingredient, index) => (
        <li key={index}>{ingredient.original}</li>
      ))}
    </ul>
  </div>
)}

                  <div className="notebox">
                    {/* Note Input */}

                  </div>
                </label>
              </div>
            ))
          )}
        </div>
      )}
      {!selectedDiet &&
        allRecipes.map((recipe) => (
          <div className="card" key={recipe.id}>
            <input
              type="checkbox"
              id={`recipe-${recipe.id}`}
              checked={checkedRecipe === recipe.id}
              onChange={() => handleCheckboxChange(recipe.id)}
            />
            <label htmlFor={`recipe-${recipe.id}`}>
              <img
                src={recipe.image}
                alt={recipe.title}
                onClick={() => handleRecipeClick(recipe)}
                style={{ cursor: "pointer" }}
              />
              <div className="recipe-title">
                <h2>{recipe.title}</h2>
              </div>
              {/* End Note Input */}
              {selectedRecipe && selectedRecipe.id === recipe.id && (
  <div className="recipe">
    <h3>Details:</h3>
    {console.log(recipe.analyzedInstructions)} {/* Add this line to check the value */}
    <ol>
      {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 && 
        recipe.analyzedInstructions[0].steps.map((step, index) => (
          <li key={index}>{step.step}</li>
        ))}
    </ol>
    <p>Ready in {recipe.readyInMinutes} minutes</p>
    <h3>Ingredients:</h3>
    <ul>
      {recipe.extendedIngredients.map((ingredient, index) => (
        <li key={index}>{ingredient.original}</li>
      ))}
    </ul>
  </div>
)}

              <div className="notebox">
                {/* Note Input */}

              </div>
            </label>
          </div>
        ))}
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalVisible(false)}>
              &times;
            </span>
            <p>Modal content here.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectedRecipes;
