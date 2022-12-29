import React from "react";

export default function TodoItem({ id, completed, label, changeCompletedStatus, deleteItem }) {
    const defaultStyle = {
        textDecoration: 'none'
    }

    const crossOutStyle = {
        textDecoration: 'line-through'
    }

    return (
        <div className="todo-item">
            <input
                onChange={() => changeCompletedStatus(id)}
                type="checkbox"
                checked={completed}
            />
            <div style={completed ? crossOutStyle : defaultStyle}>{label}</div>
            <button type="submit" onClick={() => deleteItem(id)}>Delete</button>
        </div>
    )
}