# In-n-Out Store Management Suite
The final project for BYU PW CSE340 - An In-n-Out focused API.

## Introduction

This Node.js server hosts an API that allows In-n-Out employees and managers programtic access to managing their store's menu, ingredient inventory, orders, and employees.  While all endpoints are accessible to an authenticated manager, employees are, in general, restricted to GET and PUSH resources.  An unauthenticated user is only allowed to GET menu resources.

This server uses MongoDB to store resource data.

## Developement

This project is planned to be in developement between Feburary 2nd and 20th.

Please reference [Trello](https://trello.com/b/tdrBiveR/cse341final) for work to be done.

## Authentication and Authorization

This API uses GitHub OAuth for authentication.
Navigate to /login to authenticate.
After successful login, a session cookie is issued.
Protected routes require authentication.
Manager roles have full access to resources.
Employees are generally restricted to read and limited modification access.
Unauthenticated users may only access public GET routes (menu items).

## Tech Satck

-Node.js
-Express.js
-MongoDB & Mongoose
-Passport.js (GitHub OAuth)
-Jest (Unit Testing)
-Swagger (API Documentation)
-Render (Deployment)

## Getting Started

1. Clone this repo.
2. CD into the repo and run `npm install`.
3. Setup a MongoDB database with 4 collections, "menu", "ingredients", "orders", and "employees."
4. Add your MongoDB connection string to the .env file.
5. Run `npm run start.`
