import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material';
import { Box, Typography, styled } from '@mui/material';
import SliderItem from './slider/SliderItem';
import { useSelector } from 'react-redux';
const SliderContainer = styled('div')({
width:"100%",
height:"auto",
// margin:"10px 10px",
padding:"40px 40px",
// overflow:"hidden",
backgroundColor:"#F8F8F8",
// boxShadow: "0 1px 5px rgba(104, 104, 104, 0.8)",
"@media (max-width: 1490px)": {
 margin:"3% 0px 2% 0px"

},
"@media (max-width: 1200px)": {
  width:"95%",
  margin:"30px 10px 10px 10px"
 
 },


})
const SliderInnerContainer = styled('div')({
  display: "flex",
  justifyContent:"space-between",
  flexDirection:"column",

  // marginLeft:"6px",
  padding:"0px 20px 0px 17px"
})


const PreviousBtn = (props) =>{
  const {className,onClick} = props;
  
   return (
         <div className={className} onClick={onClick} style={{height:"40px",width:"40px",background:"gray",borderRadius:"50%",marginLeft:"-5px"}}>
          <ChevronLeftOutlined style={{color:'black',zIndex:'10',fontSize:'2.5rem' }} />
         </div>  
   )
}

const NextBtn = (props) =>{
   const {className,onClick} = props;
   return (
     <div  className={className} onClick={onClick} style={{height:"40px",width:"40px",background:"gray",borderRadius:"50%",marginLeft:"-5px"}}>
       <ChevronRightOutlined style={{color:'black',  zIndex:'10',fontSize:'2.5rem'}} />
     </div>
   )
}


const Block2 = ({products}) => {


  const settings = {
    dots: false,
    arrows:true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    cssEase: "linear",
    initialSlide:0,
    prevArrow:<PreviousBtn />,
    nextArrow:<NextBtn />,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 5.3,
            slidesToScroll: 1,
            speed: 300,
            arrows:true,
          },
        },
         {
          breakpoint: 960,
          settings: {
            slidesToShow: 4.4,
            slidesToScroll: 1,
            speed: 300,
            arrows:false,
            autoplay:false,
          },
        },
        {
          breakpoint: 770,
          settings: {
            slidesToShow: 3.4,
            slidesToScroll: 1,
            speed: 300,
            arrows:false,
            autoplay:false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            speed: 300,
            arrows:false,
            autoplay:false,
          },
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 3.4,
            slidesToScroll: 3,
            speed: 300,
            arrows:false,
            autoplay:false,
          },
        },
    ]
  };
  return (
    <>
    <SliderContainer>      
       <SliderInnerContainer>
        <Box sx={{paddingY:'20px'}}>
       <Typography variant='h3' sx={{fontSize: {xs:'15px',sm:'20px',md:'30px'},fontWeight:"600"}}>Inspiration for your first order</Typography> 
       </Box>  
    <Slider {...settings}>
     { products &&products.length>0 && products.map((item)=>(
      <SliderItem posterLinks={item} />
      ))}
    </Slider>
      </SliderInnerContainer>  
    </SliderContainer>

      
    </>
  )
}

export default Block2