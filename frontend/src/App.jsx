import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);

    useEffect(() => {
      fetch("http://localhost:5000/api/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Database error:", error);
      });
    }, []);

  return (
    <div>
      <h1>Task Management</h1>

      {tasks.map((task) => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <button>Update</button>
          <button>Delete</button>
        </div>
      ))}

    </div>
  )
}

export default App
