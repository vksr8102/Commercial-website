import { Avatar, Box, Button, Tab, Typography } from '@mui/material';
import React, { useState } from 'react'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Message, Share, Star, ThumbUpOutlined } from '@mui/icons-material';
import OrderOnline from './order-online/OrderOnline';
export default function Block2({productDetail}) {
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <>
       <Box sx={{ width: '100%', typography: 'body1',padding:"30px 58px" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
        <Typography sx={{fontSize:"1.6rem"}}>{productDetail.length!==0 && productDetail[0].tagline} Riviews </Typography>
       <br/>
       {productDetail.map((data) => (
        <Box sx={{borderBottom:"1px solid #CCCCCC",marginBottom:"20px",display:"flex",justifyContent:"space-between",flexWrap:"wrap"}}>
       <Box>
          <Box sx={{display:"flex",gap:"10px"}}>
<Avatar src={data.image} sx={{height:"50px",width:"50px"}}/>
<Box>
<Typography sx={{fontSize:"1.3rem"}}>{data.user}</Typography>
<Box sx={{display:"flex",gap:'40px',color:"#CCCCCC"}}>
<Typography >{data.reviews} reviews  </Typography>
<Typography>{data.followers} followers</Typography>
</Box>
</Box>
</Box>
<Box sx={{display:"flex",gap:"10px",alignItems:"center",marginY:"10px"}}>
    <Box  sx={{background:"green",color:"#fff",fontSize:"10px",padding:"2px 2px",display:"flex",gap:"4px",alignItems:"center",borderRadius:"2px"}}>{data.rate}
    <Star sx={{fontSize:"10px"}}/></Box>
    <Typography >DELIVERY</Typography>
    <Typography sx={{color:"#CCCCCC"}}>5 hours ago</Typography>
</Box>
<Typography sx={{color:"#CCCCCC",marginY:"10px",fontSize:"16px"}}>0 Votes for helpful, 0 Comments</Typography>
<Box sx={{display:"flex",gap:"20px",marginBottom:"30px"}}>
    <Button sx={{background:"#F2F5F9",color:"#CCCCCC",padding:"2px 5px",borderRadius:"5px",fontWeight:"200","&:hover":{
        background:"#FAFAFA"
    }}} startIcon={<ThumbUpOutlined/>}>
        Helpful
    </Button>
    <Button sx={{background:"#F2F5F9",color:"#CCCCCC",padding:"2px 5px",borderRadius:"5px",fontWeight:"200","&:hover":{
        background:"#FAFAFA"
    }}} startIcon={<Message/>}>
       Comments
    </Button>
    <Button sx={{background:"#F2F5F9",color:"#CCCCCC",padding:"2px 5px",borderRadius:"5px",fontWeight:"200","&:hover":{
        background:"#FAFAFA"
    }}} startIcon={<Share/>}>
        Share
    </Button>
</Box>
       </Box>
   <Box>
    <Button sx={{color:"red",fontWeight:"200",background:"#F2F5F9",border:"0.5px solid red",padding:"6px 15px"}}>Follow</Button>
    </Box>    
       </Box>
         ))}    
        </TabPanel>
        <TabPanel value="2">
          <OrderOnline product={productDetail}/>
        </TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
    </>
  )
}
