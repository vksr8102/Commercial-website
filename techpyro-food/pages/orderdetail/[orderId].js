import { Avatar, Box, Card, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { useRouter } from 'next/router'


import React from 'react'
import { useSelector } from 'react-redux'
const steps = [
  'Order Confirmed',
  'Shipped',
  'Out For Delivery',
  'Delivered',
];

function OrderId() {
    
const router = useRouter()
// fetting redux state
    const {orders}=useSelector((state)=>state.order)
    const {user} = useSelector((state)=>state.auth)
    console.log(orders);
    const productid = router.query.orderId
    console.log(productid);
const orderData = orders&&orders.filter((item)=>{
    return item.id ===productid
})
console.log(orderData);
  return (
    <Box sx={{padding:{md:"50px",sm:"20px",xs:"20px"}}}>
      <Card sx={{padding:"20px"}}>
        <Typography sx={{fontWeight:"600",fontSize:"16px",}}>Delivery Address</Typography>
        <Typography sx={{fontWeight:"600",paddingY:"10px"}}>{user&& user.name&&user.name}</Typography>
        <Typography sx={{}}>{orderData[0]&&orderData[0].address&&orderData[0].address.locality}</Typography>
        <Typography sx={{}}> {orderData[0]&&orderData[0].address&&orderData[0].address.city} Distric - {orderData[0]&&orderData[0].address&&orderData[0].address.zipcode},{orderData[0]&&orderData[0].address&&orderData[0].address.state}</Typography>
        <Box sx={{paddingY:"10px",display:"flex",alignItems:"center"}}>
        <Typography sx={{fontWeight:"600"}}>Mobile Number:</Typography>
        <Typography >+91 999999999</Typography>
        </Box>
      </Card>
      <Card sx={{marginY:"20px",padding:"20px"}}>
<Box>
    <Box sx={{display:"flex",gap:'20px',alignItems:"center"}}>
        <Avatar src={orderData[0]&&orderData[0].products[0]&&orderData[0].products[0].productId&&orderData[0].products[0].productId.image} sx={{height:'70px',width:"100px",borderRadius:"0px"}}/>
        <Box>
        <Typography sx={{fontSize:"16px",fontWeight:"600",paddingY:"5px"}}>{orderData[0]&&orderData[0].products[0]&&orderData[0].products[0].productId&&orderData[0].products[0].productId.subCategory}</Typography>
        <Typography sx={{}}>seller: {orderData[0]&&orderData[0].products[0]&&orderData[0].products[0].productId&&orderData[0].products[0].productId.title&&orderData[0].products[0].productId.title.shortTitle}</Typography>
        <Typography sx={{fontSize:"16px",fontWeight:"600",paddingY:"5px"}}>₹ {orderData[0]&&orderData[0].products[0]&&orderData[0].products[0].productId&&orderData[0].products[0].productId.price&&orderData[0].products[0].productId.price.mrp}</Typography>
        </Box>
    <Box sx={{ width: '50%' }}>
      <Stepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
        </Box>
</Box>
      </Card>
    </Box>
  )
}

export default OrderId
