
import { productsApi } from "../../mocks/products";
import { createSlice} from "@reduxjs/toolkit";
const initialState = {
    product:[],
    productPaginator:{}
}


const slice = createSlice({
    name:"products",
    initialState,
    reducers:{
        getProducts(state,action){
            if( action.payload.data){
         state.product = [...action.payload.data]
         state.productPaginator={...action.payload.paginator}
            }
         else{
         state.product=[]
         state.productPaginator={}
         }
        },
        updateProducts(state,action){
            if( action.payload.data)
         state.product = [...action.payload.data]
         else
         state.product=[]
        },
        deleteProducts(state,action){
            if( action.payload.data)
         state.product = [...action.payload.data]
         else
         state.product=[]
        },
     

    }

});

export const {reducer} = slice

export const getProducts = (page=1,limit=9,filters={}) => async (dispatch) =>{
    const result = await productsApi.getProducts(page,limit,filters);
    if(result){
        await dispatch(slice.actions.getProducts(result.data))
        return result.data
    } 
    await dispatch(slice.actions.getProducts([]))
    return false
}


export default slice;
