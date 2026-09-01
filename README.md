# Banking Backend Ledger

A secure banking backend built with **Node.js, Express.js, and MongoDB**.
The project provides REST APIs for user authentication, bank accounts, balance management, and money transfers.


## What it does
Users can register, log in, and log out securely.
Logged-in users can create an account, view all their accounts, and check the balance of any account.
Users can send money to another account, and view their transaction history.
Balances are not stored directly — they're calculated by adding up all the transactions for an account. This avoids bugs where the stored balance and the real balance drift apart.
Users get an email when they register, and when a transaction succeeds or fails.


## 🚀 Features

* JWT-based user authentication
* User account management
* Bank account creation and retrieval
* Deposit and withdrawal operations
* Money transfer between accounts
* Ledger-based transaction tracking
* Idempotent transactions to prevent duplicate transfers
* MongoDB transactions for reliable operations
* Email notifications
* Environment-based configuration

## 🛠️ Technologies

* **Node.js** – Backend runtime
* **Express.js** – REST API framework
* **MongoDB** – Database
* **Mongoose** – MongoDB ODM
* **JWT** – Authentication
* **Nodemailer** – Email notifications
* **dotenv** – Environment variables

## 📁 Project Structure

```text
bank-backend_project/
│
├── src/
│   ├── controllers/       # Handles API requests and responses
│   ├── models/            # MongoDB/Mongoose schemas
│   ├── routes/            # API endpoint definitions
│   ├── middleware/        # Authentication and request middleware
│   ├── services/          # Business logic and reusable functions
│   ├── db/                # Database connection
│   └── app.js             # Express application setup
│
├── .env.example           # Example environment variables
├── package.json            # Project dependencies and scripts
└── README.md              # Project documentation
```

## 🔄 How the Project Works

The basic flow of the application is:

```text
Client
   ↓
API Route
   ↓
Middleware
   ↓
Controller
   ↓
Service
   ↓
MongoDB
```

For example, when a user transfers money:

```text
Transfer Request
      ↓
JWT Authentication
      ↓
Transfer Controller
      ↓
Transaction Service
      ↓
MongoDB Transaction
      ↓
Update Ledger
      ↓
Update Account Balances
      ↓
Response
```

## 🔐 Authentication

The application uses **JWT (JSON Web Tokens)** to authenticate users.

After login, the server provides a JWT token. The token is then sent with protected requests so the server can identify the authenticated user.

```http
Authorization: Bearer <your_token>
```

## 💰 Transaction System

The application uses a **ledger-based approach** to track financial transactions.

Instead of relying only on the current account balance, transactions are recorded in the ledger. This provides a history of deposits, withdrawals, and transfers.

The system also uses **idempotency** to help prevent the same transaction from being processed multiple times.

## 🗄️ Database

MongoDB is used to store:

* Users
* Bank accounts
* Transaction/ledger records

Mongoose is used to define schemas and interact with MongoDB.

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Mohd5zan/bank-backend_project.git
cd bank-backend_project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory.

Example:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Add any other environment variables required by the project.

### 4. Start the server

For development:

```bash
npm run dev
```

Or:

```bash
npm start
```

The API will run on:

```text
http://localhost:3000
```

## 📌 API Overview

The project contains **8 REST APIs** covering core banking operations such as:

* User registration/login
* Account management
* Balance operations
* Deposits and withdrawals
* Money transfers
* Transaction history

You can test the APIs using **Postman, Thunder Client, or any REST API client**.

## 🎯 Project Goals

This project was built to understand how real-world backend systems handle:

* Authentication and authorization
* REST API design
* Database relationships
* Financial transactions
* Atomic database operations
* Idempotency
* Backend architecture
* Error handling
* Secure environment configuration

## 👨‍💻 Author

**Mohammad Faizan**

GitHub: https://github.com/Mohd5zan
