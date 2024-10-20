import React from 'react';
import styles from "./Search.module.css"

const Search = ({ search, setSearch, handleSearchSubmit }) => {
  return (
    <form onSubmit={handleSearchSubmit} className={styles.form}>
      <input className={styles.input}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks..."
        style={{ padding: '10px', margin: '10px 0', width: '300px' }}
      />
      <button type="submit" className={styles.searchbtn}>Search</button>
    </form>
  );
};

export default Search;

