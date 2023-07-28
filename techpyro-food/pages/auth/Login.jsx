import { login, getUsers, getUser } from "@/src/redux/slices/auth";
import {  Close, Google } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Checkbox,
  DialogContent,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { logInSchema, signUpSchema } from "@/schema";
import { useRouter } from "next/router";
import ForgetPassword from "./ForgetPassword";
import Otp from "./Otp";
import RegenratePassword from "./RegenratePassword";
// import { useNavigate } from "react-router-dom";
// import { signUpSchema } from "schema";
const initialValues = {
  email: "",
  password: "",
};
const Login = ({ opener, setOpener, setSignupopen, signupopen }) => {

  const [open,setOpen]= useState(false)
  const [otpOpen,setOtpOpen] = useState(false)
  const [regenrateOpen,setRegenrateOpen]= useState(false)
  const dispatch = useDispatch();
  const router = useRouter();
  const { users } = useSelector((state) => state.auth);
  useEffect(() => {
    //  console.log(users)
  }, []);

  // --->usestate

  const handleCloseForm = () => {
    setOpener(false);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: logInSchema,
      onSubmit: async (values, action) => {
        const { email, password } = values;
        const data = { username: email, password };
        const result = await dispatch(login(data));
        dispatch(getUser());
        if (result) {
          router.push("/");
          alert("login succesfull");
          action.resetForm();
          setOpener(false);
        } else {
          alert("invalid credentials");
        }
      },
    });
  // console.log(values)
  const handleClick = () => {
    setSignupopen(true);
    setOpener(false)
  };
//forget password dialog open function
const forgetPasswordOpen=()=>{
  setOpen(true)
  setOpener(true)
}

//Regenrate password dialog function


  const value = useSelector((state) => state.auth);
  return (
    <>
   
      <Card variant="contained" sx={{ maxWidth: "100%",position:'relative' }}>
      <Modal open={open}>
      <DialogContent>
      <ForgetPassword setOpen={setOpen} setOtpOpen={setOtpOpen}/>
      </DialogContent>
    </Modal>
      <Modal open={otpOpen}>
      <DialogContent>
      <Otp  setOtpOpen={setOtpOpen} setRegenrateOpen={setRegenrateOpen}/>
      </DialogContent>
    </Modal>
      <Modal open={regenrateOpen}>
      <DialogContent>
      <RegenratePassword setOpen={setOpen} setOtpOpen={setOtpOpen} setRegenrateOpen={setRegenrateOpen} />
      </DialogContent>
    </Modal>
        <Close sx={{position:'absolute',right:"10px",top:"10px",cursor:"pointer"}} onClick={handleCloseForm}/>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            src="/images/category/logo.png"
            sx={{
              textAlign: "center",
              height: "80px",
              width: "80px",
              fontSize: "40px",
              color: "Highlight",
            }}
            alt={value && value.user && value.user.name}
          />
        </Box>
        <CardContent>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "10px",
              color: "#0C487C",
            }}
          >
            Login
          </Typography>

          <form noValidate onSubmit={handleSubmit} style={{ maxWidth: "80vw" }}>
            <Grid
              container
              spacing={3}
              sx={{
                "& .MuiInputoutlined-input": {
                  // marginBottom:"70px",
                  fontSize: "20px",
                  paddingLeft: "30px",
                },
              }}
            >
              <Grid xs={12} item>
                <TextField
                  type="email"
                  name="email"
                  label="Email Id"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your Email id"
                  variant="outlined"
                  fullWidth
                  required
                />
                {touched.email && errors.email ? (
                  <Typography component="p" sx={{ color: "red" }}>
                    {errors.email}
                  </Typography>
                ) : null}
              </Grid>

              <Grid xs={12} item>
                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your Password"
                  variant="outlined"
                  fullWidth
                  required
                />
                {touched.password && errors.password ? (
                  <Typography component="p" sx={{ color: "red" }}>
                    {errors.password}
                  </Typography>
                ) : null}
              </Grid>
              <Grid xs={12} item>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    background: "#0C487C",
                    "&:hover": {
                      background: "#0C487C",
                    },
                  }}
                >
                  Submit
                </Button>
                <br />
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop:"10px"
                  }}
                >
                  Don't have any account?{" "}
                  <Typography
                    component="span"
                    sx={{ cursor: "pointer", color: "#0C487C" }}
                    onClick={handleClick}
                  >
                    Signup
                  </Typography>
                </Typography>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <Box sx={{display:"flex",gap:"10px",alignItems:'center'}}>
                    <Checkbox  />
                    <Typography>Remeber me</Typography>
                  </Box>
                <Typography  component="span"
                    sx={{ cursor: "pointer", color: "#0C487C" ,textAlign:"center"}} onClick={forgetPasswordOpen}>Forget Password?</Typography>
                </Box>
              </Grid>
            </Grid>
          </form>
          <br />
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Button
              startIcon={<Google />}
              variant="contained"
              sx={{
                background: "#0C487C",
                "&:hover": {
                  background: "#0C487C",
                },
              }}
            >
              Sign in With google
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default Login;
