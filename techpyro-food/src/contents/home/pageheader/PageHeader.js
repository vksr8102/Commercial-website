import React from 'react'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import SliderItem from './slider/SliderItem';
import { Box, Typography, styled } from '@mui/material';
const SliderContainer = styled('div')({
width:"50%",
// border:"1px solid red",
marginLeft:"100px",
// height:"auto",
})
const PageHeader = ({sliderData}) => {
  
  const settings = {
    dots: true,
    arrows:false,
    infinite: false,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    cssEase: "linear",
    initialSlide:0,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 0,
            speed: 300,
            arrows:true,
          },
        },
         {
          breakpoint: 960,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 300,
            arrows:false,
            autoplay:true,
          },
        },
        {
          breakpoint: 770,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 300,
            arrows:false,
            autoplay:true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 300,
            arrows:false,
            autoplay:true,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 300,
            arrows:false,
            autoplay:true,
            dots: true,
            infinite: true,
          },
        },
    ]
  };
  return (
    <>
     {/* <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'80px'}}>
       <Typography sx={{fontSize:{xs:'30px',sm:'35px',md:'45px'},fontWeight:'700',color:'black',paddingLeft:{xs:'10px',sm:'60px',md:'120px'}}}>NEW ARRIVALS</Typography>
       
       </Box> */}
    <SliderContainer>  
    <Slider {...settings} >
     {sliderData && sliderData.map((item)=>(
      <SliderItem posterLinks={item} />
      ))}
    </Slider> 
    </SliderContainer>

      
    </>
  )
}

export default PageHeader;