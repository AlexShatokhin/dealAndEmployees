import { createSlice } from "@reduxjs/toolkit";

const AdministrativePanelSlice = createSlice({
    name: 'AdministrativePanel',
    initialState: {
        login: "",
        password: "",
        isAuthored: null,
        errorMessage: "Неверный логин или пароль!",
    },
    reducers: {
        changeFormValue: (state, action) => {
            state[action.payload.name] = action.payload.value
        },
        toggleAuthType: (state, action) => {
            state.isAuthored = action.payload;
        },
        changeErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
        clearPanel: (state) => {
            state.login = "";
            state.password = "";
            state.errorMessage = "Неверный логин или пароль!";
        }
    }
})

const {reducer, actions} = AdministrativePanelSlice;

export default reducer;
export const {toggleAuthType, changeErrorMessage, changeFormValue, clearPanel} = actions