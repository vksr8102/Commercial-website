import { Close } from '@mui/icons-material'
import { Box, Button, Slider, Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
function valuetext(value) {
  return `${value}`;
}
function Filter({filters,setFilters,setOpen}) {

  //state manegment
  const [value, setValue] = React.useState(0);
  const [price, setPrice] = React.useState([0, 1000]);
  // let obj = {
  //    category:[]
  // } 

  const [obj,setObj] = useState({
    category:[]
 } )

  //functions
  const handleChangePrice = (event, newValue) => {
    setPrice(newValue);
    console.log(obj)
  };

  const handleChange = (event,newValue) => {
    setValue(newValue);
   console.log(obj)
  };

  const handleFilter = async (e,value,type) =>{
      if(e.target.checked && type==='category'){
        // add value in array when check true
        obj['category'] = [...obj['category'],value]
      } else{
        // delete value from array when check false and update the existing array
        let arr = obj['category'].filter((item) => item!==value)
        obj['category'] = [...arr]
      }
    setObj({...obj})
      // console.log(obj['category'])
  }

  const handleApply = () =>{
    let arr = [];
    // console.log(obj)
    if(obj['category'].length>0){
      delete filters['category'];
   for(let k of obj['category']){
      arr = [...arr,{"category":{"$regex":k,"$options":"i"}}]
   }
   setFilters({...filters,"$or":[...arr]})
  }

  setFilters({...filters,"price.mrp":{"$gte":price[0],"$lte":price[1]}})
  setOpen(false)
  }

  

  return (
    <Box sx={{width:"500px"}}>
     <Box sx={{display:"flex",justifyContent:"space-between",padding:"20px 20px",borderBottom:"1px solid gray"}}>
     <Typography>Filter</Typography>
     <Close onClick={()=>setOpen(false)} sx={{cursor:'pointer'}}/>
     </Box>
     <Box
      sx={{  display: 'flex', }}
    >
      <Box sx={{flex:"1.3"}}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ marginRight:"20px",borderRight: 1, borderColor: 'divider' ,height:"350px"}}
      >
        <Tab label="Cuisines" {...a11yProps(0)}  />
        <Tab label="Cost Range" {...a11yProps(1)} />
      </Tabs>
      </Box>
      <Box sx={{flex:"2.7"}}>
      <TabPanel value={value} index={0}>
      <Box sx={{display:"flex",flexWrap:"wrap",justifyContent:"space-between"}}>
 <Box sx={{display:"flex",gap:"10px",alignItems:"center"}}>
<Checkbox  onChange={(e)=>handleFilter(e,'pizza','category')}  {...label} />
<Typography sx={{fontSize:"20px"}}>Pizza</Typography>
</Box>
 <Box sx={{display:"flex",gap:"10px",alignItems:"center"}}>
<Checkbox  onChange={(e)=>handleFilter(e,'burger','category')} {...label} />
<Typography sx={{fontSize:"20px"}}>Burgur</Typography>
</Box>
 <Box sx={{display:"flex",gap:"10px",alignItems:"center"}}>
<Checkbox onChange={(e)=>handleFilter(e,'cake','category')} {...label} />
<Typography sx={{fontSize:"20px"}}>Cake</Typography>
</Box>
 <Box sx={{display:"flex",gap:"10px",alignItems:"center"}}>
<Checkbox {...label} onChange={(e)=>handleFilter(e,'Biryani','category')}/>
<Typography sx={{fontSize:"20px"}}>Biryani</Typography>
</Box>
 <Box sx={{display:"flex",gap:"10px",alignItems:"center"}}>
<Checkbox {...label} onChange={(e)=>handleFilter(e,'Chicken','category')}/>
<Typography sx={{fontSize:"20px"}}>Chiken</Typography>
</Box>
 <Box sx={{display:"flex",gap:"10px",alignItems:"center"}}>
<Checkbox {...label} onChange={(e)=>handleFilter(e,'Chicken','category')}/>
<Typography sx={{fontSize:"20px"}}>Rolls</Typography>
</Box>
 <Box sx={{display:"flex",gap:"10px",alignItems:"center"}}>
<Checkbox {...label} onChange={(e)=>handleFilter(e,'Thali','category')}/>
<Typography sx={{fontSize:"20px"}}>Thali</Typography>
</Box>
 <Box sx={{display:"flex",gap:"10px",alignItems:"center"}}>
<Checkbox {...label} onChange={(e)=>handleFilter(e,'Paneer','category')} />
<Typography sx={{fontSize:"20px"}}>Paneer</Typography>
</Box>
 <Box sx={{display:"flex",gap:"10px",alignItems:"center"}}>
<Checkbox {...label} onChange={(e)=>handleFilter(e,'Momos','category')}/>
<Typography sx={{fontSize:"20px"}}>Momos</Typography>
</Box>
 <Box sx={{display:"flex",gap:"10px",alignItems:"center"}}>
<Checkbox {...label} onChange={(e)=>handleFilter(e,'Rolls','category')}/>
<Typography sx={{fontSize:"20px"}}>Rolls</Typography>
</Box>
 <Box sx={{display:"flex",gap:"10px",alignItems:"center"}}>
<Checkbox {...label} onChange={(e)=>handleFilter(e,'Chowmein','category')}/>
<Typography sx={{fontSize:"20px"}}>Chowmein</Typography>
</Box>
 <Box sx={{display:"flex",gap:"10px",alignItems:"center"}}>
<Checkbox {...label} onChange={(e)=>handleFilter(e,'Sandwhich','category')}/>
<Typography sx={{fontSize:"20px"}}>Sandwhich</Typography>
</Box>
 


 </Box>
      </TabPanel>

      <TabPanel value={value} index={1}>
      <Box sx={{ width: 300 }}>
      <Slider
        
         min={0}
         max={1000}
        value={price}
        onChange={(e,value) => setPrice(value)}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
      </TabPanel>
      </Box>
    </Box>
  <Box sx={{borderTop:"2px solid gray",display:"flex",justifyContent:'flex-end',gap:"10px",padding:"20px"}}>
<Box>
  <Button sx={{padding:"5px 10px",color:"#000"}}>clear all</Button>
</Box>
<Box>
  <Button onClick={()=>handleApply()} sx={{padding:"5px 10px",color:"#fff",backgroundColor:"red","&:hover":{
   color:"#fff",backgroundColor:"red" 
  }}}>Apply</Button>
</Box>
    </Box>  
</Box>
  )
}

export default Filter
