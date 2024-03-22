import { createSlice } from "@reduxjs/toolkit";


const EmployeeSlice = createSlice({
    name: "employee",
    initialState: {
        user: {},
        deals: [],
        taskAdded: false
    },
    reducers: {
        changeDealsList: (state, action) => {
            state.deals = action.payload;
        },
        changeUserData: (state, action) => {
            state.user = action.payload;
        },
        toggleTaskAdded: (state) => {
            state.taskAdded = !state.taskAdded;
        }
    }
})

const {reducer, actions} = EmployeeSlice;
export default reducer;
export const {changeDealsList, changeUserData, toggleTaskAdded} = actions