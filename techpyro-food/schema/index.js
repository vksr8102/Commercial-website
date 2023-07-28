import * as yup from "yup";

export const signUpSchema = yup.object({
   email:yup.string().email().required("Please Enter Your email"),
   password:yup.string().min(6).required("please enter your password"),
   Confirm_password:yup.string().required().oneOf([yup.ref("password"),null],"password must match"),
})
export const logInSchema = yup.object({
   email:yup.string().email().required("Please Enter Your email"),
   password:yup.string().min(6).required("please enter your password"),
})
