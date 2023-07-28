import { Star } from '@mui/icons-material'
import { Avatar, Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'

export default function Card1() {
  return (
    <Box>
      <Grid container columnSpacing={4} rowSpacing={3}>
<Grid item md={4} sm={6} xs={12} >
<Card sx={{maxWidth:"100%",boxShadow:"none",borderRadius:"20px","&:hover":{
  boxShadow: "0px 12px 28px 0px rgba(140, 149, 159, 0.3)"
}}}>
   <Box sx={{position:"relative",padding:"10px"}}>
<Avatar src="https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=600" sx={{width:"100%",height:"250px",borderRadius:"20px"}}/>
<Typography sx={{position:"absolute",bottom:"20px",left:"10px",padding:"2px 5px",backgroundColor:"#256FEF",color:"#fff",borderRadius:"5px",}}>Free Medium Fries</Typography>
<Typography sx={{position:"absolute",bottom:"60px",left:"10px",padding:"2px 5px",backgroundColor:"red",color:"#fff",borderRadius:"5px",}}>Free Medium Fries</Typography>
<Typography sx={{position:"absolute",bottom:"20px",right:"20px",padding:"2px 5px",backgroundColor:"#cccccc",color:"#fff",borderRadius:"5px",}}>24min</Typography>
   </Box>
   <CardContent >
    <Box sx={{display:"flex",justifyContent:"space-between",borderBottom:"1px solid #cccccc",paddingBottom:"10px"}}>
    <Box>
        <Typography sx={{fontSize:"20px",fontWeight:"600",}}>McDonald's</Typography>
        <Typography sx={{color:"#cccccc"}}>Burger, Fast Food, Bevera...</Typography>
    </Box>
    <Box sx={{display:"flex",alignItems:"flex-end",flexDirection:"column"}}>
        <Box sx={{padding:"1px 5px",backgroundColor:"green",color:"white",borderRadius:"5px",fontWeight:"600",width:"45px",display:"flex",alignItems:"center"}}>
            <Typography>3.0</Typography>
         <Star sx={{fontSize:"12px"}}/> </Box>
        <Typography sx={{color:"#cccccc"}}> ₹ 150 for one</Typography>
    </Box>
    </Box>
    <Box sx={{display:"flex",justifyContent:"space-between",paddingTop:"10px",alignItems:"center"}}>
<Typography sx={{fontSize:"12px",color:"#cccccc"}}>2700 + order placed from here</Typography>
<Avatar src="https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png" sx={{width:"40px",height:"20px",borderRadius:"5px"}}/>
    </Box>
   </CardContent>
</Card>
</Grid>
      </Grid>
    </Box>
  )
}
