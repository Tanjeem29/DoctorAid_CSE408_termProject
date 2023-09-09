import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import remove from './Image/trash-bin.png'; // Import your delete icon

function TestsTable() {
  const [tests, setTests] = useState([]);


  useState(() => {
    fetch('/api/v0/get_all_tests')
      .then(res => res.json())
      .then(data => setTests(data.data));
  }
  , []);

  const handleRemoveTest = (index) => {
    const newTests = [...tests];
    newTests.splice(index, 1);
    setTests(newTests);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Test ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tests.map((test, index) => (
          <TableRow key={index}>
            <TableCell>{test.id}</TableCell>
            <TableCell>{test.test_name}</TableCell>
            <TableCell>
              <Button onClick={() => handleRemoveTest(index)}>
                <img src={remove} alt="Delete" style={{ width: '40px', height: '40px' }} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TestsTable;