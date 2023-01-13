import React from "react";
import './TodoItem.css'

export default function TodoItem({ id, completed, label, changeCompletedStatus, deleteItem }) {
    const defaultStyle = {
        textDecoration: 'none'
    }

    const crossOutStyle = {
        textDecoration: 'line-through'
    }

    return (
        <div className="todo-item-container">
            <div className="todo-element">
                <input
                    className="checkbox"
                    onChange={() => changeCompletedStatus(id)}
                    type="checkbox"
                    checked={completed}
                />
                <div className="label" style={completed ? crossOutStyle : defaultStyle}>{label}</div>

                <button className="button1 delete-button" type="submit" onClick={() => deleteItem(id)}>Delete</button>
            </div>
        </div>
    )
}