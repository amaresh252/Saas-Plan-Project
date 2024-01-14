import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllOrder, placeOrder } from "./AdminOrderAPI";

const initialState = {
    status: 'idle',
    items: [],
    currentOrder:null,
  };
export const placeOrderAsync=createAsyncThunk('order/placeOrder',
 async(orderData)=>{
    const response=await placeOrder(orderData);
    return response.data;
 }
)


export const fetchAllOrderAsync = createAsyncThunk(
    'order/fetchAllOrder',
    async (adminid) => {
      const response = await fetchAllOrder(adminid);
   
      return response.data;
      
    }
  );




export const orderSlice=createSlice({
    name:'order',
    initialState,
    reducers:{
        increament:(state)=>{
            state.value+=1;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(placeOrderAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(placeOrderAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.items.push(action.payload);
            state.currentOrder=action.payload;
        })
        .addCase(fetchAllOrderAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchAllOrderAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.items = action.payload;
          })
        }
})
export const selectAllOrder=(state)=>state.order.items;
export const selectCurrentOrder=(state)=>state.order.currentOrder;
export default orderSlice.reducer;