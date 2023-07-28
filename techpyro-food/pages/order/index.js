import {  getOrder, orderList } from '@/src/redux/slices/order'
import { CheckBox, Search } from '@mui/icons-material'
import { Avatar, Box, Button, Card, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function index() {

//redux setup

const dispatch = useDispatch()

const fetchOrder = async()=>{
    const res = await dispatch(orderList());
}


const {orders}=useSelector((state)=>state.order)
// console.log(orders);
useEffect(()=>{
fetchOrder()
},[])




  return (
    <Box sx={{display:"flex",padding:'50px',gap:"40px"}}>
      <Box sx={{flex:"1"}}>
      
<Card sx={{}}>
    <Box sx={{paddingBottom:"10px",borderBottom:"1px solid #DADADB",display:"flex",justifyContent:"space-between",padding:"20px"}}>
<Typography sx={{fontWeight:"600",}}>Filters</Typography>
<Typography color="powderblue">clear all</Typography>
    </Box>
    <Box sx={{padding:"20px"}}>
    <Box sx={{paddingY:"5px"}}>
    <Typography sx={{fontWeight:"500"}}>ORDER STATUS</Typography>
</Box>
    <Box sx={{display:"flex",alignItems:'center',gap:"20px",paddingY:"5px"}}>
    <CheckBox/>
    <Typography>On the way</Typography>
</Box>
    <Box sx={{display:"flex",alignItems:'center',gap:"20px",paddingY:"5px"}}>
    <CheckBox/>
    <Typography>Delivered</Typography>
</Box>
    <Box sx={{display:"flex",alignItems:'center',gap:"20px",paddingY:"5px"}}>
    <CheckBox/>
    <Typography>Cancelled</Typography>
</Box>
    <Box sx={{display:"flex",alignItems:'center',gap:"20px",paddingY:"5px"}}>
    <CheckBox/>
    <Typography>Returned</Typography>
</Box>
    </Box>

</Card>


      </Box>
      <Box sx={{flex:"3"}}>
      
<Card sx={{boxShadow:"none"}}>
    <Box sx={{display:"flex",alignItems:"center",height:"55px"}}>
        <TextField 
        placeholder='Search your order here'
        sx={{width:"70%","&:inputProps":{
            height:"100%"
        }}}
       
        />
        <Box sx={{backgroundColor:"blue",display:"flex",alignItems:"center",height:'100%',color:"#fff",padding:"10px",borderRadius:"5px"}}>
            <Search/>
            <Typography>Search your order here</Typography>
        </Box>
    </Box>
    {
        orders && orders.map((item)=>(
          item&&item.products&&item.products.map((data)=>(
          
   <Link href={`orderdetail/${item.id}`} style={{textDecoration:"none"}}> <Card sx={{padding:"20px",display:"flex",justifyContent:"space-between",marginY:"10px"}}>
        <Box sx={{display:"flex",gap:"20px",alignItems:"center"}}>
        <Avatar src={data&&data.productId&&data.productId.image&&data.productId.image} sx={{height:"80px",width:"90px",borderRadius:"10px"}}/>
        <Typography>product name</Typography>
        </Box>
        <Box>
            <Typography sx={{fontWeight:"500"}}>Delivered date</Typography>
            <Typography>Your item is sucessfully ordered</Typography>
        </Box>
    </Card></Link>
    ))
    ))
    }
</Card>

      </Box>
    </Box>
  )
}

export default index
