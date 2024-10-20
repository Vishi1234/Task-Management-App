import React, { useState, useEffect } from 'react';
import Search from '../components/Search';
import List from '../components/List';
import AddTask from '../components/Addtask';
import "../styles/globals.css";  // Global CSS
import "./index.css";

// Server-side fetching (you can move this to a separate file if desired)
export async function getServerSideProps(context) {
  const { query } = context;
  const searchQuery = query.search || "";

  // Example task data
  const tasks = [
    { id: 1, title: "Learn Next.js", description: "Understand SSR and dynamic routing", priority: "high", completed: false },
    { id: 2, title: "Build UI", description: "Create task management UI", priority: "medium", completed: false },
    { id: 3, title: "Write Tests", description: "Write unit and integration tests", priority: "low", completed: false },
  ];

  // Filter tasks based on the search query
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort tasks by priority
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  const sortedTasks = filteredTasks.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  return {
    props: { tasks: sortedTasks, searchQuery },
  };
}

const Home = ({ tasks: initialTasks, searchQuery }) => {
  const [tasks, setTasks] = useState(initialTasks); // Manage tasks state
  const [search, setSearch] = useState(searchQuery); // State for search
  const [isAddTaskVisible, setAddTaskVisible] = useState(false); // State for AddTask popup

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Add a new task
  const addNewTask = (newTask) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      return updatedTasks;
    });
  };

  // Toggle task completion status
  const toggleCompleted = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Update a task
  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <div>
      <h1>Task Management App</h1>

      {/* Search Component */}
      <Search search={search} setSearch={setSearch} />

      {/* Add Task Button */}
      <button
        className="addition"
        onClick={() => setAddTaskVisible(true)}
        style={{ padding: '10px', margin: '20px 0' }}
      >
        Add Task
      </button>

      {/* Task List Component */}
      <List
        tasks={tasks}
        toggleCompleted={toggleCompleted}
        deleteTask={deleteTask}
        updateTask={updateTask}
        addTask={addNewTask} // Pass addNewTask to List
      />

      {/* Add Task Popup */}
      {isAddTaskVisible && <AddTask setTasks={setTasks} closePopup={() => setAddTaskVisible(false)} />}
    </div>
  );
};

export default Home;






