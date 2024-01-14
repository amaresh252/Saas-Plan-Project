import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { addToCart,fetchItemsByUserId,removeFromCart } from "./CartAPI";
const initialState = {
    status: 'idle',
    items: [],
    cartLoaded: false,
  };
export const addToCartAsync=createAsyncThunk('cart/addToCart',
 async(cartData)=>{
    const response=await addToCart(cartData);
    return response.data;
 }
)


export const fetchItemsByUserIdAsync = createAsyncThunk(
    'cart/fetchItemsByUserId',
    async (userid) => {
      const response = await fetchItemsByUserId(userid);
   
      return response.data;
    }
  );

export const removeFromCartAsync=createAsyncThunk('cart/removeFromCart',
async(_id)=>{
    const response=await removeFromCart(_id);
    return response.data;
}
     
)


export const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        increament:(state)=>{
            state.value+=1;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(addToCartAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(addToCartAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.items.push(action.payload);
        })
        .addCase(fetchItemsByUserIdAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.items = action.payload;
            state.cartLoaded = true;
          })
          .addCase(fetchItemsByUserIdAsync.rejected, (state, action) => {
            state.status = 'idle';
            state.cartLoaded = true;
          })
        .addCase(removeFromCartAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(removeFromCartAsync.fulfilled,(state,action)=>{
            state.status='idle';
            const index=state.items.findIndex(item=>item._id===action.payload._id)
            state.items.splice(index,1);
        })
    }

})


export const selectItems = (state) => state.cart.items;
export const selectCartLoaded = (state) => state.cart.cartLoaded;

export default cartSlice.reducer;