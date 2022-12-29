import './App.css';
import { useState, useEffect } from 'react';

import TodoItem from './todoItem/ToodoItem';
import AddTask from './addTask/AddTask';

export default function App() {
  const [filter, setFilter] = useState('all')
  const [tasks, setTasks] = useState(null)

  useEffect(() => {
    const tasks = localStorage.getItem('tasks');
    setTasks(JSON.parse(tasks))
  }, [])

  useEffect(() => {
    if (tasks !== null) {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }, [tasks])

  const addTask = (label) => {
    if (label !== '') {
      setTasks((tasks) => [
        ...tasks,
        {
          id: tasks.length,
          label: label,
          completed: false
        }
      ]);
    }
  };

  const changeCompletedStatus = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;

    });
    setTasks(newTasks)
  }

  const deleteItem = (id) => {
    const newTasks = tasks.filter((task) => id !== task.id);
    setTasks(newTasks);
  }

  const changeFilter = (status) => setFilter(status)

  const activeTasks = tasks?.filter(task => task.completed === false) || [];
  const completedTasks = tasks?.filter(task => task.completed === true) || [];

  const sortedTasks = [...activeTasks, ...completedTasks]
  const filteredByStatus = filter === 'all' ? sortedTasks : sortedTasks.filter(task => {
    if (task.completed == filter) {
      return true
    }
  })

  return (
    <div >
      <AddTask addTask={addTask} changeFilter={changeFilter} />
      {filteredByStatus.map((task) => (
        <TodoItem
          key={task.id}
          completed={task.completed}
          label={task.label}
          id={task.id}
          changeCompletedStatus={changeCompletedStatus}
          deleteItem={deleteItem}
        />
      ))}
    </div>
  );
}


