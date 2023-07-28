import { logInSchema } from '@/schema'
import { cartList, deleteCart, updateCart } from '@/src/redux/slices/cart'
import { Add,  Remove, ShoppingCart } from '@mui/icons-material'
import { Avatar, Box, Button, Card, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
function Cart( ) {
const [update,setUpdate] = useState(false)
const router = useRouter()
  // access data from redux
   const {carts} = useSelector((state)=>state.cart)
   // redux store dispatch
  const dispatch = useDispatch()
  const getCart =async()=>{
    const res = await dispatch(cartList())
    console.log(res);
  }
  useEffect(() => {
    getCart()
    console.log(update)
  }, [update])
   let cartLength = carts.length

// calculate subtotal
 let subTotal = 0;
  for (let i=0;i<carts.length;i++){
    let ans = (carts[i]&&carts[i].products[0]&&carts[i].products[0].productId&&carts[i].products[0].productId.price&&carts[i].products[0].productId.price.mrp)*(carts[i].products[0].qty)
    subTotal+=ans;
  }

  // update cart function 
const handleUpdate =async(index,type)=>{

  let arr = carts[index];
console.log(arr.id);
  if(type==='sub' && arr.products[0].qty<=1)
  return ;

  let data ={
    "products":[
      {
        "productId":arr.products[0].productId,
        "qty":type==="add"?arr.products[0].qty+1:arr.products[0].qty-1
      }
    ]
  }

  try{
const res = await dispatch(updateCart(data,arr.id));
if(res){
  return true;
}else{
  return false;
}
  }
  catch(err){
console.log(err);
  }
}

  // delete item from cart
  const handleDelete= async (id)=>{
    console.log(id)
    try {
     await dispatch(deleteCart(id))
      // toast.error("Remove item sucessfully")
      // alert("item remove success")
      
      setUpdate(!update)
   
    } catch (error) {
   console.log(error);

    }
  }
  return (
    <>
    <Box sx={{display:cartLength!== 0 ? "none":"block"}}>
      <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",height:"80vh"}}>
<Box>
  <ShoppingCart sx={{fontSize:"200px"}}/>
  <Typography sx={{textAlign:"center",fontSize:"24px"}}>Cart is Empty</Typography>
  <Box>
    <Button variant="contained" onClick={()=>router.push("/")}>Continue buy food</Button>
  </Box>
</Box>
      </Box>
    </Box>
    <Box sx={{padding:{md:"50px 50px",sm:"20px",xs:"10px"},display:cartLength!==0 ?"flex":"none",gap:"40px",flexDirection:{md:"row",sm:"row",xs:"column"}}}>
      <Box sx={{flex:3}}>
      <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:"20px"}}>
{cartLength <=1 ?<Typography>{cartLength} Item you have selected </Typography>:
<Typography>{cartLength} Items you have selected </Typography>}
<Typography sx={{fontWeight:"600"}}>Explore Menu</Typography>
      </Box>
      {cartLength ===0}
  {carts && carts.length>0 && carts.map((item,index)=>(   
<Card sx={{display:"flex",gap:"20px",padding:"20px",justifyContent:"space-between",alignItems:"center",marginY:"10px"}}>
<Box sx={{display:"flex",gap:"20px"}}>
<Avatar src={item && item.products[0] && item.products[0].productId &&item.products[0].productId.image } alt='item' sx={{height:"80px",width:"80px",borderRadius:"5px"}}/>
<Box>
<Typography sx={{fontWeight:"600"}}>{item && item.products[0] && item.products[0].productId &&item.products[0].productId.subCategory}</Typography>
<Typography sx={{fontSize:"10px"}}>Type of {item && item.products[0] && item.products[0].productId &&item.products[0].productId.category}-{item && item.products[0] && item.products[0].productId &&item.products[0].productId.title &&item.products[0].productId.title.longTitle} are present</Typography>
</Box>
</Box>
<Box sx={{display:"flex",flexDirection:"column",alignItems:"flex-end"}}>
  <Typography sx={{fontWeight:"600",}}>₹{item && item.products[0] && item.products[0].productId &&item.products[0].productId.price && item.products[0].productId.price.mrp  }</Typography>
  <Box>
  <Box sx={{border:"1px solid gray",borderRadius:"2px",display:"flex",alignItems:"center"}}>
<Remove sx={{borderRight:"1px solid gray",fontSize:"16px",fontWeight:"200",cursor:"pointer"}} onClick={()=>handleUpdate(index,'sub')}/>
<Typography sx={{borderRight:"1px solid gray",paddingX:"10px",fontSize:"10px"}}>{item && item.products[0] && item.products[0].qty}</Typography>
<Add sx={{fontSize:"16px",fontWeight:"200",cursor:"pointer"}} onClick={()=>handleUpdate(index,'add')}/>
  </Box>
  </Box>
  <Box>
  <Button sx={{fontSize:"10px",padding:"2px",backgroundColor:"red",color:"#fff"}}variant="contained" onClick={()=>handleDelete(item.id)}>remove</Button>
  {/* <ToastContainer/>  */}
  </Box>
</Box>
</Card>

))} 
      </Box>
  <Box sx={{flex:"1",}}>
    <Typography sx={{paddingBottom:"20px"}}>Price Details</Typography>
    <Card sx={{padding:"10px"}}>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
<Typography sx={{fontSize:"12px"}}>Sub Total</Typography>
<Typography sx={{fontSize:"12px"}}>₹ {subTotal}</Typography>
      </Box>
      <br/>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <Typography sx={{fontSize:"12px"}}>
          Discount
        </Typography>
        <Typography  sx={{fontSize:"12px"}}>
          - 
        </Typography>
      </Box>
      <br/>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
<Typography sx={{fontSize:"12px"}}>Taxes and Charges</Typography>
<Typography sx={{fontSize:"12px"}}>₹ 00.0</Typography>
      </Box>
      <br/>
      <Box sx={{borderTop:"1px dotted gray",display:"flex",justifyContent:"space-between",alignItems:"center",paddingY:"10px"}}>
<Typography sx={{fontWeight:"600",fontSize:"12px"}}>Grand Total</Typography>
<Typography sx={{fontWeight:"600",fontSize:"12px"}}>₹ {subTotal}</Typography>
      </Box>
      <Box sx={{borderTop:"1px dotted gray",paddingTop:"10px"}}>
       <Link href={"/checkout"}> <Button sx={{padding:"5px",fontWeight:"600",backgroundColor:"green",color:"#fff","&:hover":{
         backgroundColor:"green",color:"#fff" 
        }}} fullWidth>Place order</Button></Link>
      </Box>
    </Card>
    </Box> 
    </Box>
    </>
  )
}

export default Cart
