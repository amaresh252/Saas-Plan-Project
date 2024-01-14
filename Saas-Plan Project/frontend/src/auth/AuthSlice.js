import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { createUser,loginUser,signOut,updateUser,fetchAllUser} from "./AuthAPI";
const initialState={
    status:'idle',
    loggedInUserToken: null,
    value:0,
    error:null,
}
 
export const createUserAsync=createAsyncThunk(
    'auth/createUser',
    async(userData)=>{
        const response= await createUser(userData);
        return response.data;
    }
)
export const fetchAllUserAsync=createAsyncThunk(
    'auth/fetchAllUser',
    async()=>{
        const response= await fetchAllUser();
        return response.data;
    }
)

export const loginUserAsync=createAsyncThunk(
    'auth/loginUser',
    async(userData)=>{
        const response=await loginUser(userData);
        return response.data;
    }
)

export const signoutAsync=createAsyncThunk(
    'auth/signOut',
    async (userData)=>{
        const response= await signOut(userData);
        return response.data;
    }
)

export const updateUserAsync=createAsyncThunk('auth/updateUser',
     async(userData)=>{
        const response = await updateUser(userData);
        return response.data;
     }
)

export const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
       increment:(state)=>{
        state.value+=1;
       },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createUserAsync.pending,(state)=>{
            state.status='loading';
        })
        .addCase(createUserAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.loggedInUserToken=action.payload;
        })
        .addCase(loginUserAsync.pending,(state)=>{
            state.status='pending';
        })
        .addCase(loginUserAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.loggedInUserToken=action.payload;
        })
        .addCase(loginUserAsync.rejected,(state,action)=>{
            state.status='idle';
            state.error=action.payload;
        })
        .addCase(signoutAsync.pending,(state)=>{
            state.status='pending';
        })
        .addCase(signoutAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.loggedInUserToken=null;
        })
        .addCase(updateUserAsync.pending,(state)=>{
            state.status='pending';
        })
        .addCase(updateUserAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.loggedInUserToken=action.payload;
        })
        .addCase(fetchAllUserAsync.pending,(state)=>{
            state.status='pending';
        })
        .addCase(fetchAllUserAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.loggedInUserToken=action.payload;
        })
    }
})

export const selectLoggedInUser=(state)=>state.auth.loggedInUserToken;
export const selectError=(state)=>state.auth.error;

export default  authSlice.reducer;