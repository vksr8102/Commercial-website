import { getCordinate } from "@/src/components/location/Location";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
 
  MenuItem,
  Select,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchBar from "../../website/navbar/searchbar/SearchBar";
import Searchmobi from "./searchbar/Searchmobi";
import { GTranslate, Language, LocationOn, Menu } from "@mui/icons-material";
import MenuButtons from "./menuButtons/MenuButtons";
const Nav = styled(AppBar)(({ theme }) => ({
  display: "none",
   marginBottom:"150px",
  [theme.breakpoints.down("md")]: {
    padding: "10px 20px",
    display: "block",
    backgroundColor: "#fff",
   
  },
  // [theme.breakpoints.down("sm")]:{
  //     padding:"10px 20px",
  //     display:"block" ,
  //     backgroundColor:"#fff"
  // },
}));
const Top = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems:"center"
}));
const Down = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));

export default function Navmobi() {
  const [location, setLocation] = useState("");
  const [address, setaddress] = useState([]);
  const fetchData = async () => {
    getCordinate(setaddress);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const updatevalue = (e, vel) => {
    setLocation(e.target.value);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Nav>
      <Top>
        <Box display="flex" border="none" outline="none" alignItems="center">
            <LocationOn sx={{color:"red"}}/>
          <Select
            flex={1}
            value={location}
            outline="none"
            border="none"
            displayEmpty
            onChange={updatevalue}
            sx={{
              "& fieldset": { border: "none" },
              fontSize: "20px",
            }}
          >
            <MenuItem value="" width="100%" sx={{ paddingX: "20px" }}>
              {address && address.length !== 0 && address[0].properties.county}
            </MenuItem>
          </Select>
        </Box>
        
   <Box sx={{display:"flex",gap:{sm:"50px",xs:"20px"},alignItems:"center"}}>
   <Box sx={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",padding:"10px 10px",height:"25px",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <GTranslate sx={{color:"#cccccc",fontSize:"20px"}} />
        </Box>
    <Box  onClick={handleOpen}>
      <Menu sx={{color:'black'}}/>
    </Box>
    <Drawer open={open} onClose={handleClose} sx={{position:"absolute",right:"0px"}}>
      <MenuButtons />
    </Drawer>
   </Box>
      </Top>
      <Down>
        <Searchmobi />
      </Down>
    </Nav>
  );
}
