const { default: axios } = require("axios");


class OrderApi {
    async createOrder(data){
        try{
            const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/userapp/order/create`,data,{
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

    async getOrder(id){
        try {
            const res =await axios.get(`${process.env.NEXT_PUBLIC_HOST}/userapp/order/get/${id}`,{
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
console.log(err);
         }
    }
    async updateOrder(data,id){
        try {
            const res =await axios.put(`${process.env.NEXT_PUBLIC_HOST}/userapp/order/update/${id}`,data,{
                method:"PUT",
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
console.log(err);
         }
    }
    async orderList(queries){
        // console.log(queries)
        const data = 
        {
            "query":queries,
            "options": {
              "collation": "",
              "sort": {"createdAt":-1},
              "populate": "products.productId",
              "projection": "",
              "lean": false,
              "leanWithId": true,
              "page": 1,
              "limit": 10,
              "pagination": true,
              "useEstimatedCount": false,
              "useCustomCountFn": false,
              "forceCountFn": false,
              "read": {},
              "options": {}
            },
            "isCountOnly": false
          }
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/userapp/order/list`,data,{
                method:"post",
                headers: { 
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                  }
            })

            // console.log(res.data)
            if(res.data.status==="SUCCESS"){
            return res
        }
            else
            return res
        } catch (error) {
           console.log(error); 
        }
    }
    async orderLists(queries){
        const data = 
        {
            "query":queries,
            "options": {
              "collation": "",
              "sort": {"createdAt":-1},
              "populate": "products",
              "projection": "",
              "lean": false,
              "leanWithId": true,
              "page": 1,
              "limit": 10,
              "pagination": true,
              "useEstimatedCount": false,
              "useCustomCountFn": false,
              "forceCountFn": false,
              "read": {},
              "options": {}
            },
            "isCountOnly": false
          }
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/userapp/order/list`,data,{
                method:"post",
                headers: { 
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                  }
            })

            // console.log(res.data)
            if(res.data.status==="SUCCESS"){
            return res
        }
            else
            return res
        } catch (error) {
           console.log(error); 
        }
    }
}


export const orderApi = new OrderApi();