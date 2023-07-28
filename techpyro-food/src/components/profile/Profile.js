import { updateUser } from '@/src/redux/slices/auth'
import { Clear, Grid3x3Outlined, Mic,  SearchSharp } from '@mui/icons-material'
import { Avatar, Box, Button, Card, Grid, TextField, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const Searchbar = styled(Box)(({theme})=>({
  backgroundColor:"#fff",
  position:'relative',
  width:"100%",
  display:"flex",
  alignItems:"center",
  [theme.breakpoints.down("sm")]:{
      width:"100vw"
  }
}))
const Search = styled("input")(({theme})=>({
  backgroundColor:"#fff",
  height:"50px",
  width:"100vw",
  padding:"20px 40px",
  border:"1px solid #212121",
  borderRadius:"10px",
  // position:"relative",
  [theme.breakpoints.down("sm")]:{
      width:"90vw"
  }
}))
function Profile({setOpen}) {
  const dispatch = useDispatch()
  const value = useSelector((state)=>state.auth)
  console.log(value.user);
  const handleClose =()=>{
    setOpen(false)
  }
  const [userData, setUserData] = useState({
    name:value && value.user && value.user.name ,
    email:value && value.user && value.user.email 
  })

  const handleChangeUserValue = (e)=>{
    setUserData({...userData,[e.target.name]:e.target.value});
  }

  const handleUpdate =async()=>{

  const res = await dispatch(updateUser(userData,value.user.id))
  console.log(res) 
  }

  return (
    <Box sx={{padding:"20px",maxWidth:'750px'}}>
      <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <Typography sx={{fontSize:"30px",fontWeight:"600"}}>Edit Profile</Typography>
      <Clear  onClick={handleClose} sx={{cursor:"pointer"}}/>
      </Box>
      <Box sx={{display:"flex",
justifyContent:"space-between",background:`url("https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg?size=626&ext=jpg&ga=GA1.2.2042454013.1682690444&semt=sph") no-repeat   `,alignItems:"center",
padding:"20px",width:"100%",backgroundSize:"100%",flexDirection:{md:"row",sm:"column",xs:"column"},height:"300px"}}>
      <Box sx={{display:"flex",gap:"10px",alignItems:"center",}}>
<Avatar src='djjd' alt={value && value.user && value.user.name } sx={{height:{md:"180px",sm:'150px',xs:"80px"},width:{md:"180px",sm:'150px',xs:"80px"},backgroundColor:"Highlight",border:"4px solid #FFFFFF",fontSize:"50px"}}/>
      </Box>
      
    </Box>
    <Card sx={{padding:"30px",boxShadow:"none"}}>
    <Grid
              container
              spacing={3}
              sx={{
                "& .MuiInputoutlined-input": {
                  // marginBottom:"70px",
                  fontSize: "40px",
                  paddingLeft: "30px",
                },
                padding:"40px"
              }}
            >

              <Grid xs={12} item>
                <TextField
                  type="text"
                  name="name"
                  onChange={(e,value)=> handleChangeUserValue(e,'name')}
                  value={userData.name}
                  label="Full Name"
                  variant="outlined"
                  placeholder=''
                  fullWidth
                />
               
              </Grid>
              <Grid xs={12} item>
                <TextField
                  type="text"
                  name="name"
                  label="Phone number"
                  variant="outlined"
                  placeholder='full name'
                  fullWidth
                />
               
              </Grid>
              <Grid xs={12} item  sx={{position:"relative"}}>
                <TextField
                  type="text"
                  name="email"
                  onChange={(e,value)=> handleChangeUserValue(e,'email')}
                  value={userData.email}
                  label="Email"
                  variant="outlined"
                  placeholder='Email'
                  fullWidth
                  sx={{position:"relative"}}
                   />
               <Typography sx={{position:"absolute",right:"40px",bottom:"10px",fontSize:"20px",color:"red",}}> Change</Typography>
              </Grid>
              <Grid xs={12} item>
              <Searchbar >
        <SearchSharp sx={{position:"absolute",left:"30px",color:"red",fontSize:"25px",margin:"20px -20px",}} />
      <Search placeholder='search anythings.....'/>
    </Searchbar>
              </Grid>
              <Grid xs={12} item  >
                <TextField
                  type="text"
                  name="name"
                  label="Description"
                  variant="outlined"
                  placeholder='full name'
                  fullWidth
                  sx={{position:"relative"}}
                   />
                   <Typography sx={{fontSize:"10px"}}>Tell us something about yourself (150 characters remaining)</Typography>
              </Grid>
              <Grid xs={12} item  >
                <TextField
                  type="text"
                  name="name"
                  label="Handle"
                  variant="outlined"
                  placeholder='full name'
                  fullWidth
                   />
                   <Typography sx={{fontSize:"10px"}}>You can only change your handle once
</Typography>
              </Grid>
              <Grid xs={12} item  >
                <TextField
                  type="text"
                  name="name"
                  label="Website"
                  variant="outlined"
                  placeholder='full name'
                  fullWidth
                   />
              </Grid>
<Grid xs={12} item sx={{display:'flex',gap:"40px"}}>
<Box>
  <Button sx={{padding:"8px 20px",border:"1px solid red",color:"red","&:hover":{
    backgroundColor:"#d19292"
  }}} onClick={handleClose}>cancle</Button>
</Box>
<Box>
  <Button sx={{padding:"8px 20px",border:"1px solid red",color:"#fff",backgroundColor:"red","&:hover":{
    backgroundColor:"red"
  }}} onClick={handleUpdate} >update</Button>
</Box>
</Grid>
</Grid>
    </Card>
    </Box>
  )
}

export default Profile
