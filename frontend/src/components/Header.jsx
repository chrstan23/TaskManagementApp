function Header({ onAddClick, searchTitle, setSearchTitle, statusFilter, setStatusFilter}){
    return (
        <div className="header">

            <h1>Task Management</h1>
            <div className="controls">
                <button className="add-button" onClick={onAddClick}>Add Task</button>

                <div className="search-container">
                <label>Search Title: </label>
                <input className="search-input" type="text" value={searchTitle} onChange={(event) => setSearchTitle(event.target.value)}placeholder="Search task title"/>

                </div>

                <div className="filter-container">
                <label>Filter Tasks: </label>
                <select className="status-filter" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                    <option value="all">All</option>
                    <option value="Incomplete">Incomplete</option>
                    <option value="Complete">Complete</option>
                </select>
                </div>
            </div>
        </div>
    )
}
export default Header;