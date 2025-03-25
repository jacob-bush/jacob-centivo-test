# jacob-centivo-test

## Overview

This project is a Node.js Express API that connects to a MongoDB database to retrieve user data based on a given user ID. It includes error handling for invalid `ObjectId` values, and filters the results to only return users whose age is greater than 21. The API is built using TypeScript for type safety and scalability.

## Approach

1. Set up an Express server that connects to a MongoDB database using Mongoose.
2. Implemented a GET endpoint (`/users/:id`) that retrieves user details by their ID and applies the age filter.
3. Added error handling for invalid `ObjectId` values and server errors.
4. Ensured proper response status codes (404 for not found, 400 for invalid ID) to enhance user experience.