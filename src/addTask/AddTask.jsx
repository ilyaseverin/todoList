import React from "react";
import { useState } from "react";
import './AddTask.css'

export default function AddTask({ addTask, changeFilter }) {
    const [label, setLabel] = useState("");
    return (
        <div className="add-task-container">
            <input className="input-task" value={label} onChange={(event) => setLabel(event.target.value)} />
            <button
                className="button add-button"
                type="submit"
                onClick={(event) => {
                    event.preventDefault();
                    addTask(label);
                    setLabel("");
                }}
            >
                Add
            </button>

            <button className="button filter-button" type="submit" onClick={() => changeFilter('all')}>All</button>
            <button className="button filter-button" type="submit" onClick={() => changeFilter(true)}>Done</button>
            <button className="button filter-button" type="submit" onClick={() => changeFilter(false)}>In progress</button>


        </div>
    );
}