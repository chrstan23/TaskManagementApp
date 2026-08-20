const express = require("express");
const db = require("./db")

const app = express();

const PORT = 5000;

//initial GET for connecting to database
app.get("/", (req, res) => {
    res.json({
        message: "Task Management API is running"
    });
});

//GET API for all tasks
app.get("/api/tasks", (req, res) => {
    const sql = "SELECT id, title, description, status FROM tbl_task";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Database error: ", err);
            return res.status(500).json({ error: "Failed to Fetch tasks" });
        }
        res.json(results);
    });    
});

//GET API for single id
app.get("/api/tasks/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT id, title, description, status FROM tbl_task WHERE id=?"

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Database error: ", err);
            return res.status(500).json({ error: "Failed to Fetch tasks" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json(results);
    });
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})