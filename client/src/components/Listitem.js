import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false); // Add editMode state

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (task.recipe_id) {
      fetch(
        `https://api.spoonacular.com/recipes/${task.recipe_id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch recipe information");
          }
          return response.json();
        })
        .then(async (data) => {
          // Fetch recipe note from your database
          const response = await fetch(
            `${process.env.REACT_APP_SERVERURL}/recipe/${task.recipe_id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch recipe note");
          }
          const { note } = await response.json();
          // Merge note into recipe data
          const recipeWithNote = { ...data, note };
          setRecipe(recipeWithNote);
        })
        .catch((error) =>
          console.error("Error fetching recipe information:", error)
        );
    }
  }, [task.recipe_id]);

  const deleteItem = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todo/${task.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      // Assuming successful deletion, update the UI
      getData();
    } catch (error) {
      console.error(error);
      // Show error message to the user
      alert("Failed to delete item. Please try again.");
    }
  };

  return (
    <div className="list-item">
      <div className="info-container">
        {recipe && (
          <>
            <div className="recipe-title">
              <h3>{recipe.title}</h3>
            </div>
            <img
              className="recipe-image"
              src={recipe.image}
              alt={recipe.title || "Recipe"}
              onClick={() => setShowModal(true)}
              style={{ cursor: "pointer" }}
            />
            <div className="item-content">

              <p>{recipe.note}</p>
            </div>
          </>
        )}
      </div>
      <div className="button-container">
        <button
          className="edit"
          onClick={() => {
            setShowModal(true);
            setEditMode(true);
          }}
        >
          VIEW
        </button>

        <button className="delete" onClick={deleteItem}>
          DELETE
        </button>
      </div>
      {showModal && (
        <Modal
          mode={"edit"}
          setShowModal={setShowModal}
          getData={getData}
          task={task}
          recipe={recipe}
        />
      )}
    </div>
  );
};

export default ListItem;
