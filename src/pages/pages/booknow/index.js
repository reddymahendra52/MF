import React from 'react'
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'

// import { moment } from 'moment';

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'

import styles from './card.module.css'

const BookNow = () => {
  const [listData, setListData] = useState([])

  useEffect(() => {
    // Reset the list data
    // setListData([]);

    // Fetch the new list data
    const fetchData = async () => {
      try {
        const response = await fetch('https://maid-app-test.onrender.com/api/getAll/worker')
        const data = await response.json()
        console.log(data)
        console.log(data.length)
        setListData(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const [customerId, setCustomerId] = useState('')
  const [workerId, setWorkerId] = useState('')
  const [amount, setAmount] = useState('')
  const [washingAmount, setWashingAmount] = useState('')
  const [location, setLocation] = useState('')
  const [workType, setWorkType] = useState('')
  const [open, setOpen] = React.useState(false)
  const [area, setArea] = useState('')
  const [cloths, setCloths] = useState('')
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [date, setDate] = useState('')
  const [value, setValue] = useState('')
  const [workerName, setWorkerName] = useState('')
  const [workerEmail, setWorkerEmail] = useState('')
  const [workerPhone, setWorkerPhone] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')

  const handleClickOpen = (wid, name, email, phone) => {
    setWorkerName(name)
    setWorkerEmail(email)
    setWorkerPhone(phone)
    setCustomerName(localStorage.getItem('Name'))
    setCustomerEmail(localStorage.getItem('Email'))
    setCustomerPhone(localStorage.getItem('Phone'))
    setWorkerId(wid)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    window.location.reload()
  }

  const bookWorker = async event => {
    event.preventDefault()

    var totalamount = 0

    if (area == '100') {
      totalamount = 70
    } else if (area == '100-200') {
      totalamount = 120
    } else if (area == '200-400') {
      totalamount = 220
    } else if (area == '400-600') {
      totalamount = 350
    }

    if (cloths == 5) {
      totalamount = 70
    } else if (cloths == 10) {
      totalamount = 120
    } else if (cloths == 15) {
      totalamount = 160
    } else if (cloths == 25) {
      totalamount = 250
    }

    //commute charge
    totalamount = totalamount + 70

    var workDate = `${year}-${month}-${day}`

    var payload = JSON.stringify({
      worker_id: workerId,
      customer_id: localStorage.getItem('Cuuid'),
      to_location: location,
      type_of_work: workType,
      area: area,
      date: workDate,
      amount: totalamount,
      worker_email: workerEmail,
      worker_name: workerName,
      worker_phone: workerPhone,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      status: 'Pending'
    })
    console.log(payload)

    // Send the POST request
    const response = await fetch('https://maid-app-test.onrender.com/api/add/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: payload
    })

    // Handle the response
    if (response.ok) {
      window.location.reload()
    } else {
      // Error occurred, handle the error
      const error = await response.text()
      console.error('Error:', error)
    }
  }

  const dateFunction = e => {}

  return (
    <Card>
      <CardHeader title='Book Worker Now!' titleTypographyProps={{ variant: 'h6' }} />
      <TableContainer>
        {listData.length == 0 ? (
          <TableRow hover sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
            <TableCell colSpan={6}>-- No Data Found --</TableCell>
          </TableRow>
        ) : (
          listData.map((row, index) => (
            <div className={styles.wrapper} key={row.id}>
              <div className={styles.left}>
                <img
                  src='https://res.cloudinary.com/dwvd0tz4l/image/upload/v1686492028/worker_zoah8x.jpg'
                  alt='user'
                  width='100'
                />
                <h4>{row.name}</h4>
                <p>
                  {row.status == 'Booked' ? (
                    <Button disabled={true} variant='outlined' sx={{ color: 'grey' }}>
                      Already Booked
                    </Button>
                  ) : (
                    <Button
                      variant='outlined'
                      sx={{ color: 'blue' }}
                      onClick={() => handleClickOpen(row.worker_id, row.name, row.email, row.phone)}
                    >
                      Book Now
                    </Button>
                  )}
                  <Dialog
                    open={open}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby='alert-dialog-slide-description'
                  >
                    <DialogTitle>{'Book Worker Now!'}</DialogTitle>
                    <DialogContent>
                      <Card>
                        <CardContent>
                          <form onSubmit={bookWorker}>
                            <Grid container spacing={5}>
                              <Grid item xs={12} sm={12}>
                                <FormControl>
                                  <FormLabel id='demo-row-radio-buttons-group-label'>
                                    Choose the type of work:
                                  </FormLabel>
                                  <RadioGroup
                                    row
                                    aria-labelledby='demo-row-radio-buttons-group-label'
                                    name='row-radio-buttons-group'
                                    onChange={e => setWorkType(e.target.value)}
                                  >
                                    <FormControlLabel value='Cleaning' control={<Radio />} label='Cleaning' />
                                    <FormControlLabel value='Washing' control={<Radio />} label='Washing' />
                                    <FormControlLabel value='Gardening' control={<Radio />} label='Gardening' />
                                  </RadioGroup>
                                </FormControl>
                              </Grid>
                              {workType == 'Cleaning' ? (
                                <Grid item xs={12} sm={12}>
                                  <FormControl fullWidth>
                                    <InputLabel>Area:</InputLabel>
                                    <Select
                                      label='Area'
                                      defaultValue='- Select -'
                                      onChange={e => setArea(e.target.value)}
                                    >
                                      <MenuItem value='- Select -' selected disabled>
                                        - Select -
                                      </MenuItem>
                                      <MenuItem value='100'>Less than 100sq</MenuItem>
                                      <MenuItem value='100-200'>100sq - 200sq</MenuItem>
                                      <MenuItem value='200-400'>200sq - 400sq</MenuItem>
                                      <MenuItem value='400-600'>400sq - 600sq</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Grid>
                              ) : workType == 'Washing' ? (
                                <Grid item xs={12} sm={12}>
                                  <FormControl fullWidth>
                                    <InputLabel>Clothes:</InputLabel>
                                    <Select
                                      label='Clothes'
                                      defaultValue='- Select -'
                                      onChange={e => setCloths(e.target.value)}
                                    >
                                      <MenuItem value='- Select -' selected disabled>
                                        - Select -
                                      </MenuItem>
                                      <MenuItem value='5'>Less than 5</MenuItem>
                                      <MenuItem value='10'>5 - 10</MenuItem>
                                      <MenuItem value='15'>10 - 15</MenuItem>
                                      <MenuItem value='25'>15 - 25</MenuItem>
                                    </Select>
                                  </FormControl>
                                  {/* <TextField
                                    onChange={e => setCloths(e.target.value)}
                                    type='number'
                                    fullWidth
                                    label='Enter no. of cloths'
                                    placeholder='Enter no. of cloths'
                                    helperText='Enter number of cloths'
                                  /> */}
                                </Grid>
                              ) : workType == 'Gardening' ? (
                                <Grid item xs={12} sm={12}>
                                  <FormControl fullWidth>
                                    <InputLabel>Area:</InputLabel>
                                    <Select
                                      label='Area'
                                      defaultValue='- Select -'
                                      onChange={e => setArea(e.target.value)}
                                    >
                                      <MenuItem value='- Select -' selected disabled>
                                        - Select -
                                      </MenuItem>
                                      <MenuItem value='100'>Less than 100sq</MenuItem>
                                      <MenuItem value='100-200'>100sq - 200sq</MenuItem>
                                      <MenuItem value='200-400'>200sq - 400sq</MenuItem>
                                      <MenuItem value='400-600'>400sq - 600sq</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Grid>
                              ) : null}

                              {area != '' || cloths != '' ? (
                                <Grid item xs={12} sm={12}>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <InputLabel>Choose Date:</InputLabel>
                                    <DateCalendar
                                      disablePast
                                      onChange={e => {
                                        setYear(e['$y'])
                                        setMonth(e['$M'] + 1)
                                        setDay(e['$D'])
                                        console.log(date)
                                        console.log(year)
                                        console.log(month)
                                        console.log(day)
                                      }}
                                    />
                                  </LocalizationProvider>
                                </Grid>
                              ) : null}

                              {day != '' ? (
                                <Grid item xs={12} sm={12}>
                                  <FormControl fullWidth>
                                    <InputLabel>Location:</InputLabel>
                                    <Select
                                      label='Location'
                                      defaultValue='- Select -'
                                      onChange={e => setLocation(e.target.value)}
                                    >
                                      <MenuItem value='- Select -' selected disabled>
                                        - Select -
                                      </MenuItem>
                                      <MenuItem value='Nehru Nagar'>Nehru Nagar</MenuItem>
                                      <MenuItem value='Gandhi Nagar'>Gandhi Nagar</MenuItem>
                                      <MenuItem value='Shankar Nagar'>Shankar Nagar</MenuItem>
                                      <MenuItem value='Udhaygiri'>Udhaygiri</MenuItem>
                                      <MenuItem value='Halahalli'>Halahalli</MenuItem>
                                      <MenuItem value='Chamundeshwari Nagar'>Chamundeshwari Nagar</MenuItem>
                                      <MenuItem value='Kuvempu Nagar'>Kuvempu Nagar</MenuItem>
                                      <MenuItem value='VV Nagar'>VV Nagar</MenuItem>
                                      <MenuItem value='Kyathumgere'>Kyathumgere</MenuItem>
                                      <MenuItem value='Kiragandur'>Kiragandur</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Grid>
                              ) : null}

                              {cloths == 5 ? (
                                <Typography
                                  variant='secondary'
                                  style={{ paddingLeft: '1.25rem', marginTop: '1.25rem' }}
                                >
                                  {' '}
                                  Amount: ₹140{' '}
                                </Typography>
                              ) : cloths == 10 ? (
                                <Typography
                                  variant='secondary'
                                  style={{ paddingLeft: '1.25rem', marginTop: '1.25rem' }}
                                >
                                  {' '}
                                  Amount: ₹190
                                </Typography>
                              ) : cloths == 15 ? (
                                <Typography
                                  variant='secondary'
                                  style={{ paddingLeft: '1.25rem', marginTop: '1.25rem' }}
                                >
                                  {' '}
                                  Amount: ₹230
                                </Typography>
                              ) : cloths == 25 ? (
                                <Typography
                                  variant='secondary'
                                  style={{ paddingLeft: '1.25rem', marginTop: '1.25rem' }}
                                >
                                  {' '}
                                  Amount: ₹320{' '}
                                </Typography>
                              ) : null}

                              {area == '100' ? (
                                <Typography
                                  variant='secondary'
                                  style={{ paddingLeft: '1.25rem', marginTop: '1.25rem' }}
                                >
                                  {' '}
                                  Amount: ₹140{' '}
                                </Typography>
                              ) : area == '100-200' ? (
                                <Typography
                                  variant='secondary'
                                  style={{ paddingLeft: '1.25rem', marginTop: '1.25rem' }}
                                >
                                  {' '}
                                  Amount: ₹190
                                </Typography>
                              ) : area == '200-400' ? (
                                <Typography
                                  variant='secondary'
                                  style={{ paddingLeft: '1.25rem', marginTop: '1.25rem' }}
                                >
                                  {' '}
                                  Amount: ₹290
                                </Typography>
                              ) : area == '400-600' ? (
                                <Typography
                                  variant='secondary'
                                  style={{ paddingLeft: '1.25rem', marginTop: '1.25rem' }}
                                >
                                  {' '}
                                  Amount: ₹420{' '}
                                </Typography>
                              ) : null}

                              {day != '' ? (
                                <Grid item xs={12} sm={12}>
                                  <Button fullWidth type='submit' variant='contained' size='large'>
                                    Confirm & Book Now!
                                  </Button>
                                </Grid>
                              ) : null}
                            </Grid>
                          </form>
                        </CardContent>
                      </Card>
                    </DialogContent>
                  </Dialog>
                </p>
              </div>
              <div className={styles.right}>
                <div className={styles.info}>
                  <h3>Information</h3>
                  <div className={styles.infoData}>
                    <div className={styles.data}>
                      <h4>Email</h4>
                      <p>{row.email}</p>
                    </div>
                    <div className={styles.data}>
                      <h4>Phone</h4>
                      <p>{row.phone}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.projects}>
                  <h3>Work</h3>
                  <div className={styles.projectsData}>
                    <div className={styles.data}>
                      <h4>Type</h4>
                      <p>{row.type}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {/* <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead> */}
        {/* <Typography variant='body2'>
          My Bookings
        </Typography> */}
        {/* <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listData.length == 0 ? (
              <TableRow hover sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell colSpan={6}>-- No Data Found --</TableCell>
              </TableRow>
            ) : (
              listData.map((row, index) => (
                <TableRow hover key={row.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>{index + 1}</TableCell>

                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>
                    {row.status == 'Booked' ? (
                      <Button disabled={true} variant='outlined' sx={{ color: 'grey' }}>
                        Already Booked
                      </Button>
                    ) : (
                      <Button variant='outlined' sx={{ color: 'blue' }} onClick={() => handleClickOpen(row.worker_id)}>
                        Book Now
                      </Button>
                    )}
                    <Dialog
                      open={open}
                      keepMounted
                      onClose={handleClose}
                      aria-describedby='alert-dialog-slide-description'
                    >
                      <DialogTitle>{'Book Worker Now!'}</DialogTitle>
                      <DialogContent>
                        <Card>
                          <CardContent>
                            <form onSubmit={bookWorker}>
                              <Grid container spacing={5}>
                                <Grid item xs={12} sm={12}>
                                  <FormControl>
                                    <FormLabel id='demo-row-radio-buttons-group-label'>
                                      Choose the type of work:
                                    </FormLabel>
                                    <RadioGroup
                                      row
                                      aria-labelledby='demo-row-radio-buttons-group-label'
                                      name='row-radio-buttons-group'
                                      onChange={e => setWorkType(e.target.value)}
                                    >
                                      <FormControlLabel value='Cleaning' control={<Radio />} label='Cleaning' />
                                      <FormControlLabel value='Washing' control={<Radio />} label='Washing' />
                                    </RadioGroup>
                                  </FormControl>
                                </Grid>
                                {workType == 'Cleaning' ? (
                                  <Grid item xs={12} sm={12}>
                                    <FormControl fullWidth>
                                      <InputLabel>Area:</InputLabel>
                                      <Select
                                        label='Area'
                                        defaultValue='- Select -'
                                        onChange={e => setArea(e.target.value)}
                                      >
                                        <MenuItem value='- Select -' selected disabled>
                                          - Select -
                                        </MenuItem>
                                        <MenuItem value='100'>Less than 100sq</MenuItem>
                                        <MenuItem value='100-200'>100sq - 200sq</MenuItem>
                                        <MenuItem value='200-400'>200sq - 400sq</MenuItem>
                                        <MenuItem value='400-600'>400sq - 600sq</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                ) : workType == 'Washing' ? (
                                  <Grid item xs={12} sm={12}>
                                    <TextField
                                      onChange={e => setCloths(e.target.value)}
                                      type='number'
                                      fullWidth
                                      label='Enter no. of cloths'
                                      placeholder='Enter no. of cloths'
                                      helperText='Enter number of cloths'
                                    />
                                  </Grid>
                                ) : null}

                                {area != '' || cloths != '' ? (
                                  <Grid item xs={12} sm={12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <InputLabel>Choose Date:</InputLabel>
                                      <DateCalendar
                                        disablePast
                                        onChange={e => {
                                          setYear(e['$y'])
                                          setMonth(e['$M'])
                                          setDay(e['$D'])
                                        }}
                                      />
                                    </LocalizationProvider>
                                  </Grid>
                                ) : null}

                                {cloths == 1 ? (
                                  <Typography variant='secondary'> Amount: ₹50 </Typography>
                                ) : cloths == 2 ? (
                                  <Typography variant='secondary'> Amount: ₹100</Typography>
                                ) : cloths == 3 ? (
                                  <Typography variant='secondary'> Amount: ₹150</Typography>
                                ) : cloths == 4 ? (
                                  <Typography variant='secondary'> Amount: ₹200 </Typography>
                                ) : null}

                                {area == '100' ? (
                                  <Typography variant='secondary'> Amount: ₹50 </Typography>
                                ) : area == '100-200' ? (
                                  <Typography variant='secondary'> Amount: ₹100</Typography>
                                ) : area == '200-400' ? (
                                  <Typography variant='secondary'> Amount: ₹150</Typography>
                                ) : area == '400-600' ? (
                                  <Typography variant='secondary'> Amount: ₹200 </Typography>
                                ) : null}

                                {day != '' ? (
                                  <Grid item xs={12} sm={12}>
                                    <FormControl fullWidth>
                                      <InputLabel>Location:</InputLabel>
                                      <Select
                                        label='Location'
                                        defaultValue='- Select -'
                                        onChange={e => setLocation(e.target.value)}
                                      >
                                        <MenuItem value='- Select -' selected disabled>
                                          - Select -
                                        </MenuItem>
                                        <MenuItem value='Gokulam'>Gokulam</MenuItem>
                                        <MenuItem value='Vidyanagar'>Vidyanagar</MenuItem>
                                        <MenuItem value='Gandhi Nagar'>Gandhi Nagar</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                ) : null}

                                {day != '' ? (
                                  <Grid item xs={12} sm={12}>
                                    <Button fullWidth type='submit' variant='contained' size='large'>
                                      Confirm & Book Now!
                                    </Button>
                                  </Grid>
                                ) : null}
                              </Grid>
                            </form>
                          </CardContent>
                        </Card>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table> */}
      </TableContainer>
    </Card>
  )
}

export default BookNow
