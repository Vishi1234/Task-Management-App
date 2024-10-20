import React, { useState, useEffect } from "react";
import styles from "./List.module.css";
import Modal from "./Modal"; // Import the Modal component

const List = ({ tasks, toggleCompleted, deleteTask, updateTask, addTask }) => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Priority order (high -> medium -> low)
  const priorityOrder = { high: 1, medium: 2, low: 3 };

  // Load completed tasks from localStorage when component mounts
  useEffect(() => {
    const savedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks"));
    if (savedCompletedTasks) {
      setCompletedTasks(savedCompletedTasks);
    }
  }, []);

  // Save completed tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);

  // Separate tasks into incomplete and completed tasks
  const incompleteTasks = tasks.filter((task) => !completedTasks.includes(task.id));
  const completedTaskList = tasks.filter((task) => completedTasks.includes(task.id));

  // Sort both arrays based on priority
  const sortedIncompleteTasks = [...incompleteTasks].sort(
    (a, b) => priorityOrder[a.priority.toLowerCase()] - priorityOrder[b.priority.toLowerCase()]
  );
  const sortedCompletedTasks = [...completedTaskList].sort(
    (a, b) => priorityOrder[a.priority.toLowerCase()] - priorityOrder[b.priority.toLowerCase()]
  );

  // Function to handle checkbox change and mark the task as completed
  const handleCheckboxChange = (taskId) => {
    if (completedTasks.includes(taskId)) {
      const updatedCompletedTasks = completedTasks.filter((id) => id !== taskId);
      setCompletedTasks(updatedCompletedTasks);
    } else {
      const updatedCompletedTasks = [...completedTasks, taskId];
      setCompletedTasks(updatedCompletedTasks);
    }
    toggleCompleted(taskId); // Call parent function to update completion status
  };

  // Function to get the class name based on priority
  const getPriorityClass = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return styles.highPriority; // Red
      case "medium":
        return styles.mediumPriority; // Yellow
      case "low":
        return styles.lowPriority; // Green
      default:
        return "";
    }
  };

  // Function to open the modal with the task to edit
  const handleEditClick = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  // Function to handle saving the edited task
  const handleSaveEditedTask = (updatedTask) => {
    updateTask(updatedTask); // Call parent function to update task
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  // Function to handle deleting a task
  const handleDeleteTask = (taskId) => {
    deleteTask(taskId); // Call parent function to delete task
  };

  return (
    <div className={styles.parent}>
      <ul className={styles.taskList}>
        {/* Render incomplete tasks first */}
        {sortedIncompleteTasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={completedTasks.includes(task.id)}
                onChange={() => handleCheckboxChange(task.id)}
              />
              {completedTasks.includes(task.id) && <span>Completed</span>}
            </label>

            {/* Task Title */}
            <div className={styles.taskTitle}>{task.title}</div>

            {/* Task Priority */}
            <div className={`${styles.taskPriority} ${getPriorityClass(task.priority)}`}>
              Priority: {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </div>

            {/* Task Description */}
            <p className={styles.taskDescription}>{task.description}</p>

            <div className={styles.buttonGroup}>
              <button
                onClick={() => handleCheckboxChange(task.id)}
                className={styles.compbtn}
                disabled={completedTasks.includes(task.id)}
              >
                Complete
              </button>
              <button onClick={() => handleDeleteTask(task.id)} className={styles.delbtn}>
                Delete
              </button>
              <button onClick={() => handleEditClick(task)} className={styles.editbtn}>
                Edit
              </button>
            </div>
          </li>
        ))}

        {/* Render completed tasks at the bottom */}
        {sortedCompletedTasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={completedTasks.includes(task.id)}
                onChange={() => handleCheckboxChange(task.id)}
              />
              {completedTasks.includes(task.id) && <span>Completed</span>}
            </label>

            {/* Task Title */}
            <div className={styles.taskTitle}>{task.title}</div>

            {/* Task Priority */}
            <div className={`${styles.taskPriority} ${getPriorityClass(task.priority)}`}>
              Priority: {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </div>

            {/* Task Description */}
            <p className={styles.taskDescription}>{task.description}</p>

            <div className={styles.buttonGroup}>
              <button
                onClick={() => handleCheckboxChange(task.id)}
                className={styles.compbtn}
                disabled={completedTasks.includes(task.id)}
              >
                Complete
              </button>
              <button onClick={() => handleDeleteTask(task.id)} className={styles.delbtn}>
                Delete
              </button>
              <button onClick={() => handleEditClick(task)} className={styles.editbtn}>
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          task={currentTask}
          onSave={handleSaveEditedTask}
        />
      )}
    </div>
  );
};

export default List;












  








    
