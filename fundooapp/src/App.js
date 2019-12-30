import React from 'react';
// import './App.css';
import Login from './Component/Login';
import SignUp from './Component/SignUp';
import {BrowserRouter,Route} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Route path = "/" exact component = {Login} />
        <Route path = "/signup" component = {SignUp} />
      </div>
     </BrowserRouter>
  );
}

export default App;
