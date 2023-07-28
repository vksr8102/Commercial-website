import {
  styled,
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  MenuItem,
  Autocomplete,
  Select,
  Avatar,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
// import { getCordinate } from "components/location/Location";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getCordinate } from "@/src/components/location/Location";
import { LocationOn } from "@mui/icons-material";
import { getProducts } from "@/src/redux/slices/products";
import { productsApi } from "@/src/mocks/products";
import { Router, useRouter } from "next/router";
const Search = styled(Box)(({ theme }) => ({
  // border-radius: 5px;
  // margin-left: 10px;
  width: "70%",
  backgroundColor: "#fff",
  display: "flex",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  [theme.breakpoints.down("sm")]: {
    width: "75%",
  },
}));
const SearchField = styled(TextField)(({ theme }) => ({
  fontSize: "unset",
  width: "100%",
  flex: 3,
  border: "none",
  outline: "none",
  "&::placeholder": {
    marginLeft: "100px",
    fontSize: "40px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const SearchList = styled(List)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
  },
}));

const StyledListItem = styled(ListItem)`
  padding: 2px 10px;
`;

export default function SearchBar() {
  const [filters, setFilters] = useState({})
  const [showSearch, setShowSearch] = useState("none");
  const catMenu = useRef(null);
  const router = useRouter();
  const searchHandler = () => {
    setShowSearch("flex");
  };

  const closeOpenMenus = (e) => {
    if (catMenu.current && showSearch && !catMenu.current.contains(e.target)) {
      setShowSearch("none");
    }
  };
  const [location, setLocation] = useState("");
  const updatevalue = (e, vel) => {
    setLocation(e.target.value);
  };
  const [address, setaddress] = useState([])
  const fetchData = async () =>{
    getCordinate(setaddress)
  }
 


  //redux setup

 const [prodtcData,setProductData] = useState([]);
const getproduct = async ()=>{
 const result = await productsApi.getProducts(1,10,filters)
 if(result.status='SUCCESS'){
  setProductData(result.data.data);
 } else{
  setProductData([]);
 }
}

const [searchdata, setSearchdata] = useState([])
  const handleChange = (value) =>{
     setFilters({"title.longTitle":{"$regex":value,"$options":"i"}})

  }

  useEffect(()=>{
    fetchData();
  },[])

  useEffect(() => {
   getproduct()
  }, [filters]);

  return (
    <Search sx={{  position: "relative", borderRadius: "5px",width:"50vw",height:"55px",display:"flex",alignItems:"center" }}>
      <LocationOn sx={{position:"absolute",left:"10px",color:"red",fontWeight:"800",fontSize:"30px"}}/>
      <Box display="flex" border="none" outline="none" alignItems="center" >
        <Select
          flex={1}
          value={location}
          outline="none"
          border="none"
          displayEmpty
          onChange={updatevalue}
          sx={{
            position: "relative",
            "& fieldset": { border: "none" },
            
            // paddingRight:"100px",
            borderRadius: "1px",
            display: { md: "block", sm: "none", xs: "none" },
            paddingX:"40px",
            fontSize:"20px",
            // marginRight:"50px"
          }}
        >
          <MenuItem value="" width="100%"sx={{paddingX:"5px"}}>{address&&address.length!==0 && address[0].properties.county}</MenuItem>
        </Select>
      </Box>
      <Box display="flex" sx={{ width: "100%", position: "relative",borderLeft: "2px solid #EEEEEE", display:"flex",alignItems:"center"}}>
        {/* <SearchIcon
          border="none"
          outline="none"
          sx={{
            position: "absolute",
            left: "15px",
            top: "15px",
            fontSize: "30px",
            fontWeight:"200"
          }}
        /> */}
        <Autocomplete
         sx={{
          width:"100%",
          border:"none"
        }}
                          disablePortal
                          onChange={(e,value) =>  value && router.push(`/restaurant/${value.category}`)}
                          options={prodtcData}
                          getOptionLabel={(option) => option.subCategory}
                       
                          renderInput={(params) => (
                            <TextField
                              fullWidth
                              onChange={(e) => handleChange(e.target.value)}
                              name="category"
                              {...params}
                              label='Search Product ...'
                            />
                          )}   
                          
                          renderOption={(props, option) => {
                            return (
                                <li {...props}>
                                    <Box display={'flex'} flexDirection={'row'}>
                                        <Avatar src={option.image} size={'32'} variant={'circular'} />
                                        <Box display={'flex'} ml={3} flexDirection={'column'}>
                                            <Typography color={'text.primary'}>
                                                {option.subCategory}
                                            </Typography>
                                           
                                        </Box>
                                    </Box>
                                </li>
                            );
                        }}
                          
                          />
        
           
      </Box>
    </Search>
  );
}
