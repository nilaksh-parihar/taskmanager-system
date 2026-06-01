# Task Management System

## Overview

A full-stack Task Management System built using FastAPI, PostgreSQL, React, and JWT Authentication.

## Features

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Task CRUD Operations
* PostgreSQL Database Integration
* React Dashboard
* Role-Based Authorization

## Tech Stack

### Backend

* Python
* FastAPI
* PostgreSQL
* SQLAlchemy
* JWT Authentication
* Passlib

### Frontend

* React
* Vite
* Material UI
* Axios
* React Router

---

## How to Run the Project

### Prerequisites

* Python 3.11+
* Node.js
* PostgreSQL
* Git

### Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

python -m uvicorn app.main:app --reload
```

Backend runs on:

```text
http://localhost:8000
```

Swagger Documentation:

```text
http://localhost:8000/docs
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

### Database Configuration

Create a `.env` file inside the backend folder:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/task_manager_db

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60
```

---

## API Endpoints

### Authentication

* POST `/api/v1/auth/register`
* POST `/api/v1/auth/login`

### Users

* GET `/api/v1/users/me`

### Tasks

* POST `/api/v1/tasks/`
* GET `/api/v1/tasks/`
* GET `/api/v1/tasks/{id}`
* PUT `/api/v1/tasks/{id}`
* DELETE `/api/v1/tasks/{id}`

---

## Author

Nilaksh Parihar
