import { Routes, Route, Navigate } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { changeAuthType } from './appSlice';

import AdministrativePanel from '../AdministrativePanel/components/AdministrativePanel';
import EmployerMain from '../EmployerComponents/EmployerMain';
import EmployeeMain from '../EmployeeComponents/EmployeeMain';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

function App() {
	
	const {authType, empData} = useSelector(state => state.app);
	const dispatch = useDispatch();

	return (
		<div className="main">
				<BrowserRouter>

					<Routes>
						<Route path='/' element = {<AdministrativePanel />}/>
						<Route path='/employer' element = {authType === "employer" ? <EmployerMain changeAuthType = {(type, data) => dispatch(changeAuthType({type: type, data: data}))} data = {empData} />  : <Navigate to="/" />}/>
						<Route path='/employee' element = {authType === "employee" ? <EmployeeMain changeAuthType = {(type, data) => dispatch(changeAuthType({type: type, data: data}))} data = {empData} />  : <Navigate to="/" />}/>
						<Route path='*' element = {<AdministrativePanel />}/>
					</Routes>

				</BrowserRouter>
		</div>
	);
}

export default App;
