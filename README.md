# Cognifyz-FullStack-Internship

## Overview

This repository contains the projects completed as part of the
**Cognifyz Full Stack Development Internship**.

The repository includes Tasks 1 to 8, covering frontend development,
backend development, APIs, database integration, authentication,
external API integration, and advanced server-side functionality.

---

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- EJS
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- OpenWeather API
- Morgan
- Node-Cache
- Express Rate Limit
- Git and GitHub

---

# Tasks

## Task 1 — Basic Server Setup

### Objective

Create a basic server-side application using Node.js and Express.

### Features

- Express server setup
- Basic routing
- Server response
- Basic project structure

### Technologies

- Node.js
- Express.js

---

## Task 2 — Frontend and Server Integration

### Objective

Create a frontend interface and connect it with the server.

### Features

- EJS views
- Express routes
- HTML forms
- Server-side processing
- Dynamic page rendering

### Technologies

- Node.js
- Express.js
- EJS
- HTML
- CSS

---

## Task 3 — Form Handling and Validation

### Objective

Implement form processing and validation.

### Features

- Form submission
- Server-side validation
- Required field validation
- Error messages
- Success messages
- Form data handling

### Technologies

- Express.js
- EJS
- JavaScript
- HTML
- CSS

---

## Task 4 — Advanced Frontend Functionality

### Objective

Develop an interactive frontend application.

### Features

- Interactive user interface
- JavaScript functionality
- Responsive design
- CSS styling
- Client-side interaction

### Technologies

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- EJS

---

## Task 5 — API Integration

### Objective

Work with APIs and implement API-based functionality.

### Features

- API requests
- API responses
- JSON data handling
- Client-server communication
- Dynamic frontend updates

### Technologies

- Node.js
- Express.js
- JavaScript
- EJS
- REST API

---

## Task 6 — Database Integration and User Authentication

### Objective

Integrate a database and implement user authentication
for secure data handling.

### Features

- MongoDB database integration
- User registration
- User login
- Password hashing
- JWT authentication
- Protected dashboard
- Authentication middleware
- User data retrieval

### Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- JSON Web Token
- EJS

### Database

MongoDB is used to store user information securely.

---

## Task 7 — Advanced API Usage and External API Integration

### Objective

Explore advanced API concepts and integrate external APIs.

### Features

- External API integration
- OpenWeather API
- Weather search
- Current weather information
- Temperature
- Humidity
- Atmospheric pressure
- Wind speed
- Visibility
- Sunrise and sunset
- Five-day forecast
- API error handling
- Rate limiting
- OAuth concept explanation
- Responsive weather dashboard

### API

The project uses the OpenWeather API to retrieve weather information.

### Technologies

- Node.js
- Express.js
- EJS
- JavaScript
- CSS
- OpenWeather API
- express-rate-limit
- dotenv

### Security

The OpenWeather API key is stored in an environment variable
and is not included in the repository.

---

## Task 8 — Advanced Server-Side Functionality

### Objective

Implement advanced server-side features for a robust application.

### Features

### 1. Middleware

The application uses middleware for request processing.

- JSON body parsing
- URL-encoded body parsing
- Request logging

### 2. Request Logging

Morgan is used to log HTTP requests received by the server.

### 3. Background Task Processing

A background job queue is implemented to process tasks asynchronously.

The application supports:

- Creating background jobs
- Processing jobs
- Job status
- Sequential job processing
- Job completion

### 4. Server-Side Caching

Node-Cache is used to implement server-side caching.

The application supports:

- Storing data in cache
- Retrieving cached data
- Serving repeated requests from cache
- Clearing the cache

### 5. Error Handling

The application includes:

- 404 route handling
- Global server error handling
- API error responses

### Technologies

- Node.js
- Express.js
- Morgan
- Node-Cache
- JavaScript

---

# Project Structure

```text
Cognifyz-Full-Stack-Internship
│
├── Task1
│
├── Task2
│
├── Task3
│
├── Task4
│
├── Task5
│
├── Task6
│
├── Task7
│
├── Task8
│
├── .gitignore
├── package.json
└── package-lock.json