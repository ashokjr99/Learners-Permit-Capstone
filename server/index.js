// Import necessary modules
const express = require('express');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config(); // Load environment variables

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Initialize Prisma Client
const prisma = new PrismaClient();

// Middleware to parse JSON requests
app.use(express.json());

// Define routes
app.get('/', async (req, res) => {
  try {
    // Example Prisma query
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
