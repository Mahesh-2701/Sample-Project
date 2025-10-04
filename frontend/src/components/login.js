import React, { useState } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
        
    let navigate = useNavigate()
     const [user,setUser] = useState({
         email:"",
         password:"",

     });
  
     function updatechange(eve){
         setUser({...user,[eve.target.name]:eve.target.value})
     }
 
 
     function login(eve){
         eve.preventDefault();
 
         axios.post(process.env.REACT_APP_URL+"/login",user)
                 .then((res)=>{toast.success(res.data.message) ; localStorage.setItem("token",res.data.token);
                  localStorage.setItem("id",res.data.id);
                  navigate("/")

                })
                 .catch((err)=>toast.error(err.response.data.message))
     }
   return (
     <div>
 
     <section className='container'>
        <div className='d-flex flex-column gap-2  justify-content-center align-items-center'>
          <h2>Login</h2>
 
         <form onSubmit={login} className='d-flex w-50 shadow-lg p-3 rounded-3 flex-column gap-2'> 
 
          <label>Email</label>
          <input type="email" className='form-control' onChange={updatechange} placeholder='email' name="email" required />
 
          <label>Password</label>
          <input type="password" className='form-control' onChange={updatechange} placeholder='password' name='password' required />

          <input type='submit' className='btn btn-primary' value={"submit"}/>

          <Link to="/signin" className="a text-decoration-none text-center">Don't Have an Account?</Link>
         </form>
        </div>
        <ToastContainer></ToastContainer>
     </section>
     
     </div>
   )
}
