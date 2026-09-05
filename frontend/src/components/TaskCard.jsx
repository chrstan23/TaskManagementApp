function TaskCard({ task, onToggleStatus, onEdit, onDelete }) {
    return(
        <div className="task-card" key={task.id}>
            <div className="task-status">
              <input type="checkbox" checked={task.status === "Complete"} onChange={() => onToggleStatus(task)}/>
              <span>{task.status}</span>

            </div>

            <h2>{task.title}</h2>
            <p>{task.description}</p>

            <div className="task-actions">
              <button className="update-button" onClick={() => onEdit(task)} disabled={task.status === "Complete"}>Update</button>
              <button className="deleteButton" onClick={() => onDelete(task.id)}>Delete</button>

            </div>
          </div>
    )
}

export default TaskCard;