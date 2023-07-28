import React from 'react'
import { Avatar, Typography, styled } from '@mui/material'
const SliderContainer = styled("div")({
height:"auto",

})
const ImageContainer = styled("div")({
    display:"flex",
    alignItems:"center",
    flexDirection:"column",

})

const Head = styled("h3")({
    fontSize: "15px",
    fontWeight:"400",
    // textAlign:"center",
    marginBottom:"5px",
    "@media (max-width: 600px)": {
       fontSize: "13px",
       },
})
// const Para = styled("p")({
//     fontSize:"14px",
//     fontWeight:"600",
//     "@media (max-width: 600px)": {
//         fontSize: "12px",
//         },
// })
 const SliderItem = ({posterLinks}) => {
    // console.log(posterLinks)
  return (
       <>
      
       <SliderContainer>
        <ImageContainer>
            <Avatar src={posterLinks.image} sx={{width:"85%",height:"70vh",borderRadius:"10px"}} />
        </ImageContainer>
       </SliderContainer>
       </>
  )
}

export default SliderItem