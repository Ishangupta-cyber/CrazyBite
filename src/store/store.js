import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./cartSlice"

const appStore=configureStore({
  reducer:{
    cart:cartReducer // name of slice: name of reducer of that particular slice
  }
})

export default appStore