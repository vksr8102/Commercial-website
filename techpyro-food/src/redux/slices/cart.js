import { cartApi } from "@/src/mocks/cart";
import { createSlice } from "@reduxjs/toolkit";


const initialState ={
  carts:[],
  cartsPaginator:{}
}

const slice =createSlice({
    name:"cart",
    initialState,
    reducers:{
        createCart(state,action){
            state.carts = [action.payload.data,...state.carts]
           
        },
        cartList(state,action){
          if(action.payload)
          state.carts = [...action.payload.data]
          else
          state.carts= []
        },
        getCart(state,action){
            if(action.payload){
            state.carts = [...action.payload]
            state.cartsPaginator = {...action.payload.paginator}
            }
            else{
            state.carts=[]
            state.cartsPaginator={}
            }
        },
        updateCart(state,action){
          if(action.payload){
          let data = action.payload.data;
          state.carts = state.carts.map((cart)=>{
            if(data.id === cart.id ){
              cart.products[0].qty = data.products[0].qty;
            }
            return cart;
          })
          }
          else{
          state.carts=[]
          state.cartsPaginator={}
          }
      },
       // delete a Cart 
       deleteCart(state,action){
        if(action.payload){
          let id = action.payload;
          state.carts = state.carts.filter((item)=>item.id!==id)
        }
        else{
          state.carts=[]
        }
        
       
    },

    }
});
 
export  const {reducer} = slice;


export const createCart = (data) => async(dispatch)=>{
  const result = await cartApi.createCart(data)
  if(result){
   await dispatch(slice.actions.createCart(result))
   return true
   }else{
     console.log('error')
     return false
  }  

}
export const cartList =(data)=>async(dispatch)=>{
  const res =  await cartApi.cartList(data)
  if(res){
    
    await dispatch(slice.actions.cartList(res.data))
    return true
  }
  else{
    await dispatch(slice.actions.cartList(false))
    return false
  }
}
export const updateCart =(data,id)=>async(dispatch)=>{
  const res =  await cartApi.updateCart(data,id)

  if(res){
    await dispatch(slice.actions.updateCart(res))
    return true
  }
  else{
    return false
  }
}
export const deleteCart = (id)=> async (dispatch) =>{

  try{
      
  const result = await cartApi.deleteCart(id);
  console.log(result);
  if(result){
      await dispatch(slice.actions.deleteCart(result))
      return true
  }
  return false
}catch(e){
  console.log(e)
}
  
}
