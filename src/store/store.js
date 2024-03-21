import { configureStore } from "@reduxjs/toolkit";

import AdministrativePanelReducer from "../components/AdministrativePanel/AdministativePanelSlice";
import appSlice from "../components/App/appSlice";

const store = configureStore({
    reducer: {
        administrativePanel: AdministrativePanelReducer,
        app: appSlice
    }
});

export default store;