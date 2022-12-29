import React from "react";
import { useState } from "react";

export default function AddTask({ addTask, changeFilter }) {
    const [label, setLabel] = useState("");
    return (
        <div>
            <input value={label} onChange={(event) => setLabel(event.target.value)} />
            <button
                type="submit"
                onClick={(event) => {
                    event.preventDefault();
                    addTask(label);
                    setLabel("");
                }}
            >
                Add
            </button>

            <button type="submit" onClick={() => changeFilter('all')}>All</button>
            <button type="submit" onClick={() => changeFilter(true)}>Done</button>
            <button type="submit" onClick={() => changeFilter(false)}>In progress</button>


        </div>
    );
}