import { createSlice } from "@reduxjs/toolkit";


const EmployeeModalSlice = createSlice({
    name: "EmployeeModal",
    initialState: {
        name: "",
        login: "",
        password: "",
        isError: false,
    },

    reducers: {
        changeEmployeeData: (state, action) => {
            state[action.payload.name] = action.payload.value;
        },
        changeError: (state, action) => {
            state.isError = action.payload;
        }
    }
})

const {actions, reducer} = EmployeeModalSlice;
export default reducer;
export const {changeEmployeeData, changeError} = actions;
