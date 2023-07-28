import { validateOtp } from '@/src/redux/slices/auth'
import { Box, Button, Card, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import OTPInput from 'react-otp-input'
import { useDispatch } from 'react-redux'

function Otp({setRegenrateOpen,setOtpOpen}) {
  const [otp, setOtp] = useState('');
  const [newPassword,setNewPassword]=useState("")

const dispatch = useDispatch()
    //function for open resetPassword
    const handleOpen = ()=>{
        const data ={
            otp:otp,
            newPassword:newPassword
        }
dispatch(validateOtp(data))
        setRegenrateOpen(true)
        setOtpOpen(false)
    }

   
  return (
    <Box sx={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",backgroundColor:"#F6F7F6",border:"1px solid #000",padding:"30px"}}>
      <Typography>Enter your verification code</Typography>
      <br/>
      <OTPInput
      value={otp}
      onChange={setOtp}
      numInputs={6}
      renderSeparator={<Box sx={{margin:"10px"}}></Box>}
      renderInput={(props) => <input {...props} style={{height:"30px",width:"30px"}}/>}
    />
    <br/>
<TextField
                type="password"
                name="password"
                value={newPassword}
                onChange={setNewPassword}
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
    <Box sx={{display:"flex",justifyContent:"space-evenly",gap:"20px",padding:"20px 0px"}}>
<Box>
    <Button variant="contained" color='primary' sx={{padding:"4px",fontSize:"14px",textTransform:"capitalize"}} onClick={handleOpen}>verify otp</Button>
</Box>
<Box>
    <Button variant="contained" color='primary' sx={{padding:"4px",fontSize:"14px",textTransform:"capitalize"}}>Resend Code</Button>
</Box>
    </Box>
      </Box>
        </Box>
  )
            
}

export default Otp
