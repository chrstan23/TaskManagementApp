import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const getTasks = () => {
  fetch("http://localhost:5000/api/tasks")
    .then((response) => response.json())
    .then((data) => {
      setTasks(data);
    })
    .catch((error) => {
      console.error("Database error:", error);
    });
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = () =>{
    const newTask = {
      title: title,
      description: description,
      status: "Incomplete"
    };

    fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      
      getTasks();
      setTitle("");
      setDescription("");
    })
    .catch((error) => {
      console.error("Database error: ", error);
    });
  }

return (
  <div>
    <h1>Task Management</h1>
    <div>
      <button onClick={() => setShowAddForm(true)}>Add</button>
    </div>
    {showAddForm && (
      <div>
        <h2>Add Task</h2>

        <label>Title:</label><br />
        <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} /><br />
        <label>Description:</label><br />
        <textarea value={description} onChange={(event) => setDescription(event.target.value)}></textarea><br />
        <button onClick={addTask}> Add Task</button>
        <button onClick={() => setShowAddForm(false)}>Cancel</button>
        <hr />
      </div>
    )}

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
