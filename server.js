const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

let employees = [];

app.get("/employees", (req, res) => {
    res.json(employees);
});

app.post("/employees", (req, res) => {
    const { name } = req.body;
    if (!name || typeof name !== "string") {
        return res.status(400).json({ error: "Name is required and must be a string" });
    }
    const newEmployee = { id: uuidv4(), name };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});

app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
