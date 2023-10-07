
import './App.css';
import { Provider } from "react-redux";
import store from "./store/store";
import ErrorNotifier from './components/elements/ErrorNotifier';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
// import AccountActivation from './pages/onboarding/AccountActivation';
// import User from './pages/User';
// import PasswordResetRequest from './pages/auth/PasswordResetRequest';
// import PasswordReset from './pages/auth/PasswordReset';
// import Dashboard from './pages/user/Dashboard';
// import CreateAccount from './pages/onboarding/CreateAccount';
// import 'animate.css';
// import Transactions from './pages/user/Transactions';
// import SupportTickets from './pages/user/support/SupportTickets';
// import ProfileSettings from './pages/user/ProfileSettings';
import ScrollToTop from './components/layout/ScrollToTop';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <Provider store={store}>

        <ErrorNotifier />
        <ScrollToTop >
        
        <Routes>
          <Route path="/" exact element={<Login />} />
          {/* <Route path="/signup" exact element={<CreateAccount />} /> */}
          {/* <Route path="/account-confirmation/:confirmationCode" exact element={<AccountActivation />} />
          <Route path="/password-reset" exact element={<PasswordResetRequest />} />
          <Route path="/password-reset/:resetCode" exact element={<PasswordReset />} /> */}
          {/* <Route path="/user" element={<User />}>
            <Route path="/user/" element={<Navigate replace to="/user/dashboard" />} />
            <Route path="/user/dashboard" element={<Dashboard />} />
            <Route path="/user/transactions" element={<Transactions />} />
            <Route path="/user/support" element={<SupportTickets />} />
            <Route path="/user/profile-settings" element={<ProfileSettings />} /> */}
            
            {/* <Route path="/admin/settings" element={<Settings />}>
              <Route path="/admin/settings/" element={<Navigate replace to="/admin/settings/user-profile" />} />
              <Route path="/admin/settings/user-profile" element={<UserProfile />} />
              <Route path="/admin/settings/team" element={<Team />} />
              <Route path="/admin/settings/security" element={<Security />} />
            </Route> */}
          {/* </Route> */}
        </Routes>
      </ScrollToTop>
    </Provider>
  );
}

export default App;
