import './App.css';
import { useState, useEffect, useMemo, useCallback } from 'react';

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
    if (Array.isArray(tasks)) {
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

  const changeCompletedStatus = useCallback((id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;

    });
    setTasks(newTasks)
  }, [tasks]);

  const deleteItem = useCallback((id) => {
    const newTasks = tasks.filter((task) => id !== task.id);
    setTasks(newTasks);
  }, [tasks]);

  const changeFilter = (status) => setFilter(status)

  const activeTasks = useMemo(() => {
    return tasks?.filter(task => task.completed === false) || []
  }, [tasks]);
  const completedTasks = useMemo(() => {
    return tasks?.filter(task => task.completed === true) || [];
  }, [tasks]);

  const sortedTasks = [...activeTasks, ...completedTasks]
  const filteredByStatus = useMemo(() => {
    return filter === 'all' ? sortedTasks : sortedTasks.filter(task => {
      if (task.completed == filter) {
        return true
      }
    })
  }, [filter, sortedTasks])

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


