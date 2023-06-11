// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import '@coreui/coreui/dist/css/coreui.min.css'

import { CCallout } from '@coreui/react'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'

import React, { useState, useEffect } from 'react'
import { TableContainer, CardHeader } from '@mui/material'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

const Dashboard = () => {
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  const [userName, setUserName] = useState('')
  const [userUUID, setUserUUID] = useState('')

  // Check if the user is authenticated on page load
  useEffect(() => {
    const cuuid = ''
    const cname = ''
    cuuid = localStorage.getItem('Cuuid')
    cname = localStorage.getItem('Name')
    console.log('Cuuid : ' + cuuid)
    console.log('Name : ' + cname)
    setUserName(cname)
    setUserUUID(cuuid)
    if (cuuid != null || cuuid != '') {
      console.log('Logged In UUID : ' + cuuid)
    } else {
      console.log('Invalid token')
      window.location.href = '/pages/login'
    }
  }, [])

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography variant='h6'>Hello {userName}, 🥳</Typography>
              <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
                Welcome to your customer dashboard
              </Typography>
              <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
              <TrophyImg alt='trophy' src='/images/misc/trophy.png' />
            </CardContent>
          </Card>
          <Card style={{ marginTop: '15px' }}>
            <CardHeader title='Process Flow' titleTypographyProps={{ variant: 'h3' }} />
            <TableContainer>
              <CCallout
                color='primary'
                style={{ width: '80%', margin: '0 auto', marginBottom: '10px', textAlign: 'justify' }}
              >
                <h5>Choose Your Maid</h5>
                Browse through the list of experienced and reliable maids displayed on your personalized dashboard. Each
                maid is carefully selected and vetted to meet our stringent standards.
              </CCallout>
              <CCallout
                color='primary'
                style={{ width: '80%', margin: '0 auto', marginBottom: '10px', textAlign: 'justify' }}
              >
                <h5>Create a Booking</h5>
                Once you've found the perfect maid, create a booking directly from the app. Select the desired date and
                time for the maid's visit, ensuring it fits your schedule seamlessly.
              </CCallout>
              <CCallout
                color='primary'
                style={{ width: '80%', margin: '0 auto', marginBottom: '10px', textAlign: 'justify' }}
              >
                <h5>Confirm and Make an Advance Payment</h5>
                Upon submitting your booking request, the chosen maid will receive a notification. If the maid accepts
                the booking, you'll be notified, and we'll request an advance payment of 100 rupees to secure the
                booking.
              </CCallout>
              <CCallout
                color='primary'
                style={{ width: '80%', margin: '0 auto', marginBottom: '10px', textAlign: 'justify' }}
              >
                <h5>Enjoy the Service and Rate the Worker</h5>
                Sit back and relax while your maid takes care of the cleaning tasks. Once the job is completed to your
                satisfaction, make the remaining payment directly to the maid.
              </CCallout>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
