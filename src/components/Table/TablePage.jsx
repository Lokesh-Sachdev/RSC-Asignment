import React, { useState, useEffect } from 'react';
import TableComponent from './TableComponent';
import TableControls from './TableControls';
import axios from 'axios';

const TablePage = () => {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts'
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSort = (column, order) => {
    setSortColumn(column);
    setSortOrder(order);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.body.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <h1>Table Page</h1>
      <TableControls
        handleSort={handleSort}
        handleSearchInputChange={handleSearchInputChange}
      />
      <TableComponent
        data={filteredData}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
      />
    </div>
  );
};

export default TablePage;
