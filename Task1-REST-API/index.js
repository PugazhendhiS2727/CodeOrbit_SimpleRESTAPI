const express = require("express");
const app = express();

// Middleware to read JSON data
app.use(express.json());

// Import routes
const notesRoutes = require("./routes/notes");

// Use routes
app.use("/notes", notesRoutes);

// Server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});