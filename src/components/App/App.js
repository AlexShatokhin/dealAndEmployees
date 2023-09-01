import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import AdministrativePanel from '../AdministrativePanel/AdministrativePanel';
import EmployerMain from '../EmployerComponents/EmployerMain';
import EmployeeMain from '../EmployeeComponents/EmployeeMain';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

function App() {
	
	const [authType, setAuthType] = useState("none");
	const [dataOfEmp, setDataOfEmp] = useState({});

	const changeAuthType = (type, data) => {
		setAuthType(type);
		setDataOfEmp(data);
	}

	return (
		<div className="main">
			<BrowserRouter>

				<Routes>
					<Route path='/' element = {<AdministrativePanel changeAuthType = {changeAuthType} />}/>
					<Route path='/employer' element = {authType === "employer" ?<EmployerMain changeAuthType = {changeAuthType} data = {dataOfEmp} />  : <Navigate to="/" />}/>
					<Route path='/employee' element = {authType === "employee" ?<EmployeeMain changeAuthType = {changeAuthType} data = {dataOfEmp} />  : <Navigate to="/" />}/>
					<Route path='*' element = {<AdministrativePanel changeAuthType = {changeAuthType} />}/>
				</Routes>

				

			</BrowserRouter>
		</div>
	);
}

export default App;
