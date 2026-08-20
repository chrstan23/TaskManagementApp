const mysql = require('mysql2');

//database credentials
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "db_taskmanagement"
});

db.connect((err) => {
    if (err) {
        console.error("Database error: ", err);
        return;
    }

    console.log("Database connected");
});

module.exports = db;