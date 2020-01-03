import React from 'react';
// import './App.css';
import SignIn from './Component/SignIn';
import Registration from './Component/Registration';
import ForgetPassword from './Component/ForgetPassword';
import resetPassword from './Component/ResetPassword';
import {BrowserRouter,Route} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Route path = "/" exact component = {SignIn} />
        <Route path = "/register" component = {Registration} />
        <Route path = "/forget" component = { ForgetPassword } />
        <Route path = "/reset/:token" component = { resetPassword } />
      </div>
     </BrowserRouter>
  );
}

export default App;
