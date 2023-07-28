
import { Avatar, Box, Button, Card, Typography } from '@mui/material'
import React from 'react'

function paymentFailled() {
  return (
    <Box sx={{padding:"50px",display:"flex",justifyContent:"center"}}>
    <Card sx={{width:"500px",display:"flex",flexDirection:"column",alignItems:"center",padding:"20px"}}>
<Typography>Your Payment is Failed</Typography>
<Avatar src='https://cdn-icons-png.flaticon.com/128/7972/7972465.png' sx={{height:"150px",width:"150px"}}/>
<Button variant="contained">Continue shopping</Button>
    </Card>
  </Box>
  )
}

export default paymentFailled
