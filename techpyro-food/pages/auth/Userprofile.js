import Profile from '@/src/components/profile/Profile'
import { getUser } from '@/src/redux/slices/auth'
import { Edit } from '@mui/icons-material'
import {  Avatar, Box, Dialog, Typography, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const StyleToolbar = styled(Box)(({ theme }) =>({
margin:"50px 60px",
[theme.breakpoints.down("md")]:{
marginTop:"150px",
marginLeft:"0px",
marginRight:"0px"
}
}))
function Userprofile() {
    
const [open, setOpen] = useState(false)
// console.log(value.user);
const handleOpen = ()=>{
    setOpen(true)
}
const value = useSelector((state)=>state.auth)
  return (
    <StyleToolbar>
        <Dialog open={open}  sx={{scrollbarWidth:"0px"}}>
            <Profile setOpen={setOpen}/>
        </Dialog>
        <Box sx={{display:"flex",
justifyContent:"space-between",background:`url("https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg?size=626&ext=jpg&ga=GA1.2.2042454013.1682690444&semt=sph") no-repeat   `,alignItems:"center",
padding:"20px",width:"100%",backgroundSize:"100%",flexDirection:{md:"row",sm:"column",xs:"column"},}}>
      <Box sx={{display:"flex",gap:"10px",alignItems:"center",}}>
<Avatar src='hhh' alt={value && value.user && value.user.name} sx={{height:{md:"180px",sm:'150px',xs:"80px"},width:{md:"180px",sm:'150px',xs:"80px"},backgroundColor:"Highlight",border:"4px solid #FFFFFF",fontSize:"50px"}}/>
<Typography sx={{fontSize:{md:"20px",sm:"18px",xs:"14px"},color:"#fff"}}>{value && value.user && value.user.name}</Typography>
      </Box>
    <Box sx={{display:"flex",flexDirection:"column",alignItems:"flex-end"}}>
        <Typography sx={{padding:"5px",backgroundColor:"red",color:"#fff",borderRadius:"5px",width:"120px",marginY:"10px" ,cursor:"pointer"}} onClick={handleOpen}>
  <Edit/>  Edit Profile
        </Typography>
        <Box sx={{display:"flex",alignItems:"center",gap:"20px"}}>
            <Box sx={{textAlign:"center",color:"#fff",borderRight:"1px solid #fff",paddingRight:"10px"}}>
                <Typography sx={{fontSize:{md:"24px",sm:"20px",xs:"18px"},fontWeight:"600",}}>0</Typography>
                <Typography>Reviews</Typography>
            </Box>
            <Box sx={{textAlign:"center",color:"#fff",borderRight:"1px solid #fff",paddingRight:"10px"}}>
                <Typography sx={{fontSize:{md:"24px",sm:"20px",xs:"18px"},fontWeight:"600",}}>0</Typography>
                <Typography>Reviews</Typography>
            </Box>
            <Box sx={{textAlign:"center",color:"#fff",}}>
                <Typography sx={{fontSize:{md:"24px",sm:"20px",xs:"18px"},fontWeight:"600",}}>0</Typography>
                <Typography>Reviews</Typography>
            </Box>
        </Box>
    </Box>
    </Box>
    <Box sx={{display:"flex",justifyContent:"center",width:"100%"}}>
<Box sx={{background:`url("https://img.freepik.com/free-photo/blue-smooth-wall-textured-background_53876-106133.jpg?size=626&ext=jpg&ga=GA1.1.2042454013.1682690444&semt=ais") no-repeat`,padding:"20px",marginTop:'40px',color:"#fff",backgroundPosition:"center",width:{md:"60%",sm:"80%",xs:"100%"},backgroundSize:"100%",borderRadius:'20px',textAlign:"center",justifyContent:"center"}}>
<Box sx={{display:"flex",justifyContent:"center",paddingY:'10px',flexDirection:"column",alignItems:"center"}}>
    <Box sx={{display:"flex",justifyContent:"flex-start",gap:"30px"}}>
<Typography>Name</Typography>
<Typography>{value && value.user && value.user.name}</Typography>
</Box>
</Box>
<Box sx={{display:"flex",justifyContent:"center",paddingY:'10px',flexDirection:"column",alignItems:"center"}}>
    <Box sx={{display:"flex",justifyContent:"flex-start",gap:"30px"}}>
<Typography>email :</Typography>
<Typography>{value && value.user && value.user.email}</Typography>
</Box>
</Box>
</Box>
</Box>
    </StyleToolbar>
  )
}

export default Userprofile
