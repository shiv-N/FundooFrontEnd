import React from 'react';
// import './App.css';
import SignIn from './Component/SignIn';
import Registration from './Component/Registration';
import ForgetPassword from './Component/ForgetPassword';
import resetPassword from './Component/ResetPassword';
import {BrowserRouter,Route} from 'react-router-dom';
import Dashboard from './Component/Dashboard';
import Note from './Component/Note';
import Reminder from './Component/Reminder';
import Trash from './Component/Trash';
import Label from './Component/Label';
import Archive from './Component/ArchiveDisplay';
import {Provider} from 'react-redux'
import store from '../src/Redux/Store'

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter> 
        <Route path = "/" exact component = {SignIn} />
        <Route path = "/register" component = {Registration} />
        <Route path = "/forget" component = { ForgetPassword } />
        <Route path = "/reset/:token" component = { resetPassword } />
        <Route path = "/dashboard" component = { Dashboard } />
        <Route path = "/dashboard/note" component = { Note } />
        <Route path = "/dashboard/reminder" component = { Reminder } />
        <Route path = "/dashboard/archive" component = { Archive } />
        <Route path = "/dashboard/trash" component = { Trash } />
        <Route path = "/dashboard/label" component = { Label } />
     </BrowserRouter>
     </Provider>
  );
}

export default App;
