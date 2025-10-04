import React, { useState } from 'react'
import axios from "axios"
import {toast , ToastContainer} from "react-toastify"
import { Link } from 'react-router-dom';

export default function Signin() {

    const [user,setUser] = useState({
        name:"",
        email:"",
        password:"",
        address:"",
        gender:""
    });

    const [file,setFile] = useState(null);

    function updatechange(eve){
        setUser({...user,[eve.target.name]:eve.target.value})
    }

    function updatefile(eve){
        setFile(eve.target.files[0])
    }

    function signin(eve){
        eve.preventDefault();

        const userdata = new FormData();
        userdata.append("image",file)
        userdata.append("name",user.name)
        userdata.append("email",user.email)
        userdata.append("password",user.password)
        userdata.append("gender",user.gender)
        userdata.append("address",user.address)

        console.log(process.env.REACT_APP_URL+"/signin")

        axios.post(process.env.REACT_APP_URL+"/signin",userdata)
         .then((res)=>toast.success(res.data.message))
         .catch((err)=>toast.error(err.response.data.message))

         console.log(userdata)
    }
  return (
    <div>

    <section className='container'>
       <div className='d-flex flex-column gap-2  justify-content-center align-items-center'>
         <h2>Signin</h2>
        <form onSubmit={signin} className='d-flex w-50 shadow-lg p-3 rounded-3 flex-column gap-2'> 

         <label>Photo</label>
         <input type="file" className='form-control' onChange={updatefile}  name='image'/>

         <label>Name</label>
         <input type="text" className='form-control' onChange={updatechange} placeholder='name' name='name' required />

         <label>Email</label>
         <input type="email" className='form-control' onChange={updatechange} placeholder='email' name="email" required />

         <label>Password</label>
         <input type="password" className='form-control' onChange={updatechange} placeholder='password' name='password' required />

         <label>Gender</label>
        <div class="form-check">
        <input class="form-check-input" type="radio" name="gender" onChange={updatechange} value={"male"} id="radioDefault1"/>
        <label class="form-check-label" for="radioDefault1">
          Male
        </label>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="radio" name="gender" onChange={updatechange} value={"female"} id="radioDefault2" />
        <label class="form-check-label" for="radioDefault2">
            Female
        </label>
        </div>

         <label>Address</label>
         <textarea rows={4} cols={10}  placeholder='address' className='form-control' onChange={updatechange} name="address">Address</textarea>

         <input type='submit' className='btn btn-primary' value={"submit"}/>
         <Link to="/login" className="a text-decoration-none text-center">Already Have an Acoount?</Link>
        </form>
       </div>
    </section>
    <ToastContainer></ToastContainer>
    </div>
  )
}
