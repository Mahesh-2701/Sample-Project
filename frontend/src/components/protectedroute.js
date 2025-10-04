import React from 'react'
import Login from './login';
import { Navigate,Outlet } from 'react-router-dom';

export default function Protectedroute() {
  
  let isAuth = localStorage.getItem("token") ? true : false;

  if(!isAuth){

     return <Navigate to="/login"></Navigate>

  }
  else{
       
      return <Outlet/>
  }
}
