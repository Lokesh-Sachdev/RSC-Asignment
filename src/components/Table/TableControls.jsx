import React, { useState } from 'react';

const TableControls = ({ handleSort, handleSearchInputChange }) => {
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSortClick = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
    handleSort(column, sortOrder);
  };

  return (
    <>
      <input
        type="text"
        class="form-control form-input"
        onChange={handleSearchInputChange}
        placeholder="Search..."
      />
      <div class="btn-group" role="group" aria-label="Basic outlined example">
        <button
          type="button"
          class="btn btn-outline-primary"
          onClick={() => handleSortClick('id')}
        >
          Sort by ID
        </button>
        <button
          type="button"
          class="btn btn-outline-primary"
          onClick={() => handleSortClick('title')}
        >
          Sort by Title
        </button>
        <button
          type="button"
          class="btn btn-outline-primary"
          onClick={() => handleSortClick('body')}
        >
          Sort by Body
        </button>
        <button
          type="button"
          class="btn btn-outline-primary"
          onClick={() => handleSortClick('userId')}
        >
          Sort by User ID
        </button>
      </div>
    </>
  );
};

export default TableControls;
