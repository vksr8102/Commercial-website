import React from 'react'
import { Avatar, Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import Skeleton from '@mui/material/Skeleton';

const data =[1,2,3,4,5,6]
export default function Restaurants() {
  return (
   
       <Box sx={{padding:"40px 58px"}}>
      <Grid container columnSpacing={4} rowSpacing={3}>
        {data && data.length>0 && data.map((item)=>(
         <Grid item md={4} sm={6} xs={12}  key={item.id}>
         <Card sx={{maxWidth:"100%",boxShadow:"none",borderRadius:"20px","&:hover":{
           boxShadow: "0px 12px 28px 0px rgba(140, 149, 159, 0.3)"
         }}}>
            <Box sx={{position:"relative",padding:"10px"}}>
            <Skeleton animation="wave" variant="rectangular" sx={{width:"100%",height:"250px"}} />
           
            </Box>
            <CardContent >
             <Box sx={{display:"flex",justifyContent:"space-between",borderBottom:"1px solid #cccccc",paddingBottom:"10px"}}>
             <Box>
             <Skeleton width={110} animation="wave" />
             <Skeleton width={40} animation="wave" />
             </Box>
             <Box sx={{display:"flex",alignItems:"flex-end",flexDirection:"column"}}>
                 <Box sx={{padding:"1px 5px",borderRadius:"5px",fontWeight:"600",width:"45px",display:"flex",alignItems:"center"}}>
                 <Skeleton width={40} animation="wave" />
                  
                   </Box>
                  <Skeleton animation="wave" />
             </Box>
             </Box>
             <Box sx={{display:"flex",justifyContent:"space-between",paddingTop:"10px",alignItems:"center"}}>
             <Skeleton width={110} animation="wave" />
             <Skeleton animation="wave" variant="rectangular" sx={{width:"40px",height:"20px"}} />
             </Box>
            </CardContent>
         </Card>
         </Grid>
        
))}
      </Grid>
    </Box>
  
  )
}
