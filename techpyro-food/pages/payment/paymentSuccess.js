import { createOrder, getOrder, orderList, orderLists, updateOrder } from '@/src/redux/slices/order'
import { Avatar, Box, Button, Card, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function paymentSuccess() {
  const router = useRouter()
  const dispatch = useDispatch()
  const paymentId= router.query.payment_id
  // console.log(id);
  const {carts} = useSelector((state)=>state.cart)
  const {user} = useSelector((state)=>state.auth)
  const {orders} = useSelector((state)=> state.order)
console.log(orders&& orders);
  // const [queries,setQueries]=useState()
  // console.log(user.id,paymentId)
const fetchOrder=()=>{
  dispatch(orderList())
}


// -->Total prices
let cost = 0;

// for(let order of orders){
//   for(let product of order.products){
      
//        cost += (product.productId.price.mrp)
//   }
  
// }
console.log(orders[0])
orders&&orders[0]&&orders[0].products.map((item)=>{
           cost += (item?.productId?.price?.cost)
          })
          
          console.log(cost);
// let gst = ((cost)*(0.08))
// let totalPrice = ((cost)+(gst))
// console.log(totalPrice)


  // useeffect
const currentUser =user.address;
let orderData;
const checkOrder = async()=>{
  // console.log(user.id , id)
  const queries = {"$and": [{ "userId": user && user.id }, { "paymentId":  paymentId}]}
  orderData = await orderLists(queries)
  // console.log(orderData);
  if(orderData&&orderData.data&&orderData?.data?.status==='RECORD_NOT_FOUND'&&orderData?.data?.data === null){
    try {
      let data = {
        "paymentId": `${paymentId}`,
        products:[]
        
      }

      orders && orders.length>0 && orders[0]?.products.map((item)=>{
        data.products.push({
         "productId": `${item?.productId}`,
         "qty": `${item.qty}`,
       "orderStatus": {
         "orderConfirm": {
           "isConfirmed": true,
           "date": new Date()
         },
         "shipped": {
           "isConfirmed": false,
         },
         "outForDelivery": {
           "isConfirmed": false,
         },
         "delivered": {
           "isConfirmed": false,
         },
         "cancel": {
           "isConfirmed": false,
         },
         "refunded": {
           "isConfirmed": false,
         }
       }
   })
 })
console.log(data)
console.log(orders && orders.length> 0 && orders[0].id);
let update = await dispatch(updateOrder(data ,orders && orders.length> 0 && orders[0].id))
console.log(update);
      } catch (error) {
      console.log(error);
      }
      }

    }
// console.log(currentUser);
  useEffect(()=>{
    fetchOrder()
    checkOrder()
  },[user.id,paymentId])
   
  
  return (
    <Box sx={{padding:"50px",display:"flex",justifyContent:"center"}}>
      <Card sx={{width:"500px",display:"flex",flexDirection:"column",alignItems:"center",padding:"20px"}}>
<Typography>Your Payment is Successfull</Typography>
<Avatar src='https://image.shutterstock.com/image-vector/green-check-mark-icon-vector-260nw-1685403826.jpg' sx={{height:"150px",width:"150px"}}/>
<Link href={"/"}><Button variant="contained">Continue shopping</Button></Link>
      </Card>
    </Box>
  )
}

export default paymentSuccess
