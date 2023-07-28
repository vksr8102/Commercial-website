import { orderApi } from "@/src/mocks/order";
import { createSlice } from "@reduxjs/toolkit";


const initialState={
    orders:[]
}

const slice = createSlice({
    name:'order',
    initialState,
    reducers:{
        createOrder(state,action){
            state.orders= [action.payload.data,...state.orders]
        },
        getOrder(state,action){
            if(action.payload){
            state.orders = [...action.payload]
            }
            else{
            state.orders=[]
            }
        },
        updateOrder(state,action){
            let event= action.payload.data
                state.orders = state.orders.map((item) => {
                    if(item.id===event.id)
                    return event;
                    return item;
                })
                
               },
    
        orderList(state,action){
            if(action.payload)
            state.orders = [...action.payload.data]
            else
            state.orders= []
          },
    }
})

export const {reducer} =slice;


export const createOrder=(data)=>async(dispatch)=>{
    try {
    const result = await orderApi.createOrder(data);

    if(result){
        await dispatch(slice.actions.createOrder(result))
        return true
    }else{
        return false
    }      
} catch (error) {
     console.log(error);   
}
}

export const getOrder = () => async (dispatch) =>{
    try {
   
    const result = await orderApi.getOrder();
    if(result){
        await dispatch(slice.actions.getOrder(result))
        return result
    } 
    await dispatch(slice.actions.getOrder(false))
    return false
} catch (error) {
      console.log(error);  
}
}
export const orderList =(queries)=>async(dispatch)=>{
    try {
    const res =  await orderApi.orderList(queries)
    // console.log(res.data);
    if(res){
      await dispatch(slice.actions.orderList(res.data.data));
      return res
    }
    else{
      return false
    }
} catch (error) {
   console.log(error);     
}
  }
export const orderLists =async(queries)=>{
    try {
    const res =  await orderApi.orderLists(queries)
if(res){
    return res
}
else{
    return false
}
} catch (error) {
   console.log(error);     
}
  }

  export const updateOrder = (data,id) => async (dispatch) =>{
    const result = await orderApi.updateOrder(data,id);
    if(result.status==='SUCCESS'){
        await dispatch(slice.actions.updateOrder(result.data))
        return true
    }
    return false
}
  
