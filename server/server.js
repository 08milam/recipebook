// server.js

const PORT = process.env.PORT || 5001;
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("../client/build"));

app.get("/todo/:userEmail", async (req, res) => {
  const { userEmail } = req.params;
  try {
    const todos = await pool.query(
      "SELECT * FROM todos WHERE user_email = $1",
      [userEmail]
    );
    res.json(todos.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/todos", async (req, res) => {
  const { user_email, title, date } = req.body;
  const id = uuidv4();
  try {
    await pool.query(
      `INSERT INTO todos(id, user_email, title, date) VALUES($1, $2, $3, $4)`,
      [id, user_email, title, date]
    );
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// ---------------------------------------------------------------------
// ADD RECIPE
// Define your route handler for adding recipes
// Endpoint for adding recipe with a note
app.post("/recipe/add", async (req, res) => {
  const { user_email, recipeIds, note } = req.body;

  try {
    const recipeIdsArray = Array.isArray(recipeIds) ? recipeIds : [recipeIds];

    for (const recipeId of recipeIdsArray) {
      // Check if the recipe already exists in the recipes table
      const existingRecipe = await pool.query(
        "SELECT * FROM recipes WHERE recipe_id = $1",
        [recipeId]
      );
      let recipeTitle = "New Recipe"; // Default title if the recipe doesn't exist
      if (existingRecipe.rows.length > 0) {
        recipeTitle = existingRecipe.rows[0].title;
      }

      // Update the title of the recipe in the recipes table
      await pool.query(
        "INSERT INTO recipes (recipe_id, title, note) VALUES ($1, $2, $3) ON CONFLICT (recipe_id) DO UPDATE SET title = $2, note = $3",
        [recipeId, req.body.title || recipeTitle, note]
      );

      // Check if the todo already exists for this recipe and user
      const existingTodo = await pool.query(
        "SELECT * FROM todos WHERE recipe_id = $1 AND user_email = $2",
        [recipeId, user_email]
      );
      if (existingTodo.rows.length === 0) {
        // Generate unique ID for the todo item
        const id = uuidv4();
        // Get the current date/time
        const date = new Date().toISOString();
        // Insert the reference into the todos table with user_email, title, recipe_id, and date
        await pool.query(
          "INSERT INTO todos (id, user_email, title, recipe_id, date) VALUES ($1, $2, $3, $4, $5)",
          [id, user_email, recipeTitle, recipeId, date]
        );
      } else {
      }
    }

    // Send a response indicating success
    res.status(200).json({ message: "Selected recipes saved successfully." });
  } catch (err) {
    console.error("Error saving recipe IDs:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/recipe/:recipeId", async (req, res) => {
  const { recipeId } = req.params;
  try {
    const recipe = await pool.query(
      "SELECT note FROM recipes WHERE recipe_id = $1",
      [recipeId]
    );
    res.json(recipe.rows[0]); // Assuming only one recipe is returned
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// This code checks if each recipe ID already exists in the database before inserting it.
// If it doesn't exist, it inserts the recipe; otherwise, it skips it. This prevents updating
// existing recipes and ensures that only new recipes are added to the database.
// ---------------------------------------------------------------------

// DELETE TODO
app.delete("/todo/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // First, retrieve the recipe_id associated with the todo item
    const todo = await pool.query(
      "SELECT recipe_id FROM todos WHERE id = $1;",
      [id]
    );
    const recipeId = todo.rows[0].recipe_id;

    // Then, check if the recipe is not used in any other todo items
    const relatedTodos = await pool.query(
      "SELECT id FROM todos WHERE recipe_id = $1;",
      [recipeId]
    );

    // If there are no other todo items using this recipe, delete it
    if (relatedTodos.rows.length === 1) {
      const deleteRecipe = await pool.query(
        "DELETE FROM recipes WHERE recipe_id = $1;",
        [recipeId]
      );
    }

    // Finally, delete the todo item
    const deleteToDo = await pool.query("DELETE FROM todos WHERE id = $1;", [
      id,
    ]);
    res.json(deleteToDo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.patch("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    const query = `
      UPDATE todos
      SET title = $1, note = $2
      WHERE id = $3
      RETURNING *;
    `;
    const values = [newData.title, newData.note, id];
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// signup
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    if (!salt) {
      return res.status(500).json({ detail: "Failed to generate salt" });
    }
    const hashedPassword = bcrypt.hashSync(password, salt);
    if (!hashedPassword) {
      return res.status(500).json({ detail: "Failed to hash password" });
    }

    const signUp = await pool.query(
      "INSERT INTO users (user_email, hashed_password) VALUES($1, $2)",
      [email, hashedPassword]
    );
    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });
    res.json({ email, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ detail: err.detail || "Signup failed" });
  }
});

// login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [email]
    );
    if (users.rowCount === 0) {
      return res.status(404).json({ detail: "User does not exist" });
    }
    const success = await bcrypt.compare(
      password,
      users.rows[0].hashed_password
    );
    if (success) {
      const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });
      res.json({ email: users.rows[0].user_email, token });
    } else {
      res.status(401).json({ detail: "Login failed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ detail: "Internal Server Error" });
  }
});

app.listen(process.env.PORT || PORT);
