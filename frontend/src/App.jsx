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
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;

    const matchesSearch =
      task.title.toLowerCase().includes(searchTitle.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const toggleStatus = (task) => {
    const newStatus =
      task.status === "Complete" ? "Incomplete" : "Complete";

    const updatedTask = {
      title: task.title,
      description: task.description,
      status: newStatus
    };

    fetch(`http://localhost:5000/api/tasks/${task.id}`, {
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
    })
    .catch((error) => {
      console.error("Error changing task status:", error);
    });
  };
  

return (
  <div>
    <h1>Task Management</h1>
    <div>
      <button onClick={() => setShowAddForm(true)}>Add</button>

      <div>
        <label>Search Title: </label>
        <input type="text" value={searchTitle} onChange={(event) => setSearchTitle(event.target.value)}placeholder="Search task title"/>

      </div>

      <div>
        <label>Filter Tasks: </label>
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="all">All</option>
          <option value="Incomplete">Incomplete</option>
          <option value="Complete">Complete</option>
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

    {filteredTasks.map((task) => (
      <div key={task.id}>
        <input type="checkbox" checked={task.status === "Complete"} onChange={() => toggleStatus(task)}/>
        <span>{task.status}</span>
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <button onClick={() => editTask(task)} disabled={task.status === "Complete"}>Update</button>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    ))}

    </div>
  )
}

export default App
