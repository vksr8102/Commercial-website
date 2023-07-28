import {reducer as authReducer} from "../slices/auth";
import {combineReducers} from "@reduxjs/toolkit";
import { reducer as productReducer } from "../slices/products";
import {reducer as cartReducer} from "../slices/cart"
import{reducer as  orderReducer}from '../slices/order'
export const rootReducer = combineReducers({
   auth:authReducer,
   products:productReducer,
   cart:cartReducer,
   order:orderReducer
});
