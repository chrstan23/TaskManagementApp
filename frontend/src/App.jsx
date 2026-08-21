import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  
  //for new tasks
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //for update tasks
  const [editingTaskId, setEditingTaskId] = useState(null);

  //for filtering status
  const [statusFilter, setStatusFilter] = useState("all");

  //for searching task title
  const [searchTitle, setSearchTitle] = useState("");

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
  };

  const editTask = (task) => {
    setEditingTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description);
  };

  const updateTask = () => {

    const updatedTask = {
    title: title,
    description: description,
    status: "Incomplete"
    }

    fetch(`http://localhost:5000/api/tasks/${editingTaskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedTask)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      getTasks();

      setEditingTaskId(null);
      setTitle("");
      setDescription("");
    })
    .catch((error) => {
      console.error("Error updating task:", error);
    });
  };

  const deleteTask = (id) => {
  fetch(`http://localhost:5000/api/tasks/${id}`, {
    method: "DELETE"
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      getTasks();
    })
    .catch((error) => {
      console.error("Error deleting task:", error);
    });
  };

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter === "all"){
      return true;
    }

    return task.status === statusFilter;
  });
  

return (
  <div>
    <h1>Task Management</h1>
    <div>
      <button onClick={() => setShowAddForm(true)}>Add</button>

      <div>
        <label>Filter Tasks: </label>
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="all">All</option>
          <option value="incomplete">Incomplete</option>
          <option value="complete">Complete</option>
        </select>
      </div>
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

    {editingTaskId !== null && (
      <div>
        <h2>Edit Task</h2>

        <label>Title:</label><br />
        <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} /><br />
        <label>Description:</label><br />
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} /><br />
        <button onClick={updateTask}>Update</button>
        <button
          onClick={() => {
            setEditingTaskId(null);
            setTitle("");
            setDescription("");
          }}
          >
          Cancel
        </button>
      </div>
    )}

    {/* {tasks.map((task) => (
      <div key={task.id}>
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <p>Status: {task.status}</p>
        <button onClick={() => editTask(task)}>Update</button>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    ))} */}

    {filteredTasks.map((task) => (
      <div key={task.id}>
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <p>Status: {task.status}</p>

        <button onClick={() => editTask(task)}>Update</button>

        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    ))}

    </div>
  )
}

export default App
