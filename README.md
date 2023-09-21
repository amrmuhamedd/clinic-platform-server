# clinic-platform-server

The Clinic Platform is a web-based application designed to streamline communication and data management between doctors and patients. It allows doctors to view patient profiles, create and update medical records, and send notifications to patients. Patients can log in, view their profiles, and receive email notifications about updates to their medical records.

## Technologies Used

- **Node.js:** Used for the backend server.
- **Express.js:** A Node.js framework for building web applications.
- **MongoDB:** A NoSQL database for storing user profiles and medical records.
- **Typegoose:** A TypeScript library for MongoDB object modeling.
- **Swagger:** For API documentation.
- **SendGrid:** For sending email notifications.
- **JWT (JSON Web Tokens):** Used for user authentication and authorization.
- **Express Validator:** For request validation.
- **Mongoose:** A MongoDB ODM (Object-Document Mapping) library.

## Getting Started

### Prerequisites

Before running the application, make sure you have the following installed:

- Node.js and npm
- MongoDB
- SendGrid API Key (for email notifications)
-.env file like .env.example

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.comamrmuhamedd/clinic-platform-server.git```

2.Install dependencies for both the backend and frontend:

```bash
cd clinic-platform-server
yarn
```
3 start server

```bash 
yarn dev
```

4. Access the application in your web browser at http://localhost:3000/api-docs.

# Features
<ul>
  <li>User registration and login</li>
  <li>Create, update, and delete medical records</li>
  <li>List medical records with pagination</li>
  <li>List patients with pagination</li>
  <li>Get logged-in user info</li>
  <li>Email notifications for patients</li>
</ul>

## Features

- User registration and login
- Create, update, and delete medical records
- List medical records with pagination
- List patients with pagination
- Get logged-in user info
- Email notifications for patients

## API Documentation

API documentation is available using Swagger. Access it at [http://localhost:3000/api-docs](http://localhost:3000/api-docs) when the application is running.

## Database Design

### User Model

The User model stores user profiles with the following fields:

- `_id`: Unique identifier
- `name`: User's name
- `email`: User's email address
- `password`: Hashed password
- `role`: User's role (doctor or patient)

### Medical Record Model

The Medical Record model stores medical records with the following fields:

- `_id`: Unique identifier
- `doctorId`: Reference to the doctor who created the record
- `patientId`: Reference to the patient associated with the record
- `notes`: Medical notes
- `message`: Treatment message
- `diagnosis`: Diagnosis
- `session_date`: Date of the medical session

## live preview 

you can see the live preview [here](https://clincal-platform.onrender.com/api-docs/#/) . Please note that the initial launch of the documentation may be a bit slow as it is hosted on a free hosting plan.
## At the end 
Please refer to the Swagger documentation for detailed information on each endpoint and how to use them.

If you have any questions or encounter issues, feel free to reach out for assistance.




