// Modal.js
import React, { useState, useEffect } from "react";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, task, onSave }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState(task?.priority || "low");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
    }
  }, [task]);

  const handleSave = () => {
    const updatedTask = { ...task, title, description, priority };
    onSave(updatedTask);
  };

  return (
    <div className={`${styles.modal} ${isOpen ? styles.open : ""}`}>
      <div className={styles.modalContent}>
        <h2 className={styles.head}>Edit Task</h2>
        <div className={styles.formGroup}>
          <label htmlFor="title"></label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description"></label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="priority"></label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.save} onClick={handleSave}>Save</button>
          <button className={styles.cancel} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
