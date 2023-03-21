# SQL

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Running the Application](#running-the-application)
4. [API Endpoints](#api-endpoints)

## Installation

1. Change to server directory:

```bash
  cd sql
```

2. Install dependencies

```bash
  npm install
```

## Configuration

1. Create a .env file in the server root directory:

2. Open the .env file and add the following environment variables:

- `PORT`: The port on which the server will run (default: 8000)
- `TOKEN_KEY`: Secret key used for JWT authorisation, replace "helloworld" with your desired key.
- `DB_NAME`: The name of the database (default: 'postgres')
- `DB_USER`: The username for the database (default: 'postgres')
- `DB_PASSWORD`: The password for the database

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

**Example Request:**

```json
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
  "password": "examplepassword",
  "email": "example@example.com"
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
  <img src="../../client/src/assets/endpoint1.png"  width= 1000/>
   <img src="../../client/src/assets/endpoint2.png"width= 1000 />
</p>
