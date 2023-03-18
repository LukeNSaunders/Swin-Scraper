# Server

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Running the Application](#running-the-application)
4. [API Endpoints](#api-endpoints)
5. [Contributing](#contributing)
6. [License](#license)

## Requirements

- Node.js v14.x or higher
- npm v6.x or higher
- MongoDB v4.4.x or higher

## Installation

1. Change to server directory:

```bash
  cd server
```

2. Install dependencies

```bash
   cd client
   npm install

   cd server
   npm install
```
## Configuration 

1. Create a .env file in the server root directory:

2. Open the .env file and add the following environment variables:

- `PORT`: The port on which the server will run (default: 3000)
- `MONGODB_URI`: The MongoDB connection string (replace localhost with your MongoDB server's address, and myserverappdb with your desired database name)

## Running the Application
To start the server, run:

```bash
  npm start 
```
The server will be running at http://localhost:8000 (replace 8000 with the port you specified in the .env file).

## API Endpoints
The following API endpoints are available:

- `POST /odds`: Scrape odds for a given horse racing event from a bookmaker site.
- `POST /events`: Scrape horce racing events for a given bookmaker site. 
- `POST /register`: Create new user in database.  
- `POST /login`: Query database and login user. 


