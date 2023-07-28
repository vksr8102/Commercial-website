import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  styled,
  DialogContent,
  Dialog,
  AppBar,
  Grid,
  Button,
  Avatar,
  Drawer,
  SwipeableDrawer,
  Badge,
} from "@mui/material";
import Login from "pages/auth/Login";
import Signup from "pages/auth/Signup";
import SearchBar from "./searchbar/SearchBar";
import { getCordinate } from "@/src/components/location/Location";
import { useDispatch, useSelector } from "react-redux";
import { ArrowDownward, ExpandLess, ExpandMore, ShoppingCart } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { deleteUser, getUser } from "@/src/redux/slices/auth";
import { getProducts } from "@/src/redux/slices/products";
import Cookies from "js-cookie";
const NavBar = styled(Box)(({ theme }) => ({
display:"flex",
justifyContent:"space-between",
alignItems:"center",
zIndex:"100",
  [theme.breakpoints.down("md")]:{
    display:"none",
  }
}));
const StyleToolbar = styled(Box)(({ theme }) => ({
  backgroundColor:"#fff",
    padding:"20px 50px",
position:"sticky",
top:"0px",
zIndex:"100",
  [theme.breakpoints.down("md")]:{
    display:"none",
  }
}));


export default function Navbar() {
  const dispatch = useDispatch()
 const router = useRouter()
  const [location, setLocation] = useState("");
  const [opener, setOpener] = React.useState(false);
  const [signupopen, setSignupopen] = React.useState(false)
const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(!open);
    console.log(open)
  };
 
 
  const handleClickOpen = () => {
  setOpener(true);
  };
  
  const handleSignup = () => {
    setSignupopen(false);
  };
  const handleSignupOpen = () => {
  setSignupopen(true);
  };

  const handleLogout = ()=>{
    window.localStorage.removeItem("accessToken")
    Cookies.remove("authCookie")
    router.push("/");
dispatch(deleteUser())
    setOpen(false)
    window.location.reload()
  }
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
    const [address, setaddress] = useState([])
  const fetchData = async () =>{
    getCordinate(setaddress)
  }
  const fetchUser =async()=>{
const res = dispatch(getUser())
  }
  useEffect(() => {
   fetchData()
   fetchUser()
  }, []);
  const {user} = useSelector((state)=>state.auth)
  const {carts} = useSelector((state)=>state.cart)
  let cartLength = carts.length
  return (
    <StyleToolbar>
    <NavBar>
   <Dialog open={opener}  >
        <DialogContent>
       <Login opener={opener} setOpener={setOpener} signupopen ={signupopen} setSignupopen={setSignupopen}/>
        </DialogContent>
      </Dialog>
   <Dialog open={signupopen}  >
        <DialogContent>
       <Signup signupopen ={signupopen} setSignupopen={setSignupopen} opener={opener} setOpener={setOpener}/>
        </DialogContent>
      </Dialog>
        <Box>
          <Link href={"/"} style={{textDecoration:"none",color:"#000"}}> <Typography sx={{fontSize:"40px",fontWeight:"600",color:"#000"}}>Techpyro</Typography></Link> 
        </Box>
        <Box
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <SearchBar flex={3} />
        
      </Box>
      <Box>
          <Link href={"/Cart"}>  <Badge badgeContent={cartLength} color="secondary">  <ShoppingCart sx={{color:"gray"}}/> </Badge></Link>
            </Box>
       { Object.keys(user).length ===0? <Box  sx={{display:"flex",gap:"30px"}}>
            <Typography
              component="h1"
              sx={{
                fontSize: { md: "18px", xs: "15px" },
                display: { xs: "none", sm: "none", md: "block" },
                cursor:"pointer",
                color:"#636363"
              }}
              onClick={handleSignupOpen}
            >
              Sign up
            </Typography>
           <Typography
              component="h1"
              sx={{
                fontSize: { md: "18px", xs: "15px" },
                display: { xs: "none", sm: "none", md: "block" },
                cursor:"pointer",
                color:"#636363",
                fontWeight:"300"
              }}
              onClick={handleClickOpen}
            >
              Log in
            </Typography>
            
        </Box>
        
        :<Box sx={{display:"flex",alignItems:"center",color:"#000",gap:"20px",position:"relative"}}><Avatar src="hd" sx={{backgroundColor:"red"}} alt={user&&user.name}/>
        <Typography sx={{cursor:"pointer"}} onClick={handleOpen }>{user&& user.name}{open ?<ExpandLess /> :<ExpandMore/>}</Typography>
        {open === true &&
        <Box sx={{width:"150px",boxShadow:"1px 4px 14px -6px rgba(0,0,0,0.75)",position:"absolute",top:"40px",right:"0px",background:"#fff",borderRadius:"10px",transition:"all 0.4s linear"}}  >
       <Link href={"/auth/Userprofile"} style={{textDecoration:"none",color:"#000"}}>   <Typography sx={{fontWeight:"200",padding:"10px 15px", "&:hover":{
            backgroundColor:"#E8E8E8",cursor:"pointer"
          }}}>Profile</Typography></Link>
       <Link href={"/order"} style={{textDecoration:"none",color:"#000"}}>   <Typography sx={{fontWeight:"200",padding:"10px 15px", "&:hover":{
            backgroundColor:"#E8E8E8",cursor:"pointer"
          }}}>My Order</Typography></Link>
          <Typography sx={{fontWeight:"200",padding:"10px 15px", "&:hover":{
            backgroundColor:"#E8E8E8",cursor:"pointer"
          }}}>Notifications</Typography>
          <Typography sx={{fontWeight:"200",padding:"10px 15px", "&:hover":{
            backgroundColor:"#E8E8E8",cursor:"pointer"
          }}}>Bookmarks</Typography>
          <Typography sx={{fontWeight:"200",padding:"10px 15px", "&:hover":{
            backgroundColor:"#E8E8E8",cursor:"pointer"
          }}}>Reviews</Typography>
          <Typography sx={{fontWeight:"200",padding:"10px 15px", "&:hover":{
            backgroundColor:"#E8E8E8",cursor:"pointer"
          }}}>Network</Typography>
          <Typography sx={{fontWeight:"200",padding:"10px 15px", "&:hover":{
            backgroundColor:"#E8E8E8",cursor:"pointer"
          }}}>Find friends</Typography>
          <Typography sx={{fontWeight:"200",padding:"10px 15px", "&:hover":{
            backgroundColor:"#E8E8E8",cursor:"pointer"
          }}}>Settings</Typography>
          <Typography sx={{fontWeight:"200",padding:"10px 15px", "&:hover":{
            backgroundColor:"#E8E8E8",cursor:"pointer"
          }}} onClick={handleLogout} >Logout</Typography>
       
        </Box>
}
        </Box>}

    </NavBar>
    
    </StyleToolbar>
  );
}
