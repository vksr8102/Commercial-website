
import { authApi } from "../../mocks/auth";
import { createSlice} from "@reduxjs/toolkit";
const initialState = {
    user:{},
}


const slice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        getUser(state,action){
            if( action.payload)
         state.user = action.payload.data
         else
         state.user={}
        },
        updateUser(state,action){
            let data = action.payload.data
        state.user = {...state.user, ...data}
        },
        deleteUser(state,action){
         state.user = {}
        },

    }

});

export const {reducer} = slice

export const getUser = () => async (dispatch) =>{
    const result = await authApi.getUser();
    if(result){
        await dispatch(slice.actions.getUser(result))
        return result
    } 
    await dispatch(slice.actions.getUser(false))
    return false
}

export const updateUser = (data,id)=> async (dispatch) =>{
    const result = await authApi.updateUser(data,id);
    console.log(result);
    if(result){
        await dispatch(slice.actions.updateUser(result))
        return true
    }
    return false
    
}

export const deleteUser = (id)=> async (dispatch) =>{
  try {
    const result = await authApi.deleteUser(id)
    if (result) {
        await dispatch(slice.actions.deleteUser())
        return ;
    }
  } catch (error) {
    console.log(error);
  }
    
}

export const register = (data)=> async (dispatch) =>{
    const result = await authApi.register(data);
    if(result)
        return true
    else
        return false
    
}
export const login = (data) => async (dispatch) =>{
    const result = await authApi.login(data);
    if(result){
        localStorage.setItem("accessToken",result.data.token)
        return result.data;
    }
    return false
}

export const resetPasswordOtp =(data)=>async(dispatch)=>{
    const result = await authApi.resetPasswordOtp(data);
    if(result)
    return true
    else
    return false
}
export const validateOtp=(data)=>async(dispatch)=>{
    const result = await authApi.validateOtp(data);
    if(result)
    return true
    else
    return false
}


export default slice;
