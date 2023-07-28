// import { Search } from '@mui/icons-material'
import { Mic, SearchSharp } from '@mui/icons-material'
import { Box, styled } from '@mui/material'
import React from 'react'
const Searchbar = styled(Box)(({theme})=>({
    backgroundColor:"#fff",
    position:'relative',
    display:"flex",
    alignItems:"center",
    [theme.breakpoints.down("sm")]:{
        width:"100vw"
    }
}))
const Search = styled("input")(({theme})=>({
    backgroundColor:"#fff",
    height:"50px",
    width:"80vw",
    padding:"20px 40px",
    border:"1px solid #fff",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    borderRadius:"10px",
    // position:"relative",
    [theme.breakpoints.down("sm")]:{
        width:"90vw"
    }
}))
export default function Searchmobi() {
  return (
    <Searchbar >
        <SearchSharp sx={{position:"absolute",left:"30px",color:"red",fontSize:"25px",margin:"20px -20px",}} />
      <Search placeholder='search anythings.....'/>
      <Mic sx={{position:"absolute",right:"20px",color:"red",borderLeft:"1px solid #cccccc",paddingLeft:"10px",fontSize:"35px"}}/>
    </Searchbar>
  )
}
