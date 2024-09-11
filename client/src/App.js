import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import NotFound from './NotFound'
import Login, { loginUser } from './pages/Login/Login';
import RootLayout from './components/RootLayout';
import AuthRequired from './components/AuthRequired';
import Unauthorized from './pages/Unauthorized/Unauthorized'


import Home from './pages/Home/Home';
import Report from './pages/Report/Report';
import AdminLayout from './components/AdminLayout';

import {getAllPatternsLoader, getAllEmployeesLoader, getAllCalendarsLoader, getPatternsAndContractLoader, getCalendarLoader, getAllContractsLoader, getContractLoader, getEmployeeLoader, getReportLoader } from './api/loaders';

import CreateEmployeeRecord, { createEmployeeRecord } from './pages/Admin/CreateEmployeeRecord';
import ErrorPage from './components/ErrorPage';
import CreateCalendar, { createCalendar } from './pages/Admin/CreateCalendar';
import UpdateCalendar, { updateCalendar } from './pages/Admin/UpdateCalendar';
import CreateContract, { createContract } from './pages/Admin/CreateContract';
import UpdateContract, { updateContract} from './pages/Admin/UpdateContract';
import CreateShiftPattern, { createShiftPattern } from './pages/Admin/CreateShiftPattern';
import CreateUser from './pages/Admin/CreateUser';
import Staff from './pages/Staff/Staff';


function App() {
 
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route exact path="/login" action={loginUser} element={<Login/>}/>
        <Route exact  path="/unauthorized" element={<Unauthorized />} />

        <Route element={<AuthRequired  access={2}/>}>
          <Route errorElement={<ErrorPage />} exact path='/' element={<RootLayout/>}>
            <Route  index element={<Home />} />
            <Route path='staff' element={<Staff />} loader={getAllEmployeesLoader} />
            <Route path='report' element={<Report />} />

            <Route exact path='admin/' element={<AdminLayout/>}>
              <Route   index element={<CreateEmployeeRecord />} loader={getPatternsAndContractLoader} action={createEmployeeRecord} />
              <Route  path='calendar/'  loader={getAllCalendarsLoader} element={<CreateCalendar />} action={createCalendar}/>
              <Route  path='calendar/:calendarId/' loader={getCalendarLoader} element={<UpdateCalendar />} action={updateCalendar}/>
              <Route  path='contract/' action={createContract} loader={getAllContractsLoader} element={<CreateContract />}/>
              <Route  path='contract/:contractId/'  loader={getContractLoader} action={updateContract} element={<UpdateContract />}/>
              <Route  path='shiftPattern/' loader={getAllPatternsLoader} element={<CreateShiftPattern />}  action={createShiftPattern}/>
              <Route  path='user' element={<CreateUser />} /> 
            </Route> 

          </Route>                 

        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  );
}

export default App;
