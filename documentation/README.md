# DIETAPP

## API
- Name: spoonacular api
- Web site: https://spoonacular.com/food-api
- Format: json
- Data information: 
    * Diet type
    * Recipes
    * Ingredients
    * Nutritional Information
- Feature:    
    * Searchable recipes (This may or may not me implemented)
    * Add note to diet (This will be implemented)
    * Select diet (This will be implemented)
    * Select recipes (This will be implemented)
    * Signup and login (This will be implemented)
- Programing structures:  
    * css
    * html
    * node.js
    * react.js
    * postgreSQL
    * External api

## Database schema
![dietapp schema](./dietapp%20schema.png)

- User: This entity stores the user's email and password. The user email serves as a unique identifier or a username for user accounts within the application.
- Notes: This entity is related to the user and to store various pieces of information created by the user. Each note has a unique identifier (user email), the user's email (linking it to the User entity), a title, the content of the note itself, a date (presumably the date the note was created or last modified), and a recipe id (which suggests that notes can be associated with specific recipes).
- User (Recipes): This is to be a second instance or aspect of the User entity, which is specifically related to recipes. It holds a recipe id and a recipe title, indicating that users can create or store recipes within the application.

## App description
- specialized application designed to function similarly to a to-do app but tailored for dietary planning and tracking. Within this app, users are identified by their unique email addresses and secure passwords. The core features of the app revolve around personalized notes and recipe management. Users can create notes related to their dietary plans, which include details such as the title, content of the note, the date it was created or updated, and an associated recipe ID, indicating the note's relation to a specific meal or dietary regimen. Additionally, the app allows users to compile and maintain a collection of recipes, each identifiable by a unique recipe ID and a descriptive title. This functionality suggests an interactive platform where users can not only list their dietary tasks but also link them to specific meals and recipes, enabling detailed meal planning and dietary management. The design seems user-centric, with an emphasis on simplicity and ease of navigation, thus aligning with the utility of a to-do app while focusing on the dietary aspects of the users' lives.