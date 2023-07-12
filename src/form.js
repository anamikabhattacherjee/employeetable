import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import EmployeeForm from './employee';
import jsonData from './data.json';
  
function TableData() {
  const [employeeData, setEmployeeData] = useState(jsonData);
  const HandleDeleteClick = (row) => {
    employeeData.splice(row.index,1);
    setEmployeeData([...employeeData])
  }

  const tableRows = employeeData.map((info) => {
    return (
        <TableRow>
        <TableCell style={{ width: 160 }} align="left">{info.id}</TableCell>
        <TableCell style={{ width: 200 }} align="left">{info.name}</TableCell>
        <TableCell style={{ width: 100 }} align="left">{info.age}</TableCell>
        <TableCell style={{ width: 50 }} align="center"><Button variant="outlined" onClick={HandleDeleteClick}> 
        Delete
      </Button></TableCell>
      <TableCell style={{ width: 100 }} align="left"><Button variant="outlined" onClick>
        Edit
      </Button></TableCell>
      </TableRow>
    );
  });

  const addRows = (data) => {
    const totalEmployees = employeeData.length;
    data.id = totalEmployees + 1;
    const updatedEmployeeData = [...employeeData];
    updatedEmployeeData.push(data);
    setEmployeeData(updatedEmployeeData);
  };
  
  return (
    <Paper>
    <TableContainer>
    <EmployeeForm func={addRows} />
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="left">ID</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Age</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableRows}</TableBody>
      </Table>
      </TableContainer>
    </Paper>
  );
}
  
export default TableData;