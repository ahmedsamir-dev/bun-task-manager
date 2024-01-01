# Task Manager API

This project is a backend API for a task manager application developed using Bun as the runtime environment and Elysia as the server framework.

## Features

1. **Create Task (POST):**
   - Allow creating new tasks with a title and description.

2. **View Tasks (GET):**
   - Support GET requests to retrieve all tasks in a list or a single task's details.

3. **Edit Task (PUT):**
   - Enable editing existing tasks' title and description.

4. **Delete Task (DELETE):**
   - Allow tasks to be deleted via DELETE requests.

5. **Routing:**
   - Implement API routing to handle different endpoints for task operations.

6. **State Management:**
   - Manage application state effectively, integrating with MongoDB.

7. **TypeScript Integration:**
   - Utilize TypeScript throughout the API development.

8. **Error Handling and Validation:**
   - Implement input validation for task creation and editing.
   - Provide comprehensive error responses.

9. **Code Quality and Best Practices:**
   - Write clean, efficient, and well-documented code.
   - Follow RESTful principles and best practices for API development.
   - Organize code with proper separation of concerns.

10. **Unit Testing:**
    - Implement unit tests using Bun's built-in test environment.

11. **Rate Limiting:**
    - Implement rate limiting for enhanced security.

12. **MongoDB Integration:**
    - Connect the API with MongoDB for persistent storage.
      
13. **Git Hooks:**
    - Relied on Lefthook for pre-commit and pre-push hooks for safe commits

## Postman Documentation

Explore the [Postman Documentation](https://www.postman.com/salehunter/workspace/bun-task-manager/share?collection=12208720-6e3687bb-ee9d-4632-babe-3dedb1ceec62) to understand and interact with the API endpoints.

## How to Run the App

1. Create a `.env` file with the following variables:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/yourdbname
2. Update The MongoDB name in docker-compose.yml file
3. Run
   ```bash
   docker-compose up

## Future Improvements

- **Authentication Module:**
  - Add an authentication module relying on JWT for protected routes.
  - Handle Relationship between tasks and users.
