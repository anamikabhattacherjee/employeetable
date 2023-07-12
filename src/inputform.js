import React, { useState, useRef } from 'react';
import TableData from './employeetable'; 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'; 
import jsonData from './data.json';
  
function EmployeeForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [employeeData, setEmployeeData] = useState(jsonData);
  const [index, setIndex] = useState('');
  const [flag, setFlag] = useState(0);

  const ageRef = useRef();
  const nameRef = useRef();
  
  const changeName = (event) => {
    setName(event.target.value);
  };
  
  const changeAge = (event) => {
    setAge(event.target.value);
  };
  
  const submitValue = (event) => {
    event.preventDefault();
    if (flag===0){
    const val = {
      name,
      age,
    };
    const totalEmployees = employeeData.length;
    val.id = totalEmployees + 1;
    const updatedEmployeeData = [...employeeData];
    updatedEmployeeData.push(val);
    setEmployeeData(updatedEmployeeData);
    clearState();
   }
   else {
    employeeData[index].name = name;
    employeeData[index].age = age;
    setFlag(0);
   }
  };
  
  const clearState = () => {
    setName('');
    setAge('');
  };
  const HandleDeleteClick = (row) => {
    employeeData.splice(row.index,1);
    setEmployeeData([...employeeData])
  }
  const HandleEditClick = (event) => {
    const rowIndex = event.target.parentNode.parentNode.rowIndex;
    let employee= employeeData[rowIndex-1]
    nameRef.current.value = employee.name; 
    ageRef.current.value = employee.age; 
    setName(employee.name)
    setAge(employee.age)
    setFlag(1)
    setIndex(rowIndex-1)
  }

  const tableRows = employeeData.map((info,index) => {
    return (
        <TableRow
        key={index}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
        <TableCell style={{ width: 160 }} align="left">{info.id}</TableCell>
        <TableCell style={{ width: 200 }} align="left">{info.name}</TableCell>
        <TableCell style={{ width: 100 }} align="left">{info.age}</TableCell>
        <TableCell style={{ width: 50 }} align="center"><Button variant="outlined" onClick={HandleDeleteClick}> 
        Delete
      </Button></TableCell>
      <TableCell style={{ width: 100 }} align="left"><Button variant="outlined" onClick={HandleEditClick}>
        Edit
      </Button></TableCell>
      </TableRow>
    );
  });
  
  return (
    <>
    <div>
      <label>Name</label>
      <input id="name" ref={nameRef} type="text" value={name} onChange={changeName} />
      <label>Age</label>
      <input id="age" ref={ageRef} type="text" value={age} onChange={changeAge} />
      <button onClick={submitValue}>Save</button>
    </div>
    <TableData rows= {tableRows}></TableData>
    </>
  );
}
  
export default EmployeeForm; 