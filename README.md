# User List API

## Overview

The User List Management API is designed to manage user lists , upload users to selected list via CSV, and send emails to users on that created list. The API is built using Express.js and MongoDB, with the frontend developed in React and Vite.

## Deployed Application:- https://thunderous-pavlova-31149b.netlify.app/

## Features

- *Create User List*: Create a new user list with custom properties.
- *Upload Users*: Upload users to a list from a CSV file.
- *Send Emails*: Send emails to users in a specific list with custom placeholders.

## Prerequisites

- Node.js
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
   sh
   git clone https://github.com/chiranjiv-d-adsul/user-list-management.git
   cd user-list-management
   

2. Install backend dependencies:
   sh
   cd backend
   npm install
   

3. Install frontend dependencies:
   sh
   cd ../frontend
   npm install
   

## Configuration

1. *Backend Configuration*:

   Create a .env file in the backend directory and add the following environment variables:
   env
   MONGODB_URL=<your_mongodb_connection_string>
   PORT=5000
   EMAIL_USER=<your_email@example.com>
   EMAIL_PASS=<your_email_password>
   

## Running the Application

1. *Start the Backend*:
   sh
   cd backend
   npm start
   

2. *Start the Frontend*:
   sh
   cd ../frontend
   npm run dev
   

## API Endpoints

### User List Routes

- *Create List*
  - *URL*: https://user-list-backend-1.onrender.com/chiru/v1/lists/
  - *Method*: POST
  - *Body*:
    json
    {
      "title": "string",
      "customProperties": [
        {
          "title": "string",
          "defaultValue": "string"
        }
      ]
    }
    

- *Get all Lists*
  - *URL*: https://user-list-backend-1.onrender.com/chiru/v1/lists/lists
  - *Method*: GET

### User Routes

- *Upload Users from CSV*
  - *URL*: https://user-list-backend-1.onrender.com/chiru/v1/users/664b2a620ae4a63479d2ea05/userList
  - *Method*: POST
  - *Form Data*:
  - "Content-Type: multipart/form-data" \
    "file=@uploads/sample.csv"

### Email Routes

- *Send Email to List*
  - *URL*: https://user-list-backend-1.onrender.com/chiru/v1/emails/664b2a620ae4a63479d2ea05/send-email
  - *Method*: POST
  - *Body*:
    json
  {
  "subject": "Welcome to company!",
  "body": "Hey [name]!\n\nThank you for signing up with your email [email]. We have received your city as [city].\n\nTeam Company."
}
    

## Frontend Components

### CreateList Component

Form to create a new user list.

### UserList Component

Displays all user lists and includes components for uploading users and sending emails.

### UploadCSV Component

Form to upload users to a specific list via CSV.

### EmailForm Component

Form to send emails to users in a specific list.

## Usage

### Creating a User List

1. Open the frontend in your browser.
2. Use the "Create List" form to create a new user list with custom properties.

### Uploading Users

1. Navigate to the "User Lists" section.
2. For a specific list, use the "Upload CSV" form to upload users.

### Sending Emails

1. Navigate to the "User Lists" section.
2. For a specific list, use the "Send Email" form to send emails to users.


---

Replace placeholders with your actual values, such as the repository URL and email credentials. Adjust the instructions as needed based on your specific setup and environment.


