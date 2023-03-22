# SQL

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Running the Application](#running-the-application)

## Installation

1. Change to SQL directory:

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
