import { configureStore } from "@reduxjs/toolkit";

import AdministrativePanelReducer from "../components/AdministrativePanel/AdministativePanelSlice";
import appSlice from "../components/App/appSlice";
import EmployeeSlice from "../components/EmployeeComponents/EmployeeSlice";
import EmployeeModaSlice from "../components/EmployeeModal/EmployeeModalSlice";

const store = configureStore({
    reducer: {
        administrativePanel: AdministrativePanelReducer,
        app: appSlice,
        employee: EmployeeSlice,
        employeeModal: EmployeeModaSlice
    }
});

export default store;