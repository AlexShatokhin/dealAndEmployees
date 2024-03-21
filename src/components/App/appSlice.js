import { createSlice } from "@reduxjs/toolkit";


const appSlice = createSlice({
    name: 'app',
    initialState: {
        authType: "none",
        empData: {},
    },
    reducers: {
        changeAuthType: (state, action) => {
            state.authType = action.payload.type;
            state.empData = action.payload.data;
        }
    }
})

const {actions, reducer} = appSlice;
export default reducer;
export const {changeAuthType} = actions;