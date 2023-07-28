import axios from "axios";


class ProductsApi{

    async getProducts(page=1,limit=9,filters={}){
      let obj = {
        "query":filters,
        "options": {
          "collation": "",
          "sort": "",
          "populate": "",
          "projection": "",
          "lean": false,
          "leanWithId": true,
          "page": page,
          "limit": limit,
          "pagination": true,
          "useEstimatedCount": false,
          "useCustomCountFn": false,
          "forceCountFn": false,
          "read": {},
          "options": {}
        },
        "isCountOnly": false
      }
      // ${process.env.NEXT_PUBLIC_HOST}
      try{
       const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/userapp/product/list`,
       obj,{
        method: "post",
        headers: { 
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
       if(response.data.status==='SUCCESS')
       return response.data;
       else
        return false;
    } catch(err){
      console.log(err);
    }
    } 

    
}
export const productsApi = new ProductsApi();