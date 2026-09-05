import { useEffect, useState } from 'react';
import './App.css'
import TaskForm from "./components/TaskForm.jsx";
import TaskCard from "./components/TaskCard.jsx";
import Header from './components/Header.jsx';

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
      setShowAddForm(false);

      alert("Task added successfully!");
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
      alert("Task updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating task:", error);
    });
  };

  const deleteTask = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if(!confirmDelete){
      return;
    }
  fetch(`http://localhost:5000/api/tasks/${id}`, {
    method: "DELETE"
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      getTasks();
      alert("Task deleted successfully!");
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
  <div className="app">
    <Header 
      onAddClick={() => setShowAddForm(true)}
      searchTitle = {searchTitle}
      setSearchTitle = {setSearchTitle}
      statusFilter = {statusFilter}
      setStatusFilter = {setStatusFilter}
    />

      {showAddForm && (
        <TaskForm
          mode="add"
          title = {title}
          description = {description}
          setTitle = {setTitle}
          setDescription = {setDescription}
          onSubmit = {addTask}
          onCancel = {() => { setShowAddForm(false); setTitle(""); setDescription("");
          }}
        />
      )}

      {editingTaskId !== null && (
        <TaskForm
          mode="edit"
          title = {title}
          description = {description}
          setTitle = {setTitle}
          setDescription = {setDescription}
          onSubmit = {updateTask}
          onCancel = {() => { setEditingTaskId(null); setTitle(""); setDescription(""); }}
          />
      )}

      <div className="task-container">
        {filteredTasks.map((task) => (
          <TaskCard
            key = {task.id}
            task = {task}
            onToggleStatus = {toggleStatus}
            onEdit = {editTask}
            onDelete = {deleteTask}
          />
        ))}

      </div>
    </div>
  )
}

export default App
