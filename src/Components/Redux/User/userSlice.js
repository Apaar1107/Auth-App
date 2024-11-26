import { createSlice } from "@reduxjs/toolkit";

const initialState={
    error:null,
    loading:false,
    currentUser:null,
    
}

  const userSlice= createSlice({
      name:"user",
      initialState,
      reducers:{
        signInStart:(state)=>{
             state.error=null;
             state.loading=true;
        },
        signInSuccess:(state,action)=>{
               state.loading=false;
               state.currentUser=action.payload;
               state.error=null;

        },
        signInFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        deleteSuccess:(state)=>{
          state.loading=false;
               state.currentUser=null;
               state.error=null;
        }
      }
  })

  export const{signInStart,signInSuccess,signInFailure,deleteSuccess}=userSlice.actions;

  export default userSlice.reducer;