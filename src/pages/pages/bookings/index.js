import React from 'react';
import { useState, useEffect } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'

const Bookings = () => {

  const [listData, setListData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [rowID, setRowID] = useState("");
  const [ratings, setRatings] = useState("");

  useEffect(() => {
    // Fetch value from LocalStorage
    const customerUUID = localStorage.getItem('Cuuid');
    console.log("UUID : " + customerUUID);

    // Fetch the new list data
    const fetchData = async () => {
      try {
        const response = await fetch('http://13.127.200.135:8080/api/get/bookings/' + customerUUID);
        const data = await response.json();
        console.log(data);
        console.log(data.length);
        setListData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleClickOpen = (wid) => {
    setRowID(wid);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const rateNow = async (event) => {
    event.preventDefault();

    var payload = JSON.stringify({ 
      "ratings": ratings
    });

    // Send the POST request
    const response = await fetch('http://13.127.200.135:8080/api/updateRatings/bookings/' + rowID, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
    });

    console.log(response.status);

    // Handle the response
    if (response.ok) {
      window.location.reload();
    } else {
      // Error occurred, handle the error
      const error = await response.text();
      console.error('Error:', error);
    }
  };

  return (
    <Card>
      <CardHeader title='My Bookings' titleTypographyProps={{ variant: 'h6' }} />
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
          {/* <Typography variant='body2'>
          My Bookings
        </Typography> */}
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Type of Work</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Worker Name</TableCell>
              <TableCell>Worker Email</TableCell>
              <TableCell>Worker Phone</TableCell>
              <TableCell>Ratings</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {(listData.length == 0) ? <TableRow hover sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell colSpan={6}>-- No Data Found --</TableCell>
              </TableRow> : listData.map((row, index) => (
              <TableRow hover key={row.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  {index + 1}
                </TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.type_of_work}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.worker_name}</TableCell>
                <TableCell>{row.worker_email}</TableCell>
                <TableCell>{row.worker_phone}</TableCell>
                {row.ratings != null ? <TableCell>{row.ratings}</TableCell> : <TableCell>NA</TableCell>}
                <TableCell>
                  {row.ratings == 'NA' || row.ratings == '' || row.ratings == null ? <Button variant='outlined' sx={{ color: 'blue' }} onClick={() => handleClickOpen(row.id)}>Rate Now!</Button> : null }
                  <Dialog
                    open={open}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle>{"Provide Ratings!"}</DialogTitle>
                    <DialogContent>
                    <Card>
                  <CardContent>
                    <form onSubmit={rateNow}>
                      <Grid container spacing={5} mb={5}>
                        {row.status != '' ? <Grid item xs={12} sm={12}>
                                <FormControl fullWidth>
                                  <InputLabel>Ratings:</InputLabel>
                                  <Select label='Ratings' defaultValue='- Select -' onChange={(e) => setRatings(e.target.value)}>
                                    <MenuItem value='- Select -' selected disabled>- Select -</MenuItem>
                                    <MenuItem value='1'>1 - Bad</MenuItem>
                                    <MenuItem value='2'>2</MenuItem>
                                    <MenuItem value='3'>3 - Good</MenuItem>
                                    <MenuItem value='4'>4</MenuItem>
                                    <MenuItem value='5'>5 - Excellent</MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid> : null}
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Button fullWidth type='submit' variant='contained' size='large'>
                          Submit
                        </Button>
                      </Grid>
                    </form>
                  </CardContent>
                </Card>
                    </DialogContent>
                    
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
    </Card>
  )
}

export default Bookings
