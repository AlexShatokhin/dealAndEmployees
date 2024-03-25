import { createSlice } from "@reduxjs/toolkit";


const EmployerMainSlice = createSlice({
    name: "EmployerMain",
    initialState: {
        deals: [],
        employees: [],
        showComponents: "deal",
        taskAdded: false,
        employeeAdded: false
    },
    reducers: {
        changeDeals: (state, action) => {
            state.deals = action.payload;
        },
        changeEmployees: (state, action) => {
            state.employees = action.payload;
        },
        changeShowComponents: (state, action) => {
            state.showComponents = action.payload;
        },
        toggleTaskAdded: (state) => {
            state.taskAdded = !state.taskAdded;
        },
        toggleEmployeeAdded: (state) => {
            state.employeeAdded = !state.employeeAdded;
        }
    }
});

const {actions, reducer} = EmployerMainSlice;
export default reducer;
export const {
    changeDeals, 
    changeEmployees, 
    changeShowComponents, 
    toggleTaskAdded, 
    toggleEmployeeAdded} = actions;