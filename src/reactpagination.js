import React, { useState, useEffect } from "react";

const ReactPaginationComponents = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const APIURL = "https://jsonplaceholder.typicode.com/todos";

  useEffect(() => {
    fetch(APIURL)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setTotalPages(Math.ceil(data.length / 10));
      });
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const preDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = userData.slice(startIndex, endIndex);

  return (
    <>
      <div>
        <table className="table">
          <thead>
            <th>userId</th>
            <th>Id</th>
            <th>Title</th>
            <th>Completed</th>
          </thead>
          <tbody>
            {itemsToDisplay?.map((item, index) => (
              <tr key={index}>
                <td>{item.userId}</td>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.completed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={handlePrevClick} disabled={preDisabled}>
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => {
        return (
          <button
            onClick={() => handlePageChange(i + 1)}
            key={i}
            disabled={i + 1 === currentPage}
          >
            {i + 1}
          </button>
        );
      })}
      <button onClick={handleNextClick} disabled={nextDisabled}>
        Next
      </button>
    </>
  );
};

export default ReactPaginationComponents;
