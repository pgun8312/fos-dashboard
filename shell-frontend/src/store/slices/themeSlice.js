import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        mode: "light"
    },
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        }
    }
})

export const { setMode } = themeSlice.actions; //actions that can perform to slice
export default themeSlice.reducer; // reducer for the store