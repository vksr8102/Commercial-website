
import Block1 from "@/src/contents/home/block1/Block1";
import { data1 } from "@/src/constants/data1";
import PageHeader from "@/src/contents/home/pageheader/PageHeader";
import { pageheader } from "@/src/constants/pageheader";
import Block2 from "@/src/contents/home/block2/Block2";
import Block3 from "@/src/contents/home/block3/Block3";
import Block4 from "@/src/contents/home/block4/Block4";
import { useEffect } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { getUser } from "@/src/redux/slices/auth";
import { getProducts } from "@/src/redux/slices/products";
import { foodcategory } from "@/src/constants/foodcategory";
import { brands } from "@/src/constants/brands";
import { createCart } from "@/src/redux/slices/cart";
import Cookies from "js-cookie";


export default function Home() {
  const dispatch = useDispatch();
const {user}=useSelector((state)=>state.auth)


  const getProduct = async() =>{
    const res = await dispatch(getProducts());
    // console.log(response);
  }
 

  useEffect(() => {
   getProduct()

  }, [])
  
useEffect(()=>{
  const fetchToken =async()=>{

 
  if(Object.keys(user).length==0){
    let token = Cookies.get("authCookie");
    if(token!==undefined){
      localStorage.setItem("accessToken",token)
      await getUser()
    }
  }
}
fetchToken()
},[])
  return (
    <>
      
      <PageHeader sliderData={pageheader} />
      <Block1 sliderData={data1} />
      <Block2 products={foodcategory} />
      <Block3  products={brands}/>
      <Block4 />
    </>
  );
}
