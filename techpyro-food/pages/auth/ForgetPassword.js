import { resetPasswordOtp } from '@/src/redux/slices/auth'
import { Close } from '@mui/icons-material'
import { Box, Button, Card, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'



function ForgetPassword({setOpen,setOtpOpen}) {
const dispatch = useDispatch()
    const [email,setEmail] =useState("")


    const handleClose =()=>{
        setOpen(false)
    }

    const handleChange =(e,value)=>{
        setEmail(e.target.value)
    }
    //OTP dialog open function
const otpDialog = ()=>{
    const data ={
        email:email
    }
dispatch(resetPasswordOtp(data))
    setOtpOpen(true)
    setOpen(false)
    alert("successfully send Otp on your email")
  }
  return (
    <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh"}}>
      <Card sx={{padding:"10px",maxWidth:"100%",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",height:"60vh",position:"relative"}}>
        <Box sx={{position:"absolute",top:"10px",right:"10px",height:"20px",width:"20px",borderRadius:"50%",border:"1px solid gray",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"red",cursor:"pointer"}}>
        <Close fontSize='small' sx={{color:"#fff"}} onClick={handleClose}/>
        </Box>
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
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter your Email id"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={handleChange}
                />
                <Box sx={{paddingY:"10px"}}>
               <Button fullWidth variant='contained' onClick={otpDialog}>Continue</Button>
                </Box>
              </Grid>
              </Grid>
      </Card>
      </Box>
  )
}

export default ForgetPassword
