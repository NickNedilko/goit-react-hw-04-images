import React, { useState } from 'react';
import { toast } from 'react-toastify';
// import { FaTelegram } from 'react-icons/fa';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleSearchInputChange = e => setSearch(e.target.value);

  const handleFormSubmit = event => {
    event.preventDefault();
    if (search.trim() === '') {
      return toast.warn('Введите строку поиска');
    }
    onSubmit(search);
    setSearch('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleFormSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>
        {/* <FaTelegram width="1140" height="1140"  /> */}

        <input
          className={css.SearchFormInput}
          type="text"
          name="search"
          value={search}
          onChange={handleSearchInputChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
