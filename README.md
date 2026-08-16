# Structured-Backend-API-Development-with-Express

# INSY7314 ICE Task 2 - Structured Backend API

## 1. Project Description

This project is a structured Backend API developed using **Node.js and Express.js** for the INSY7314 Information Systems 3D ICE Task 2.

The original sample resource was changed from **gadgets** to **movies** as required by the activity instructions.

The Backend API demonstrates:

* Express.js backend development
* Structured route organization
* Controller organization
* Middleware
* Input validation
* Controlled Cross-Origin Resource Sharing (CORS)
* Central error handling
* Temporary in-memory data storage
* REST API endpoints
* Postman API testing

---

## 2. Technologies Used

* Node.js
* Express.js
* CORS
* Helmet
* Dotenv
* Postman
* GitHub

---

## 3. Project Structure

```text
backendAPI/
│
├── controllers/
│   └── movieController.js
│
├── middleware/
│   ├── validateMovieInput.js
│   └── errorHandler.js
│
├── routes/
│   └── movieRoutes.js
│
├── .env
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

---

## 4. Movie Resource

The original gadget resource was changed to a movie resource.

Each movie contains at least five attributes, including the ID.

The movie attributes are:

| Attribute  | Description               |
| ---------- | ------------------------- |
| `id`       | Unique movie identifier   |
| `title`    | Movie title               |
| `director` | Movie director            |
| `genre`    | Movie genre               |
| `year`     | Movie release year        |
| `rating`   | Movie rating from 0 to 10 |

---

## 5. API Base URL

The API runs locally on:

```text
http://localhost:4000
```

---

# 6. API Routes and Endpoints

## 6.1 Root Route

### GET

```text
GET http://localhost:4000/
```

### Purpose

Checks that the API is running.

### Example Response

```json
{
    "app": "SecureAPI",
    "message": "API is running securely"
}
```

---

## 6.2 Health Route

### GET

```text
GET http://localhost:4000/health
```

### Purpose

Checks the health and protocol of the backend server.

### Example Response

```json
{
    "status": "OK",
    "protocol": "HTTP"
}
```

---

## 6.3 Get All Movies

### GET

```text
GET http://localhost:4000/api/movies
```

### Purpose

Returns all movies currently stored in the temporary in-memory collection.

### Example Response

```json
{
    "count": 2,
    "data": [
        {
            "id": "m1",
            "title": "Inception",
            "director": "Christopher Nolan",
            "genre": "Science Fiction",
            "year": 2010,
            "rating": 8.8
        },
        {
            "id": "m2",
            "title": "The Dark Knight",
            "director": "Christopher Nolan",
            "genre": "Action",
            "year": 2008,
            "rating": 9.0
        }
    ]
}
```

---

## 6.4 Get Movie By ID

### GET

```text
GET http://localhost:4000/api/movies/m1
```

### Purpose

Returns a specific movie using its ID.

### Example Response

```json
{
    "data": {
        "id": "m1",
        "title": "Inception",
        "director": "Christopher Nolan",
        "genre": "Science Fiction",
        "year": 2010,
        "rating": 8.8
    }
}
```

---

## 6.5 Get Movie With Invalid ID

### GET

```text
GET http://localhost:4000/api/movies/m999
```

### Purpose

Tests the API's error handling when a movie does not exist.

### Example Response

```json
{
    "error": "Movie not found"
}
```

Expected HTTP status:

```text
404 Not Found
```

---

# 7. Create a New Movie

## POST

```text
POST http://localhost:4000/api/movies
```

### Headers

```text
Content-Type: application/json
```

### Purpose

Adds a new movie to the temporary in-memory movie collection.

The movie ID is generated automatically by the backend.

---

# 9. Input Validation

The API uses an input validation middleware called:

```text
middleware/validateMovieInput.js
```

The validation middleware checks:

* `title`
* `director`
* `genre`
* `year`
* `rating`

### Title Validation

The title must:

* Be provided
* Be a text value
* Contain between 2 and 100 characters

### Director Validation

The director must:

* Be provided
* Be a text value
* Contain between 2 and 60 characters

### Genre Validation

The genre must be one of the allowed genres.

Allowed genres include:

```text
Action
Adventure
Animation
Comedy
Crime
Drama
Horror
Romance
Science Fiction
Thriller
```

### Year Validation

The movie release year must be a valid year between 1888 and the current year.

### Rating Validation

The rating must be a number between:

```text
0 and 10
```

---

# 10. Input Validation Test

## Invalid Request

### POST

```text
POST http://localhost:4000/api/movies
```

### Request Body

```json
{}
```

### Expected Response

```json
{
    "error": "All fields are required"
}
```

Expected HTTP status:

```text
400 Bad Request
```

---

## 10.1 Partial Input Validation Test

### Request Body

```json
{
    "title": "Avatar"
}
```

The API should reject the request because the remaining required fields have not been supplied.

Expected HTTP status:

```text
400 Bad Request
```

---

# 11. Error Handling

The API uses a central error handler located at:

```text
middleware/errorHandler.js
```

The central error handler handles errors generated by the API and returns an appropriate HTTP status and error message.

Unknown routes are also handled by the API.

### Example

```text
GET http://localhost:4000/api/unknown
```

### Response

```json
{
    "error": "Route not found"
}
```

Expected HTTP status:

```text
404 Not Found
```

---

# 12. Controlled CORS

The API uses the CORS package to control which client origin can access the backend.

The client origin is configured using the `.env` file.

Example:

```env
CLIENT_ORIGIN=http://localhost:5173
```

The API allows the following HTTP methods:

```text
GET
POST
PUT
DELETE
```

The allowed request headers include:

```text
Content-Type
Authorization
```

---

# 13. Security

The backend also uses **Helmet** to add security-related HTTP headers.

The Express `x-powered-by` header has also been disabled.

The API supports optional HTTPS configuration through environment variables.

---

# 14. Environment Variables

The `.env` file contains environment-specific configuration.

Example:

```env
PORT=4000
USE_HTTPS=false
APP_NAME=SecureAPI
CLIENT_ORIGIN=http://localhost:5173
```

The `.env` file should not be committed to GitHub.

---

# 15. Running the Project

## Step 1: Install Dependencies

Open the terminal in the backend project directory and run:

```bash
npm install
```

## Step 2: Start the Development Server

Run:

```bash
npm run dev
```

The server should run on:

```text
http://localhost:4000
```

---

# 16. Postman Testing Summary

| Method | Endpoint           | Purpose               |
| ------ | ------------------ | --------------------- |
| GET    | `/`                | Test root route       |
| GET    | `/health`          | Test server health    |
| GET    | `/api/movies`      | Get all movies        |
| GET    | `/api/movies/m1`   | Get movie by ID       |
| GET    | `/api/movies/m999` | Test movie not found  |
| POST   | `/api/movies`      | Create a new movie    |
| POST   | `/api/movies`      | Test input validation |

---

# 17. GitHub Repository

The Backend API source code is available on my personal GitHub repository.

**GitHub Repository:**

```text
https://github.com/Ochwo-Anthony/Structured-Backend-API-Development-with-Express
```

---

# 18. Conclusion

This Backend API implements the required components for INSY7314 ICE Task 2, including structured routes, controllers, middleware, a movie API resource, input validation, controlled CORS, central error handling, and Postman endpoint testing.

