<h1> Brewbook - Book Management API </h1>

<p>This API enables users to perform CRUD operations on a collection of books.</p>

<h2>Live url: https://brewbook-n254.onrender.com</h2>

<h2> Endpoints </h2>

<h2>Register User</h2>

<h3>Description</h3>
<p>Register a new user.</p>

<h3>Endpoint</h3>
<p>POST /api/register</p>

<h3>Request Body</h3>

<pre>
{
  "username": "YourUsername",
  "password": "YourPassword"
}
</pre>

<h3>Response Body</h3>

<pre>
{
    "status": "success",
    "message": "User registered successfully"
}
</pre>

<h2>Login User</h2>

<h3>Description</h3>
<p>Login a user.</p>

<h3>Endpoint</h3>
<p>POST /api/login</p>

<h3>Request Body</h3>

<pre>
{
  "username": "YourUsername",
  "password": "YourPassword"
}
</pre>

<h3>Response Body</h3>

<pre>
{
    "status": "success",
    "token": "AUTH Token",
    "user": {
        "_id": "userId",
        "username": "YourUsername",
        "createdAt": "2023-10-30T10:04:28.250Z",
        "updatedAt": "2023-10-30T10:04:28.250Z",
    }
}
</pre>

<h2>POST Book</h2>

<h3>Description</h3>
<p>add a new book to the collection</p>

<h3>Endpoint</h3>
<p>POST /api/book</p>

<h3>Request Header</h3>

<p>token: JWT token</p>

<h3>Request Body</h3>

<pre>
{
    "title": "book title",
    "author": "book author",
    "summary": "book summary"
}
</pre>

<h3>Response Body</h3>

<pre>
{
    "status": "success",
    "message": "Book created successfully",
    "data": {
        "userId": "userId",
        "title": "book title",
        "author": "book author",
        "summary": "book summary",
        "_id": "bookId",
        "createdAt": "createdAt",
        "updatedAt": "updatedAt",
    }
}
</pre>

<h2>UPDATE Book</h2>

<h3>Description</h3>
<p>update a book from the collection</p>

<h3>Endpoint</h3>
<p>PUT /api/book</p>

<h3>Request Header</h3>

<p>token: JWT token</p>

<h3>Request Body</h3>

<pre>
{
    "title": "book title",
    "author": "book author",
    "summary": "book summary"
}
</pre>

<h3>Response Body</h3>

<pre>
{
    "status": "success",
    "message": "Book updated successfully",
    "data": {
        "userId": "userId",
        "title": "book title",
        "author": "book author",
        "summary": "book summary",
        "_id": "bookId",
        "createdAt": "createdAt",
        "updatedAt": "updatedAt",
    }
}
</pre>

<h2>DELETE Book</h2>

<h3>Description</h3>
<p>delete a book from the collection</p>

<h3>Endpoint</h3>
<p>DELETE /api/book</p>

<h3>Request Header</h3>

<p>token: JWT token</p>

<h3>Response Body</h3>

<pre>
{
    "status": "success",
    "message": "Book deleted successfully",
    "data": {
        "userId": "userId",
        "title": "book title",
        "author": "book author",
        "summary": "book summary",
        "_id": "bookId",
        "createdAt": "createdAt",
        "updatedAt": "updatedAt",
    }
}
</pre>

<h2>READ Book by id</h2>

<h3>Description</h3>
<p>read a book from the collection using bookId</p>

<h3>Endpoint</h3>
<p>GET /api/book/:id</p>

<h3>Request Header</h3>

<p>token: JWT token</p>

<h3>Response Body</h3>

<pre>
{
    "status": "success",
    "message": "Book deleted successfully",
    "data": {
        "userId":{
            "_id": "userId",
            "username": "username",
        },
        "title": "book title",
        "author": "book author",
        "summary": "book summary",
        "_id": "bookId",
        "createdAt": "createdAt",
        "updatedAt": "updatedAt",
    }
}
</pre>

<h2>READ all Books with pagination sort and filters</h2>

<h3>Description</h3>
<p>read books from the collection using pagination, sort and filter</p>

<h3>Query Params</h3>

- Pagination: page, limit
- Sort: sortBy, sortOrder
- Filter: filterField, filterValue
- eg: <p>/api/book?page=1&limit=1&sortBy=createdAt&sortOrder=asc&filterField=title&filterValue=88</p>

<h3>Endpoint</h3>
<p>GET /api/book/</p>

<h3>Request Header</h3>

<p>token: JWT token</p>

<h3>Response Body</h3>

<pre>
{
    "status": "success",
    "data": {
        "page": "pageNumber",
        "limit": "limit",
        "totalCount": "total number of docs",
        "data": [
            {
                 "title": "book title",
                "author": "book author",
                "summary": "book summary",
                "_id": "bookId",
                "createdAt": "createdAt",
                "updatedAt": "updatedAt",
                "userDetails": [
                    {
                        "_id": "userId",
                        "username": "username"
                    }
                ]
            }
        ]
    }
}
</pre>

<hr>

# Setting Up and Running the Node.js API Application Locally

This guide outlines the steps to set up and run this API application on your local machine.

## Prerequisites

- **Node.js and npm:** Ensure Node.js is installed on your system. You can download and install it from [nodejs.org](https://nodejs.org/).
- **Code Editor:** Have a code editor installed (e.g., Visual Studio Code, Sublime Text, Atom, etc.).

## Getting Started

1. **Clone or Download:**

   - Clone the project repository from GitHub : https://github.com/ishaan1028/brewbook

2. **Install Dependencies:**

   - Open a terminal or command prompt, navigate to the project directory.
   - Run the following command to install the required dependencies listed in the `package.json` file:
     ```
     npm install
     ```

3. **Start the Application:**
   - Run the following command to start the server:
     ```
     node index.js
     ```

## Running the Application

- The application will start running on the specified port (defaults to port 3001 if not specified).
- Open a web browser or use tools like Postman to access the API endpoints.
- Use the defined routes (e.g., `GET /api/books`, `POST /api/books`, etc.) to interact with the API.
- Make requests to the API endpoints to create, read, update, or delete resources.

Remember to check the provided documentation or code comments within the project for specific endpoints, routes, or functionalities available in the API.

<hr>

<h1>Assumptions Made for Creating the Book API Project:</h1>

- Only authenticated users can access the API data.
- Users can delete only their own data.
- Usernames should be unique across the system.
- incoming data is validated before being processed
- To handle a large dataset, pagination is assumed
- sorting, filtering implemented
