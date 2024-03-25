import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import SeletedRecipes from "./SeletedRecipes";

const Modal = ({ mode, setShowModal, getData, task, recipe }) => {
  const [cookies] = useCookies(null);
  const editMode = mode === "edit" ? true : false;

  const initialUserEmail =
    task && task.user_email ? task.user_email : cookies.Email || "";
  const initialTitle = editMode ? task.title : recipe ? recipe.title || "" : "";
  const initialNote = editMode ? task.note : null;

  const [data, setData] = useState({
    id: editMode ? task.id : null, // Set id if in edit mode, otherwise null
    user_email: editMode ? initialUserEmail : "",
    title: initialTitle,
    note: initialNote,
    date: editMode ? task.date : new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editMode
      ? `http://localhost:5001/todos/${data.id}` // URL for editing a todo
      : `http://localhost:5001/todos`; // POST request to create a new todo

    const method = editMode ? "PATCH" : "POST"; // PATCH for editing, POST for creating

    try {
      // Add a check for data.id
      if (editMode && !data.id) {
        throw new Error("Missing data.id for editing.");
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setShowModal(false);
        getData(); // Refresh data after successful submission
      } else {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h1>View a recipe</h1>
          <button onClick={() => setShowModal(false)}>x</button>
        </div>
        <hr />
        {recipe ? (
          <div className="modal-content">
            <div className="image-container">
              {/* Recipe image */}
              <img src={recipe.image} alt={recipe.title || "Recipe"} />
            </div>

            <div className="recipe-title">
              <h2>{recipe.title}</h2>
            </div>
            <div className="recipe">
              {/* Instructions */}
              <h2>Instructions</h2>
              <ol>
                {recipe.analyzedInstructions[0]?.steps.map((step, index) => (
                  <li key={index}>{step.step}</li>
                ))}
              </ol>

              {/* Ingredients */}
              <h2>Ingredients</h2>
              <ul>
                {recipe.extendedIngredients.map((ingredient, index) => (
                  <li key={`${ingredient.id}-${index}`}>
                    {ingredient.original}
                  </li>
                ))}
              </ul>
              {/* Preparation time and servings */}
              <p>Preparation Time: {recipe.readyInMinutes} minutes</p>
              <p>Servings: {recipe.servings}</p>
            </div>

            {/* Form for adding note */}
            <form onSubmit={handleSubmit}>

            </form>
          </div>
        ) : (
          <div></div>
        )}

        {mode !== "edit" && <SeletedRecipes />}
      </div>
    </div>
  );
};

export default Modal;
