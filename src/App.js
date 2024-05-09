import React, { useState, useEffect } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (taskName.trim() !== '' && taskDescription.trim() !== '') {
      setTasks([
        ...tasks,
        { id: tasks.length + 1, name: taskName, description: taskDescription, completed: false }
      ]);
      setTaskName('');
      setTaskDescription('');
    }
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  const handleToggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setTaskName(taskToEdit.name);
    setTaskDescription(taskToEdit.description);
    setEditingTaskId(taskId);
  };

  const handleSaveEdit = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editingTaskId
          ? { ...task, name: taskName, description: taskDescription }
          : task
      )
    );
    setTaskName('');
    setTaskDescription('');
    setEditingTaskId(null);
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div>
        <label>Task Name:</label>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        ></textarea>
      </div>
      {editingTaskId ? (
        <button onClick={handleSaveEdit}>Save Edit</button>
      ) : (
        <button onClick={handleAddTask}>Add Task</button>
      )}
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(task.id)}
            />
            <span>{task.name}</span>
            <div>{task.description}</div>
            <div>
              <button onClick={() => handleEditTask(task.id)}>Edit</button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

