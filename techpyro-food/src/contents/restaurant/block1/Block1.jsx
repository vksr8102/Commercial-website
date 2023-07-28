import {  Star } from '@mui/icons-material'
import { Avatar, Box, Button, Card, CardContent, CardMedia, Dialog, Grid, Pagination, Typography } from '@mui/material'
import { getProducts } from '@/src/redux/slices/products';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Restaurants from '@/src/components/skeletons/restaurants';
import Filter from '@/src/components/filter/Filter';
import Link from 'next/link';

export default function Block1() {
  const router = useRouter();

 // useState setup
 const [limit,setLimit] = useState(9);
 const [page,setPage] = useState(1);
 const [filters,setFilters] = useState({"$or":[{"title.shortTitle":{"$regex":router.query.id,"$options":"i"}},{"category":{"$regex":router.query.id,"$options":"i"}}]});
 const [skeletonActive,setSkeletonActive] = useState(false);
 const [open,setOpen]= useState(false);

 // redux state setup
 const dispatch = useDispatch();
 const {product,productPaginator} = useSelector((state)=>state.products);
 
 //data fetching function
 const fetchProduct = async () =>{
  setSkeletonActive(true);
  await dispatch(getProducts(page,limit,filters));
  setSkeletonActive(false);
 }

 //page change function
 const handleChangePage = (value) =>{
  console.log(value)
   setPage(value);
}
 
// dilog open function
const handleOpen=()=>{
  setOpen(true);
}
 // useEffect setup
 useEffect(()=>{
    fetchProduct();
 },[page,limit,filters]);

 useEffect(()=>{
 setFilters({"$or":[{"title.shortTitle":{"$regex":router.query.id,"$options":"i"}},{"category":{"$regex":router.query.id,"$options":"i"}}]})
 },[router.query.id])


  return (
    <Box sx={{padding:"40px 58px"}}>
      <Dialog open={open}>
        <Filter filters={filters} setFilters={setFilters} setOpen={setOpen}/>
      </Dialog>
      <Box>
<Button sx={{color:"#000",border:"1px solid #000",padding:"2px 5px"}}  onClick={handleOpen}>filter</Button>
      </Box>
      {skeletonActive?<Restaurants />
      :<Grid container columnSpacing={4} rowSpacing={3}>
        {product && product.length>0 && product.map((item)=>(
          <Grid item md={4} sm={6} xs={12}  key={item.id}>
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
                 <Typography sx={{color:"#cccccc"}}>Burger, Fast Food, Bevera...</Typography>
             </Box>
             <Box sx={{display:"flex",alignItems:"flex-end",flexDirection:"column"}}>
                 <Box sx={{padding:"1px 5px",backgroundColor:"green",color:"white",borderRadius:"5px",fontWeight:"600",width:"45px",display:"flex",alignItems:"center"}}>
                     <Typography>3.0</Typography>
                  <Star sx={{fontSize:"12px"}}/> </Box>
                 <Typography sx={{color:"#cccccc"}}> ₹ {item && item.price &&  item.price.mrp && item.price.mrp}for one</Typography>
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
      }
      <Box sx={{display:"flex",justifyContent:"center",paddingY:"20px"}}>
    <Pagination onChange={(e,value) => handleChangePage(value)} count={productPaginator&&productPaginator.pageCount&&productPaginator.pageCount} color="secondary" />
    </Box>
    </Box>
  )
}
