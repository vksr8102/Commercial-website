import axios from "axios";


class AuthApi{

    async getUser(){
      try{
        // ${process.env.NEXT_PUBLIC_HOST}
        const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/userapp/user/me`,{
          method: "get",
          headers: { 
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
          }
        });
        if(response.data.status==='SUCCESS')
        return response.data;
        else
        return false;
      
    }catch(err){
console.log(err)
    }
  }
      
    async updateUser(data,id){
      const response = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/userapp/user/update/${id}`,data,{
        method: "put",
        headers: { 
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      // console.log(response.data)
        if(response.data.status==='SUCCESS')
        return response.data;
        else
         return false;
    } 

    async deleteUser(id){
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_HOST}/userapp/user/delete/${id}`,{
        method: "delete",
        headers: { 
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
        if(response.data.status==='SUCCESS')
        return response.data;
        else
         return false;
    } 
    async resetPasswordOtp(data){
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/userapp/auth/reset-password-otp`,data,{
          method: "post",
        });
          if(response.data.status==='SUCCESS')
          return response.data;
          else
           return false;
      } catch (error) {
        console.log(error);
      }
      
    } 
    async validateOtp(data){
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/userapp/auth/reset-password`,data,{
          method: "post",
        });
          if(response.data.status==='SUCCESS')
          return response.data;
          else
           return false;
      } catch (error) {
        console.log(error);
      }
      
    } 

 
    
   async register(data){
    console.log(data,'mocks')
    const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/userapp/auth/register`,data);
    console.log(response)
    if(response.data.status==='SUCCESS')
    return response.data;
    else
     return false;
   } 

   async login(data){
    const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/userapp/auth/login`,data);
    if(response.data.status==='SUCCESS')
    return response.data;
    else
     return false;
   } 

}
export const authApi = new AuthApi();