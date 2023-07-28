import React from 'react'
import { Avatar, Button, Typography, styled } from '@mui/material'
const SliderContainer = styled("div")({

})



 const SliderItem = ({posterLinks}) => {
    // console.log(posterLinks)
  return (
       <>
       <SliderContainer>
        <Button sx={{padding:"5px 15px",border:"1px solid #cccccc",margin:"20px 0px",color:"#cccccc","&:hover":{
            backgroundColor:"#F8F8F8"
        }}} endIcon={posterLinks.logo} >{posterLinks.name}</Button>
       </SliderContainer>
       </>
  )
}

export default SliderItem