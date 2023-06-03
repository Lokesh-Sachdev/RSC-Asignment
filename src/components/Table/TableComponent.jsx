import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const TableComponent = ({ data, sortColumn, sortOrder }) => {
  const [sortedData, setSortedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const sortData = (data) => {
      const sorted = [...data].sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];

        if (sortOrder === 'asc') {
          return compareValues(valueA, valueB);
        } else {
          return compareValues(valueB, valueA);
        }
      });
      setSortedData(sorted);
    };

    sortData(data);
  }, [data, sortColumn, sortOrder]);

  const compareValues = (valueA, valueB) => {
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return valueA - valueB;
    }
    return String(valueA).localeCompare(String(valueB));
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const indexOfLast = (currentPage + 1) * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = sortedData.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <Link to={`/posts/${item.id}`}>{item.title}</Link>
              </td>
              <td>{item.body}</td>
              <td>{item.userId}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil(sortedData.length / postsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </>
  );
};

export default TableComponent;
