import { createSlice } from "@reduxjs/toolkit";

const authUserSlice = createSlice({
    name: "autUser",
    initialState:{
        authUser:{
            userId: "",
            name: "Pasindu Deshan",
            email: "pasindu@mail.com",
            role: "Guest" 
        }
    },
    reducers:{
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        }
    }
})

export const { setAuthUser } = authUserSlice.actions;
export default authUserSlice.reducer;