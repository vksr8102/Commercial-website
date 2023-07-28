import { createOrder } from '@/src/redux/slices/order';
import { Add, ArrowDropDown, Done,  Money, Payments, Remove,} from '@mui/icons-material';
import {  Avatar, Box, Button, Card,  TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { cartList, deleteCart, updateCart } from '@/src/redux/slices/cart';
import Link from 'next/link';
import { useFormik } from 'formik';
import axios from 'axios';
import Script from 'next/script';
import { updateUser } from '@/src/redux/slices/auth';
  const initialValues={
    locality:"",
    city:"",
    state:"",
    zipcode:"",
  }
function index() {
  const [address,setAddress] = useState({
    locality:"",
    city:"",
    state:"",
    zipcode:""
  })
let addressData
// state setting
const [open, setOpen] = useState(false)
const [update,setUpdate] = useState(false)
const [payment, setPayment]=useState(false)
//functon for open button
const handleOpen =()=>{
  setOpen(true)
  setPayment(false)
}

const handleClose =()=>{
  setOpen(false)
  setPayment(true)
}

// formik setup
const {values,error,handleBlur,handleChange,handleSubmit}=useFormik({
initialValues:initialValues,

onSubmit:async(values,action)=>{
  const {locality,city,state,zipcode}=values;
// console.log(values);
  setAddress({locality,city,state,zipcode})
  addressData ={
    address:[{locality,city,state,zipcode}]
  }
  dispatch(updateUser(addressData,userId))
  if(address){
    action.resetForm();
  }
}
})

// change address function

  const dispatch =useDispatch()
    const {carts} = useSelector((state)=>state.cart)
const {user} = useSelector((state)=>state.auth)

const userId= user.id;
console.log(userId);
// get cart function
const getCart =async()=>{
  const res = await dispatch(cartList())
}


useEffect(() => {
  getCart()
}, [update])

// useEffect(()=>{
// handleUserUpdate()
// },[])
//place order
    const handlePlaceOrder = async()=>{
      let products = carts.map((cart)=>{
        return {
          "productId":cart.products[0].productId,
          "qty":cart.products[0].qty
        }
      })
      let data = {
        userId :user.id,
        products,
        address,
        status: "pending",
        "orderStatus": {
          "orderConfirm": {
            "isConfirmed": true,
            "date": new Date()
          }
        }
       }
       const result = await dispatch(createOrder(data));

       if(result)
       alert("order was created successfully");
       else
       alert("Some error occured")
    }
    // const result = await dispatch(createOrder(data))

    let subTotal = 0;
    for (let i=0;i<carts.length;i++){
      let ans = (carts[i].products[0].productId.price.mrp)*(carts[i].products[0].qty)
      subTotal+=ans;
    }

// delete item from cart
const handleDelete=(id)=>{
  console.log(id)
  try {
    dispatch(deleteCart(id))
    setUpdate(true)
// toast.error("Remove item sucessfully")
alert("item remove success")
    
  } catch (error) {
 console.log(error);

  }
}


  // update cart function 
  const handleUpdate =async(index,type)=>{

    let arr = carts[index];
  // console.log(arr.id);
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

// nevigation
const router = useRouter();
const handleNevigate =()=>{
  router.push("/auth/Userprofile")
}
   
// for online payment

 const handlePay = async () =>{
  let products = carts.map((cart)=>{
    return {
      "productId":cart.products[0].productId,
      "qty":cart.products[0].qty
    }
  })
  const data ={
    userId :user.id,
    products,
    address,
    status: "pending",
  }
const result = dispatch(createOrder(data))
console.log(result);
    const option = {
      amount :subTotal*100,
      currency : 'INR'
    }
    try {
      const {data} = await axios.post('http://localhost:5000/userapp/payment/checkout',option, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    });
   
   


    const options = {
      key:process.env.NEXT_PUBLIC_RAZORPAY_API_ID,
      "amount": data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Harsh",
      "description": "Test Transaction",
      "image": "https://avatars.githubusercontent.com/u/86181346?v=4",
      "order_id": data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": "http://localhost:5000/userapp/payment/paymentVerify",
      "prefill": {
          "name": "Gaurav Kumar",
          "email": "gaurav.kumar@example.com",
          "contact": "9000090000"
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
  };
  var rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>
    <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    <Box sx={{padding:{md:"80px",sm:"30px",xs:"20px"},}}>
        <Box sx={{display:"flex",gap:"40px"}}>
   <Box sx={{flex:"2.5",}}>
<Card sx={{borderRadius:"0px",display:"flex",justifyContent:"space-between",padding:"20px",marginY:"20px"}}>
<Box>
    <Box sx={{display:'flex',gap:'30px',alignItems:"center"}}>
        <Typography  sx={{width:"20px",height:"20px",border:"1px solid #000",display:"flex",justifyContent:"center",alignproducts:"center"}}>1</Typography>
        <Typography sx={{fontWeight:"600",fontSize:"16px"}}>Login</Typography>
      {user ?<Done color='success' sx={{fontSize:"30px"}}/>:""}
    </Box>
    <Typography >{user && user.name} : {user && user.email}</Typography>
</Box>
<Box>
    <Button variant="contained" sx={{color:"#fff",backgroundColor:'darkgreen',borderRadius:"40px"}} onClick={handleNevigate}>change</Button>
</Box>
</Card>
<Card sx={{borderRadius:"0px",display:"flex",justifyContent:"space-between",padding:"20px",marginY:"20px"}}>
<Box>
    <Box sx={{display:'flex',gap:'30px'}}>
        <Typography  sx={{width:"20px",height:"20px",border:"1px solid #000",display:"flex",justifyContent:"center",alignproducts:"center"}}>2</Typography>
        <Typography sx={{fontWeight:"600",fontSize:"16px"}}>Delivery Address</Typography>
    </Box>
</Box>
<Box>
    <Button variant="contained" sx={{color:"#fff",backgroundColor:'linear-gradient(135deg, #ABDCFF 0%, #0396FF 100%)',borderRadius:"40px"}} onClick={handleOpen}>change</Button>
</Box>
</Card>

        <Box style={{width:'100%',gap:'20px',display:open?"flex":"none",flexDirection:'column',border:'1px solid rgba(0,0,0,0.3)',padding:'10px'}}>

<Typography variant='h5'>Add New Address</Typography>
<Box sx={{display:'flex',flexDirection:'column',gap:'10px'}}>
<form onSubmit={handleSubmit} autoComplete='on'>
<TextField variant='outlined' label='Zipcode' type='number' name='zipcode' value={values.zipcode} onChange={handleChange} onBlur={handleBlur} required  sx={{width:'100%',"& fieldset": {height:'50px',borderRadius:'3px'},height:'50px'}}/>

<TextField variant='outlined' label='State' type='text' name='state' value={values.state} onChange={handleChange} onBlur={handleBlur} required  sx={{width:'100%',"& fieldset": {height:'50px',borderRadius:'3px'},height:'50px'}}/>

<TextField variant='outlined' label='Locality/town' type='text' name='locality' value={values.locality} onChange={handleChange} onBlur={handleBlur} required  sx={{width:'100%',"& fieldset": {height:'50px',borderRadius:'3px'},height:'50px'}}/>

<TextField variant='outlined' label='city' type='text' name='city'  value={values.city} onChange={handleChange} onBlur={handleBlur} required sx={{width:'100%',"& fieldset": {height:'50px',borderRadius:'3px'},height:'50px'}}/>
<Box sx={{display:'flex', gap:'20px'}}>
 <Button variant='outlined'>Cancel</Button>
 <Button variant='contained'  type='submit'>save</Button>
</Box>
  </form>   
</Box>
{address.locality!=""&&address.city!=""&&address.state!=""&&address.zipcode!=""?<Button variant='contained' onClick={handleClose}>deliver here</Button>:<Button variant='contained' disabled>deliver here</Button>}
</Box>
<Card sx={{borderRadius:"0px",display:"flex",justifyContent:"space-between",padding:"20px",marginY:"20px"}}>
<Box>
    <Box sx={{display:'flex',gap:'30px'}}>
        <Typography  sx={{width:"20px",height:"20px",border:"1px solid #000",display:"flex",justifyContent:"center",alignproducts:"center"}}>3</Typography>
        <Typography sx={{fontWeight:"600",fontSize:"16px"}}>Order Summary</Typography>
    </Box>
</Box>
<Box>
    <Button variant="contained" sx={{color:"#fff",backgroundColor:'darkgreen',borderRadius:"40px"}}>change</Button>
</Box>
</Card>
<Box >  {carts && carts.length>0 && carts.map((item,index)=>(   
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
<Card sx={{borderRadius:"0px",display:"flex",justifyContent:"space-between",padding:"20px",marginY:"20px"}}>
<Box>
    <Box sx={{display:'flex',gap:'30px'}}>
        <Typography  sx={{width:"20px",height:"20px",border:"1px solid #000",display:"flex",justifyContent:"center",alignproducts:"center"}}>4</Typography>
        <Typography sx={{fontWeight:"600",fontSize:"16px"}} onClick={handleClose}>Payment Method</Typography>
    </Box>
    <Box sx={{display:payment?"flex":"none",flexDirection:"column",gap:"10px",alignItems:"center"}}>
     <Box sx={{display:"flex",justifyContent:'space-between',alignItems:"center",width:'800px'}}>
      <Box sx={{display:"flex",alignItems:"center",gap:"30px"}}>
      <Payments/>
      <Typography>Payment Online</Typography>
      <Button onClick={handlePay} variant='contained'>Pay now</Button>
      </Box>
      <ArrowDropDown/>
     </Box>
  <Box sx={{display:"flex",justifyContent:'space-between',alignItems:"center",width:'800px'}}>
    <Box sx={{display:"flex",alignItems:"center",gap:"30px"}}>
    <Money/>
    <Typography>Cash on Delivery</Typography>
    </Box>
   <Link href={"/order"}> <Button variant='contained' onClick={handlePlaceOrder}>Conform order</Button></Link>
  </Box>
    </Box>
</Box>
<Box>
    <ExpandMoreIcon/>
</Box>
</Card>
   </Box>
   <Box sx={{flex:"1.5",display:"flex",alignproducts:'center',justifyContent:"center",}}>
   <Card sx={{padding:"10px",width:"100%",height:"250px"}}>
      <Box sx={{display:"flex",alignproducts:"center",justifyContent:"space-between"}}>
<Typography sx={{}}>Sub Total</Typography>
<Typography sx={{}}>₹ {subTotal}</Typography>
      </Box>
      <br/>
      <Box sx={{display:"flex",alignproducts:"center",justifyContent:"space-between"}}>
        <Typography sx={{}}>
          Discount
        </Typography>
        <Typography  sx={{}}>
          - 
        </Typography>
      </Box>
      <br/>
      <Box sx={{display:"flex",alignproducts:"center",justifyContent:"space-between"}}>
<Typography sx={{}}>Taxes and Charges</Typography>
<Typography sx={{}}>₹ 00.0</Typography>
      </Box>
      <br/>
      <Box sx={{borderTop:"1px dotted gray",display:"flex",justifyContent:"space-between",alignproducts:"center",paddingY:"10px"}}>
<Typography sx={{fontWeight:"600",}}>Grand Total</Typography>
<Typography sx={{fontWeight:"600",}}>₹ {subTotal}</Typography>
      </Box>
    </Card>
   </Box>
   </Box>
    </Box>
    </>
  )
}

export default index
