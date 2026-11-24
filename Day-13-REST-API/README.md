# Day 13 – Bookstore REST API (Node.js + Express.js)

**Apex Lark Full Stack Development Internship – Task Day 13**

A modular RESTful API for managing an online bookstore's inventory. It supports full CRUD, title search, category filtering, request validation, logging, request timing, 404 handling, global error handling and standardized JSON responses.

## Tech Stack
Node.js · Express.js · express-validator · morgan · cors · dotenv · nodemon

## Project Structure
```
Day-13-REST-API/
├── config/config.js            # env + file path configuration
├── controllers/bookController.js
├── middleware/
│   ├── errorHandler.js         # 404 + global error handler
│   ├── logger.js               # morgan logging + request timer
│   └── validator.js            # express-validator rules
├── models/bookModel.js         # data access layer (data/books.json)
├── routes/bookRoutes.js
├── utils/apiResponse.js        # standard response helpers
├── data/books.json             # persistent data store
├── screenshots/                # Postman / Thunder Client screenshots
├── app.js
├── package.json
├── .env
└── README.md
```

## Installation
```bash
git clone <your-repo-url>
cd Day-13-REST-API
npm install
npm run dev      # development (nodemon)
# or
npm start        # production
```
Server runs at `http://localhost:5000` (change `PORT` in `.env`).

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Retrieve all books |
| GET | `/api/books/:id` | Retrieve a book by ID |
| POST | `/api/books` | Add a new book |
| PUT | `/api/books/:id` | Update an existing book |
| DELETE | `/api/books/:id` | Delete a book |
| GET | `/api/books/search?title=` | Search books by title (case-insensitive) |
| GET | `/api/books/category/:name` | Filter books by category |

## Book Object
| Field | Type | Rules |
|-------|------|-------|
| title | string | required, 2–150 chars |
| author | string | required, 2–100 chars |
| category | string | required, 2–50 chars |
| price | number | required, > 0 |
| isbn | string | required, valid ISBN-10/13, unique |
| publishedYear | integer | required, 1000 – current year |
| stock | integer | required, ≥ 0 |

## Standard Response Format
```json
{ "success": true, "message": "Book added successfully", "data": {} }
```
Status codes used: `200` OK, `201` Created, `400` Bad Request / validation error, `404` Not Found, `500` Internal Server Error.

## Sample Requests

**Add a book** – `POST /api/books`
```json
{
  "title": "Crime and Punishment",
  "author": "Fyodor Dostoevsky",
  "category": "Fiction",
  "price": 399,
  "isbn": "9780140449136",
  "publishedYear": 1866,
  "stock": 14
}
```
Response `201`:
```json
{
  "success": true,
  "message": "Book added successfully",
  "data": { "id": 10, "title": "Crime and Punishment", "author": "Fyodor Dostoevsky", "category": "Fiction", "price": 399, "isbn": "9780140449136", "publishedYear": 1866, "stock": 14 }
}
```

**Validation failure** – `POST /api/books` with `{ "title": "A", "price": -5 }` → `400`
```json
{
  "success": false,
  "message": "Validation failed",
  "data": {},
  "errors": [
    { "field": "title", "message": "Title must be 2-150 characters" },
    { "field": "author", "message": "Author is required" }
  ]
}
```

**Search** – `GET /api/books/search?title=clean`

**Category** – `GET /api/books/category/technology`

**Update** – `PUT /api/books/1` (send the full book object)

**Delete** – `DELETE /api/books/1`

## Middleware
- **morgan** – HTTP request logging
- **requestTimer** – logs duration and sets `X-Response-Time` header
- **validator** – express-validator rules for every write/param/query
- **notFound** – 404 for unknown routes
- **errorHandler** – global handler (also catches malformed JSON)

## API Testing Screenshots
Add Postman / Thunder Client screenshots to `/screenshots`:
1. GET all books
2. GET book by ID
3. POST (success)
4. PUT
5. DELETE
6. Validation failure
7. Search & category filter

## Author
Vanshika Dhiman – Apex Lark FSD Internship
