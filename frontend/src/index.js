import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Siginpage from "./pages/siginpage"
import Loginpage from "./pages/loginpage"
import Protectedroute from './components/protectedroute';
import Logout from './pages/logout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Router>
  <Routes>
    <Route exact path="/signin" element={<Siginpage/>}></Route>
    <Route exact path="/login" element={<Loginpage/>}></Route>
    
    <Route element={<Protectedroute></Protectedroute>}>
        <Route exact path='/' element={<App></App>}></Route>
    </Route>
      
    <Route exact path='/logout' element={<Logout></Logout>}></Route>
  </Routes>
 </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
