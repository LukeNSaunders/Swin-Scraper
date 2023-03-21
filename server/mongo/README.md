# Mongo

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Running the Application](#running-the-application)
4. [API Endpoints](#api-endpoints)

## Installation

1. Change to server directory:

```bash
  cd mongo
```

2. Install dependencies

```bash
  npm install
```
## Configuration 

1. Create a .env file in the server root directory:

2. Open the .env file and add the following environment variables:

- `PORT`: The port on which the server will run (default: 8000)
- `MONGODB_URI`: The MongoDB connection string (replace localhost with your MongoDB server's address, and your desired database name)
- `TOKEN_KEY`: Secret key used for JWT authorisation, replace "helloworld" with your desired key. 

## Running the Application
To start the server, run:

```bash
  npm start 
```
The server will be running at http://localhost:8000 (replace 8000 with the port you specified in the .env file).

## API Endpoints
The following API endpoints are available:

### POST /odds: 

Scrape odds for a given horse racing event from a bookmaker site.

Requires an Authorization header with the JWT token obtained from a successful login. In Thunder Client, set the token in the Auth section under the "Bearer" category.

**Example Request:**
```json

"Bearer Token": "Your_jwt_token_here"

{
"eventUrl": "https://sports.bwin.com/en/sports/horse-racing-29/hawthorne-246/2:4991436"
}

```
### POST /events

Scrape horce racing events for a given bookmaker site. 

**Example Request:**

```json
{
  "pageUrl": "https://sports.bwin.com/en/sports/horse-racing-29/today"
}
```
### POST /register

Create new user in database. 

**Example Request:**

```json
{
  "username": "exampleuser",
  "email": "example@example.com"
  "password": "examplepassword",
}
```
 ### POST /login

Query database and login user. 

**Example Request:**

```json
 {
  "email": "example@example.com",
  "password": "examplepassword"
}
```

<p align="center">
  <img src="../client/src/assets/endpoint1.png"  width= 1000/>
   <img src="../client/src/assets/endpoint2.png"width= 1000 />
</p>



