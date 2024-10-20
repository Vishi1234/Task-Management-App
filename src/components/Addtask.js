import React, { useState } from "react";
import styles from "./AddTask.module.css";  // Add CSS for styling

const AddTask = ({ setTasks, closePopup }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium"); // Initialize with "Medium"

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return; // Ensure fields are not empty

    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]); // Add new task
    closePopup(); // Close popup after submitting
  };

  return (
    <>
      {/* Modal Overlay */}
      <div className={styles.overlay} onClick={closePopup}></div>

      {/* Modal Content */}
      <div className={styles.modal}>
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
          <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)} // Updates the priority state on change
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <div className={styles.modalButtons}>
            <button type="submit" className={styles.addition}>Add Task</button>
            <button type="button" onClick={closePopup}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTask;
