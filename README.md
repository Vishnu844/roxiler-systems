# MERN Stack Coding Challenge

## Overview

This documentation provides an overview of a Product Transactions web application built using the MERN stack (MongoDB, Express, React, Node.js). The application fetches product transaction data from the backend and renders a table, statistics section, and bar chart on the frontend.

## Table of Contents

1. [Installation](#installation)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [API Endpoints](#api-endpoints)
5. [Features](#features)
6. [Technologies Used](#technologies-used)
7. [Folder Structure](#folder-structure)
8. [Contributing](#contributing)

## Installation

### Prerequisites

- Node.js
- MongoDB

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/Vishnu844/roxiler-systems.git
   cd roxiler-systems

2. Install dependencies for both backend and frontend:
   ```sh
   cd backend
   npm install
   cd ../frontend
   npm install

3. Start MongoDB server:
   ```sh
   mongod

4. Start the backend server:
   ```sh
   cd backend
   npm start

5. Start the frontend server:
   ```sh
   cd ../frontend
   npm start

## Backend Setup

The backend is built using Node.js, Express, and MongoDB.

### Libraries

- **Axios**: Promise-based HTTP client for making requests to the API.

### Configuration

- Ensure MongoDB is running locally or update the MongoDB connection string in `backend/config/db.js`.

### API Endpoints

| Method | Endpoint                          | Description                                                                        |
|--------|-----------------------------------|------------------------------------------------------------------------------------|
| GET    | /api/transactions                 | Fetch all product transactions with pagination, month filter, and search parameter |
| GET    | /api/statistics                   | Fetch statistics for a given month                                                 |
| GET    | /api/bar-chart                    | Fetch data for bar chart for a given month                                         |
| GET    | /api/pie-chart                    | Fetch data for pie chart for a given month                                         |
| GET    | /api/combined                     | Fetch statistics, bar chart data, and pie chart data for a given month             |

## Frontend Setup

The frontend is built using React.

### Components

1. **Search Bar**: Allows users to search for specific transactions.
2. **Select Month**: A dropdown component (select tag) with options representing different months.
3. **Table**: Displays product transaction data in a tabular format.
4. **Statistics**: Shows key statistics derived from the transaction data.
5. **Bar Chart**: Visualizes data using a bar chart.

### Libraries

- **Chart.js:** for bar chart visualization

## Features

- Fetches and displays product transaction data.
- Renders data in a table format.
- Fetches and displays key statistics (e.g., total sale amount, total sold items, total not sold items).
- Fetches and visualizes price range data of selected month using a bar chart.

## Technologies Used

### Backend

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing product transaction data.
- **Axios**: Promise-based HTTP client for making requests to the API.

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Chart.js**: JavaScript library for creating charts and graphs.

### Development Tools

- **npm**: Package manager for Node.js packages.
- **Git**: Version control system for tracking changes in the codebase.
- **Visual Studio Code**: Source code editor with built-in support for JavaScript and React.
- **Postman**: API development environment for testing API endpoints.

## Folder Structure

```
/roxiler-systems
│
├── /backend
│   ├── /config
│   ├── /controllers
│   ├── /models
│   ├── /routes
│   ├── index.js
│   └── ...
│
├── /frontend
│   ├── /src
│   │   ├── /components
|   |   ├── /hooks
|   |   ├── /utils
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   ├── public
│   └── ...
│
└── README.md
```
## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.
