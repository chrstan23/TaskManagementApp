const express = require("express");
const db = require("./db")

const app = express();
app.use(express.json());

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

//POST API
app.post("/api/tasks", (req, res) => {
    const { title, description, status } = req.body;

    const sql = "INSERT INTO tbl_task (title, description, status) VALUES (?, ?, ?)";

    db.query(sql, [title, description, status], (err, result) => {
        if(err){
            console.error("Database error: ", err);

            return res.status(500).json({ error: "Failed to Create task" });
        }

        res.status(201).json ({ message: "Task created successfully", taskId: result.insertId });
    });
});

//PUT API
app.put("/api/tasks/:id", (req, res) => {
    const id = req.params.id;
    const {title, description, status} = req.body;

    const sql = "UPDATE tbl_task SET title = ?, description = ?, status = ? WHERE id = ?";

    db.query(sql, [title, description, status, id], (err, result) => {
        if (err) {
            console.error("Database error: ", err);

            return res.status(500).json({ error: "Failed to Update task" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json ({ error: "Task not found" });
        }
        res.json({ message: "Task updated successfully" });
    });
});

//DELETE API
app.delete("/api/tasks/:id", (req, res) => {
    const id = req.params.id;

    const sql = "DELETE from tbl_task WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err){
            console.error( "Database error: ", err);

            return res.status(500).json ({ error: "Failed to Delete task" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json ({ error: "Task not found" });
        }
        res.json({ message: "Task deleted successfully" });
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});