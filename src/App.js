
import './App.css';
import { Provider } from "react-redux";
import store from "./store/store";
import ErrorNotifier from './components/elements/ErrorNotifier';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import ScrollToTop from './components/layout/ScrollToTop';
import Signup from './pages/onboarding/Signup';
import RequestPasswordReset from './pages/auth/RequestPasswordReset';
import ResetPassword from './pages/auth/ResetPassword';
import User from './pages/User';
import Home from './pages/user/home';
import Departments from './pages/user/company/departments/Departments';
import Groups from './pages/user/company/groups/Groups';
import Designations from './pages/user/company/designations/Designations';
import Shifts from './pages/user/company/shifts/Shifts';
import Employees from './pages/user/employees/Employees';
import NewEmployee from './pages/user/employees/NewEmployee';
import SuccessNotifier from './components/elements/SuccessNotifier';
import NewShift from './pages/user/company/shifts/NewShift';
import ShiftDetails from './pages/user/company/shifts/ShiftDetails';

function App() {
  return (
    <Provider store={store}>

        <SuccessNotifier />
        <ErrorNotifier />
        <ScrollToTop >
        
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/signup/:inviteCode" exact element={<Signup />} />
          <Route path="/password-reset" exact element={<RequestPasswordReset />} />
          <Route path="/password-reset/:resetCode" exact element={<ResetPassword />} />
          <Route path="/user" element={<User />}>
            <Route path="/user/" element={<Navigate replace to="/user/home" />} />
            <Route path="/user/home" element={<Home />} />
            <Route path="/user/company">
              <Route path="/user/company/" element={<Navigate replace to="/user/company/departments" />} />
              <Route path="/user/company/departments" element={<Departments />} />
              <Route path="/user/company/groups" element={<Groups />} />
              <Route path="/user/company/designations" element={<Designations />} />
              <Route path="/user/company/shifts" element={<Shifts />} />
              {/* <Route path="/user/company/details/:shiftId" element={<ShiftDetails />} /> */}
              <Route path="/user/company/shifts/details/:shiftId" element={<ShiftDetails />} />
              <Route path="/user/company/shifts/new-shift" element={<NewShift />} />
            </Route>
            <Route path="/user/employees" element={<Employees />} />
            <Route path="/user/employees/new-employee" element={<NewEmployee />} />
            {/* <Route path="/user/transactions" element={<Transactions />} />
            <Route path="/user/support" element={<SupportTickets />} />
            <Route path="/user/profile-settings" element={<ProfileSettings />} /> */}
            
            {/* <Route path="/admin/settings" element={<Settings />}>
              <Route path="/admin/settings/" element={<Navigate replace to="/admin/settings/user-profile" />} />
              <Route path="/admin/settings/user-profile" element={<UserProfile />} />
              <Route path="/admin/settings/team" element={<Team />} />
              <Route path="/admin/settings/security" element={<Security />} />
            </Route> */}
          </Route>
        </Routes>
      </ScrollToTop>
    </Provider>
  );
}

export default App;
