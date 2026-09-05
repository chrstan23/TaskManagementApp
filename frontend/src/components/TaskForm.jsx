function TaskForm({ mode, title, description, setTitle, setDescription, onSubmit, onCancel}) {
    return (
        <div className="modal-overlay">
          <div className="modal">
          <h2>{mode === "add" ? "Add Task" : "Edit Task" }</h2>      

          <div className="form-group">
            <label>Title:</label><br />
            <input className="form-input" type="text" value={title} onChange={(event) => setTitle(event.target.value)} /><br />

          </div>

          <div className="form-group">
          <label>Description:</label><br />
          <textarea className="form-textarea" value={description} onChange={(event) => setDescription(event.target.value)}></textarea><br />

          </div>

          <div className="form-actions">
          <button onClick={onSubmit}> {mode === "add" ? "Add Task" : "Update" }</button>
          <button className="cancelButton" onClick={onCancel}>Cancel</button>

          </div>
          <hr />
          </div>
        </div>
    )
}

export default TaskForm;