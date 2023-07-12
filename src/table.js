import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import React, { useState, useEffect } from "react";

const Basictable = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentRows, setCurrentRows] = useState(10); 

  const APIURL = "https://jsonplaceholder.typicode.com/todos";

  useEffect(() => {
    fetch(APIURL)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      });
  }, []);

  function handlePageChange(event, newPage) {
    setCurrentPage(newPage);
  };

  function handleChangeRowsPerPage(event) {
    setCurrentRows(parseInt(event.target.value, 10));
    setCurrentPage(0);
}

  return (
    <Paper>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">userId</TableCell>
            <TableCell align="left">id</TableCell>
            <TableCell align="left">title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {userData.slice(currentPage * currentRows, currentPage * currentRows + currentRows).map((item,index) => (

            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{item.userId}</TableCell>
              <TableCell align="left">{item.id}</TableCell>
              <TableCell align="left">{item.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
    rowsPerPageOptions={[10,20]}
    component="div"
    count={userData.length}
    rowsPerPage={currentRows}
    page={currentPage}
    onPageChange={handlePageChange}
    onRowsPerPageChange={handleChangeRowsPerPage}
/>
</Paper>
  );
}

export default Basictable; 






