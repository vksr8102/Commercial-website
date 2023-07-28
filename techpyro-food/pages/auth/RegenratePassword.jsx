import { Box, Button, Card, Grid, TextField, Typography } from '@mui/material'
import React from 'react'

function RegenratePassword() {
  return (
    <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh"}}>
    <Card sx={{padding:"10px",maxWidth:"100%",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",height:"60vh",position:"relative"}}>
<Grid
            container
            spacing={3}
            sx={{
              "& .MuiInputoutlined-input": {
                // marginBottom:"70px",
                fontSize: "20px",
                paddingLeft: "30px",
              },
            }}
          >
            <Grid xs={12} item>
              <Typography sx={{display:"flex",justifyContent:"center",paddingY:"10px",color:"#08487C",fontSize:{md:"25px",sm:"20px",xs:"18px"}}}>Forget Password</Typography>
              <TextField
                type="password"
                name="email"
                placeholder="Enter Your new password"
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                type="pasword"
                name="email"
                placeholder="Conform new password"
                variant="outlined"
                fullWidth
                required
                sx={{marginY:"10px"}}
              />
              <Box sx={{paddingY:"10px"}}>
             <Button fullWidth variant='contained' >Continue</Button>
              </Box>
            </Grid>
            </Grid>
    </Card>
    </Box>
  )
}

export default RegenratePassword
