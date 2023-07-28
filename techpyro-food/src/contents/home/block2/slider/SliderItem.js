import React from 'react'
import { styled } from '@mui/styles'
import { Avatar, Typography } from '@mui/material'
import Link from 'next/link'
const SliderContainer = styled("div")({
width:"100%",
height:"auto",
textAlign:"center"
})
const ImageContainer = styled("div")({
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"column",
    margin:"10px 20px"
})


 const SliderItem = ({posterLinks}) => {
  return (
    <>
       <SliderContainer>
       <Link href={`/restaurant/${posterLinks &&posterLinks.name}`} style={{textDecoration:"none",color:"#000"}}>
        <ImageContainer>
            <Avatar src={posterLinks &&posterLinks.image} sx={{height:"150px",width:"150px"}} />
        <Typography sx={{paddingY:"10px",fontSize:"18px",fontWeight:"600"}}>{posterLinks && posterLinks.name}</Typography>
        </ImageContainer>
        </Link>
       </SliderContainer>
       </>
  )
}

export default SliderItem