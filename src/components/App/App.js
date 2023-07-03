import { useState } from 'react';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import AdministrativePanel from '../AdministrativePanel/AdministrativePanel';
import EmployerMain from '../EmployerComponents/EmployerMain';
import Test from '../test/Test';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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
					<Route path='/employer' element = {<EmployerMain data = {dataOfEmp} />}/>
					<Route path='/employee' element = {<Test />}/>
					<Route path='*' element = {<Test />}/>
				</Routes>

				

			</BrowserRouter>
		</div>
	);
}

export default App;
