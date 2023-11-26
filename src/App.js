
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
import Holidays from './pages/user/holiday-management/Holidays';
import News from './pages/user/news/News';
import NewsArticle from './pages/user/news/NewsArticle';
import NewArticle from './pages/user/news/NewArticle';
import DepartmentDetails from './pages/user/company/departments/DepartmentDetails';
import EmployeeDetails from './pages/user/employees/EmployeeDetails';
import Documents from './pages/user/documents/Documents';
import Document from './pages/user/documents/Document';
import NewDocument from './pages/user/documents/NewDocument';
import LeaveApplications from './pages/user/holiday-management/leaves/LeaveApplications';
import Leaves from './pages/user/holiday-management/leaves/Leaves';
import NewLeaveApplication from './pages/user/holiday-management/leaves/NewLeaveApplication';
import LeaveApplication from './pages/user/holiday-management/leaves/LeaveApplication';
import EditArticle from './pages/user/news/EditArticle';

function App() {
  return (
    <Provider store={store}>

        <SuccessNotifier />
        <ErrorNotifier />
        <ScrollToTop >
        
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/signup/:invitationCode" exact element={<Signup />} />
          <Route path="/password-reset" exact element={<RequestPasswordReset />} />
          <Route path="/password-reset/:resetCode" exact element={<ResetPassword />} />
          <Route path="/user" element={<User />}>
            <Route path="/user/" element={<Navigate replace to="/user/home" />} />
            <Route path="/user/home" element={<Home />} />
            <Route path="/user/company">
              <Route path="/user/company/" element={<Navigate replace to="/user/company/departments" />} />
              <Route path="/user/company/departments" element={<Departments />} />
              <Route path="/user/company/departments/details/:departmentId" element={<DepartmentDetails />} />
              
              <Route path="/user/company/groups" element={<Groups />} />
              <Route path="/user/company/designations" element={<Designations />} />
              
              {/* <Route path="/user/company/details/:shiftId" element={<ShiftDetails />} /> */}
              <Route path="/user/company/shifts" element={<Shifts />} />
              <Route path="/user/company/shifts/details/:shiftId" element={<ShiftDetails />} />
              <Route path="/user/company/shifts/new-shift" element={<NewShift />} />
            </Route>
            
            <Route path="/user/documents" element={<Documents />} />
            <Route path="/user/documents/details/:documentId" element={<Document />} />
            <Route path="/user/documents/new-document" element={<NewDocument />} />
            
            <Route path="/user/news" element={<News />} />
            <Route path="/user/news/article/read/:articleId" element={<NewsArticle />} />
            <Route path="/user/news/article/edit/:articleId" element={<EditArticle />} />
            <Route path="/user/news/new-article" element={<NewArticle />} />
            
            <Route path="/user/employees" element={<Employees />} />
            <Route path="/user/employees/profile/:employeeId" element={<EmployeeDetails />} />

            <Route path="/user/leaves-holidays" element={<Holidays />}>
              <Route path="/user/leaves-holidays/" element={<Navigate replace to="/user/leaves-holidays/holidays" />} />
              <Route path="/user/leaves-holidays/holidays" element={<Holidays />} />
              <Route path="/user/leaves-holidays/leave-applications" element={<LeaveApplications />} />
              <Route path="/user/leaves-holidays/leave-applications/new-application" element={<NewLeaveApplication />} />
              <Route path="/user/leaves-holidays/leave-applications/details/:applicationId" element={<LeaveApplication />} />
              <Route path="/user/leaves-holidays/leaves" element={<Leaves />} />
            </Route>
            
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
