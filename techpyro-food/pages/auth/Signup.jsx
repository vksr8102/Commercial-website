import { register } from '@/src/redux/slices/auth'
import { Close, Google } from '@mui/icons-material'
import { Avatar, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import React from 'react'
import GoogleButton from 'react-google-button'
import { useDispatch, useSelector } from 'react-redux'
import { signUpSchema } from 'schema';
const initialValues = {
    name:"",
    lastname:"",
    email:"",
    number:"",
    password:"",
    Confirm_password:"",
    message:"",
  }
const Signup = ({opener,setOpener,setSignupopen,signupopen}) => {
  const handleCloseForm = () => {
    setSignupopen(false);
  };
  const router = useRouter();
  const dispatch = useDispatch();
    const {values,errors,touched,handleBlur,handleChange,handleSubmit}=useFormik({
        initialValues:initialValues,
        validationSchema:signUpSchema,
        onSubmit: async (values , action)=>{
          const {name,email,password} = values;
            const data = {name,email,password}
         const result = await dispatch(register(data));
         console.log(result);
         if(result){
          setSignupopen(false);
          setOpener(true)
          alert("sucessfully register");
          action.resetForm();
         }else{
          console.error("failed");
         }
     
        }
      
      });
      const handleFirstPage = async () => {
        window.open(`${process.env.NEXT_PUBLIC_HOST}/auth/google`,"_self");
       };
      const handleClick = ()=>{
        setSignupopen(false);
   setOpener(true)
      }
  return (
    <>
    <form noValidate autoComplete='off' onSubmit={handleSubmit} sx={{maxWidth:"80vw",}}>
      <Card sx={{ maxWidth:"100%",position:"relative"}}>
      <Close sx={{position:'absolute',right:"10px",top:"10px",cursor:"pointer"}} onClick={handleCloseForm}/>
      <Box sx={{display:"flex",justifyContent:"center"}}>
            <Avatar src="/images/category/logo.png" sx={{textAlign:"center",height:"80px",width:"80px",fontSize:"40px",color:"ActiveCaption"}} alt='vikash'/>
            </Box>
        <CardContent>
            <Typography variant='h3' gutterBottom sx={{display:"flex",justifyContent:"center",paddingBottom:"10px",color:"#0C487C"}}>Signup</Typography>
<Grid container spacing={3} sx={{"& .MuiInputoutlined-input": {
            // marginBottom:"70px",
            fontSize: "20px",
            paddingLeft: "30px",
          },}}>
            <Grid xs={12}  item>
<TextField type="name" name="name" label="Full name"  value={values.name} onChange={handleChange} onBlur={handleBlur}    placeholder='Enter your Full name' variant='outlined' fullWidth required/>
{touched.name && errors.name ? (<Typography component="p" sx={{color:"red"}}>{errors.name}</Typography>) : null}
    </Grid>
   
    <Grid xs={12}  item>
<TextField type="email" name="email" label="Email Id"  value={values.email} onChange={handleChange} onBlur={handleBlur}    placeholder='Enter your Email id' variant='outlined' fullWidth required/>
{touched.email && errors.email ? (<Typography component="p" sx={{color:"red"}}>{errors.email}</Typography>) : null}
    </Grid>
   
    <Grid xs={12}  item>
<TextField type="password"  name="password" label="Password" value={values.password} onChange={handleChange} onBlur={handleBlur}   placeholder='Enter your Password' variant='outlined' fullWidth required/>
{touched.password && errors.password ? (<Typography component="p" sx={{color:"red"}}>{errors.password}</Typography>) : null}
    </Grid>
    <Grid xs={12}  item>
<TextField type="password" name="Confirm_password" label="Conform Password" value={values.Confirm_password} onChange={handleChange} onBlur={handleBlur}   placeholder='Enter your Mobile Number' variant='outlined' fullWidth required/>
{touched.Confirm_password && errors.Confirm_password ? (<Typography component="p" sx={{color:"red"}}>{errors.Confirm_password}</Typography>) : null}
    </Grid>
   
    <Grid xs={12}  item>
<Button type='submit' variant='contained' fullWidth sx={{background:"#0C487C","&:hover":{
                    background:"#0C487C",
                 }}} >Submit</Button>
<br/>
<Typography sx={{display:"flex",alignItems:"center",justifyContent:"center",paddingY:"10px"}}>Already have account? <Typography component="span"  sx={{cursor:"pointer",color:"#0C487C"}} onClick={handleClick}>Signin</Typography></Typography>
    </Grid>
</Grid>
<Box sx={{display:"flex",justifyContent:"center",paddingY:"10px"}}>
<GoogleButton style={{}} onClick={handleFirstPage}>Sign Up with google</GoogleButton>
</Box>
        </CardContent>
      </Card>
    </form>
    </>
  )
}

export default Signup;