const { default: axios } = require("axios");

 class CartApi {
    async createCart(data){
        try{
            const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/userapp/cart/create`,data,{
                method:"POST",
                headers: { 
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                  }
            });
            if(res.data.status ==="SUCCESS")
            return res.data
            else
            return false
        }
        catch(err){
            console.log(err)
        }
    }


    async getCart(id){
        try{
            const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/userapp/cart/get/${id}`,{
                method:"GET",
                headers: { 
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                  }
            });
            if(res.data.status ==="SUCCESS")
            return true
            else
            return false
        }
        catch(err){
            console.log(err)
        }
    }

    
    async updateCart(data,id){
        try{
            const res = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/userapp/cart/update/${id}`,data,{
                method:"PUT",
                headers: { 
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                  }
            });
            if(res.data.status ==="SUCCESS")
            return res.data
            else
            return false
        }
        catch(err){
            console.log(err)
        }
    }

    async cartList(data,filters={}){
        filters.isDeleted = false;
        data={
            "query":filters,
            "options": {
              "collation": "",
              "sort": {},
              "populate": "products.productId",
              "projection": "",
              "lean": false,
              "leanWithId": true,
              "page": 1,
              "limit": 20,
              "pagination": false,
              "useEstimatedCount": false,
              "useCustomCountFn": false,
              "forceCountFn": false,
              "read": {},
              "options": {}
            },
            "isCountOnly": false
          }
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/userapp/cart/list`,data,{
                method:"post",
                headers: { 
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                  }
            })

            // console.log(res.data)
            if(res.data.status==="SUCCESS"){
            return res.data
        }
            else
            return false
        } catch (error) {
           console.log(error); 
        }
    }
    async deleteCart(id){
        try{
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_HOST}/userapp/cart/soft-delete/${id}`,{
                method: "delete",
                headers: { 
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }    
            });
            if(response.data.status==='SUCCESS')
                return response.data;
            else    
                return false;
        }catch(e){
            console.log(e);
        }
    }
 }

 export const cartApi = new CartApi();