import Card1 from '@/src/components/card/Card1'
import { Star } from '@mui/icons-material'
import Pagination from '@mui/material/Pagination';
import { Avatar, Box, Card, CardContent, Grid, Typography, styled } from '@mui/material'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { getProducts } from '@/src/redux/slices/products'
import Restaurants from '@/src/components/skeletons/Restaurants';


const StyleToolbar = styled(Box)(({theme})=>({
padding:"10px 78px"
}))

export default function Block4() {

  // useState setup
  const [limit,setLimit] = useState(9);
  const [page,setPage] = useState(1);
  const [filters,setFilters] = useState({});
const[skeletonActive,setSkeletonActive]=useState(false);

// redux state setup
  const dispatch = useDispatch();
  const {product,productPaginator} = useSelector((state) => state.products);
  
const fetchproduct =async()=>{
  setSkeletonActive(true);
  await dispatch(getProducts(page,limit,filters));
  setSkeletonActive(false);
}

// useEffect setup
useEffect(()=>{
    fetchproduct() ;
},[page,limit]);

// page change function
const handleChangePage = (value) =>{
  // console.log(value)
   setPage(value);
}

  

  return (
    <StyleToolbar>
      <Box>
        <Typography sx={{fontSize:"30px",fontWeight:"500",paddingY:"10px"}}>Best Food in Agra</Typography>
      </Box>
      {skeletonActive ? <Restaurants/>
     : <Box>
     
 <Grid container columnSpacing={4} rowSpacing={3}>
   { product && product.length>0&& product.map((item)=>(
<Grid item md={4} sm={6} xs={12}   >
<Link href={`/product/${item.id}`} style={{textDecoration:"none"}}>
<Card sx={{maxWidth:"100%",boxShadow:"none",borderRadius:"20px","&:hover":{
  boxShadow: "0px 12px 28px 0px rgba(140, 149, 159, 0.3)"
}}}>
   <Box sx={{position:"relative",padding:"10px"}}>
<Avatar src={item.image} sx={{width:"100%",height:"250px",borderRadius:"20px"}}/>
<Typography sx={{position:"absolute",bottom:"20px",left:"10px",padding:"2px 5px",backgroundColor:"#256FEF",color:"#fff",borderRadius:"5px",}}>Free Medium Fries</Typography>
<Typography sx={{position:"absolute",bottom:"60px",left:"10px",padding:"2px 5px",backgroundColor:"red",color:"#fff",borderRadius:"5px",}}>Free Medium Fries</Typography>
<Typography sx={{position:"absolute",bottom:"20px",right:"20px",padding:"2px 5px",backgroundColor:"#cccccc",color:"#fff",borderRadius:"5px",}}>24min</Typography>
   </Box>
   <CardContent >
    <Box sx={{display:"flex",justifyContent:"space-between",borderBottom:"1px solid #cccccc",paddingBottom:"10px"}}>
      <Box>
        <Typography sx={{fontSize:"20px",fontWeight:"600",}}>{item.subCategory}</Typography>
        <Box sx={{display:"flex", gap:"5px"}} >
          <Typography sx={{color:"#cccccc", }} >{item.category}</Typography>
        
          </Box>
    </Box>
    <Box sx={{display:"flex",alignItems:"flex-end",flexDirection:"column"}}>
        <Box sx={{padding:"1px 5px",backgroundColor:"green",color:"white",borderRadius:"5px",fontWeight:"600",width:"45px",display:"flex",alignItems:"center"}}>
            <Typography>{item&& item.price&& item.price.discount}</Typography>
         <Star sx={{fontSize:"12px"}}/> </Box>
        <Typography sx={{color:"#cccccc"}}> ₹ {item&& item.price&& item.price.mrp} for one</Typography>

    </Box>
    </Box>
    <Box sx={{display:"flex",justifyContent:"space-between",paddingTop:"10px",alignItems:"center"}}>
<Typography sx={{fontSize:"12px",color:"#cccccc"}}>2700 + order placed from here</Typography>
<Avatar src="https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png" sx={{width:"40px",height:"20px",borderRadius:"5px"}}/>
    </Box>
   </CardContent>
</Card>
      </Link>
</Grid>
 ))}   
      </Grid>
    </Box>
  }
    <Box sx={{display:"flex",justifyContent:"center",paddingY:"20px"}}>
    <Pagination onChange={(e,value) => handleChangePage(value)} count={productPaginator&&productPaginator.pageCount&&productPaginator.pageCount} color="secondary" />
    </Box>
    </StyleToolbar>
  )
}

