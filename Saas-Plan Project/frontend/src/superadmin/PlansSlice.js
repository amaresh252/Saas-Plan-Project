import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {AddPlansapi,fetchAllPlans,deletePlans,updatePlans} from "./PlansAPI";
const initialState={
    status:'idle',
    value:0,
    items:[],
}


export const AddPlansAsync=createAsyncThunk(
    'plans/AddPlansapi',
    async(planData)=>{
    const response=await AddPlansapi(planData);
    return response.data;
});

export const fetchAllPlansAsync=createAsyncThunk(
    'plans/fetchAllPlans',
    async()=>{
        const response=await fetchAllPlans();
        return response.data;
    }
);

export const deletePlansAsync=createAsyncThunk(
    'plans/deletePlans',
    async(planid)=>{
        const response= await deletePlans(planid);
        return response.data;
    }
)

export const UpdatePlansAsync=createAsyncThunk(
    'plans/updatePlans',
  async(planData)=>{
    const  response=await updatePlans(planData);
    return response.data;
  }
)


export const addPlansSlice=createSlice({
    name:'plans',
    initialState,
    reducers : {
        increament:(state)=>{
            state.value+=1;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(AddPlansAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(AddPlansAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.items.push(action.payload);
        })
        .addCase(fetchAllPlansAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(fetchAllPlansAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.items=action.payload;
        })
        .addCase(deletePlansAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(deletePlansAsync.fulfilled,(state,action)=>{
            state.status='idle';
            const index=state.items.findIndex(item=>item._id===action.payload._id)
            state.items.splice(index,1);
        })
        .addCase(UpdatePlansAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(UpdatePlansAsync.fulfilled,(state,action)=>{
            state.status='idle';
           const index=state.items.findIndex(item=>item._id===action.payload._id)
           state.items[index]=action.payload;
        })
        ;
    }
});


export const selectAllPlans=(state)=>state.plans.items;
export default addPlansSlice.reducer;