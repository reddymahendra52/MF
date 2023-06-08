// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'

import React, { useState, useEffect } from 'react';

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

  const [userName, setUserName] = useState("");
  const [userUUID, setUserUUID] = useState("");

  // Check if the user is authenticated on page load
  useEffect(() => {
    const cuuid = "";
    const cname = "";
    cuuid = localStorage.getItem('Cuuid');
    cname = localStorage.getItem('Name');
    console.log("Cuuid : " + cuuid);
    console.log("Name : " + cname);
    setUserName(cname);
    setUserUUID(cuuid);
    if (cuuid != null || cuuid != '') {
      console.log('Logged In UUID : ' + cuuid);
    } else {
      console.log('Invalid token');
      window.location.href = '/pages/login';
    }
  }, []);

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
        </Grid>
      </Grid>
      
      {/* <Grid container spacing={6}>
        <Grid item xs={4} md={4}>
        <Card sx={{ position: 'relative' }}>
          <CardContent>
            <Button size='small' variant='contained'>
              View Profile
            </Button>
          </CardContent>
        </Card>
        </Grid>
      </Grid> */}
    </ApexChartWrapper>
  )
}

export default Dashboard
