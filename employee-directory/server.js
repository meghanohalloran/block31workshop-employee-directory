const express = require("express");
const employees = require("./employees");

const app = express();
const PORT = process.env.PORT || 3000;


app.get("/", (req, res) => {
  res.send("Hello employees!");
});


app.get("/employees", (req, res) => {
  res.json(employees);
});


app.get("/employees/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find(emp => emp.id === id);

  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }

  res.json(employee);
});


app.get("/employees/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.json(employees[randomIndex]);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
