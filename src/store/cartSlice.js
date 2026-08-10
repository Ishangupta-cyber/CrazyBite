import { createSlice } from "@reduxjs/toolkit";


const cartSlice=createSlice({
  name:"cart",
  initialState:{
    items:[]
  },
  reducers:{
    addItem:(state,action)=>{
      state.items.push(action.payload)
    },
    clearCart:(state,action)=>{
      state.items=[]
    },
    removeEntry:(state,action)=>{
      state.items=state.items.filter((entry)=>(entry.cartId !== action.payload))
    },
    removeOne:(state,action)=>{
      const itemId=action.payload
      const index=state.items.findIndex((entry)=>entry.id==itemId)
      if (index!==-1){
        state.items.splice(index,1)
      }
    }
  }

})


export const {addItem,clearCart,removeEntry,removeOne}=cartSlice.actions

export default cartSlice.reducer