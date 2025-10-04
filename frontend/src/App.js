import React, { useEffect, useState } from 'react'
import Navbar from './components/navbar'
import Footer from './components/footer'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function App() {
    
  const [user,setUser] = useState({
    name:"",
    email:"",
    address:"",
    image:""

  });

  useEffect(()=>{
    console.log(process.env.REACT_APP_URL+"/index/"+localStorage.getItem("id"))
    axios.get(process.env.REACT_APP_URL+"/index/"+localStorage.getItem("id"),{ headers:{Authorization:"Bearer "+localStorage.getItem("token")}})
    .then((res)=>setUser(res.data))
    .catch((err)=>toast.error("Server Error"+err.response.data.message))
  },[])

  return (
    <div>
      <Navbar></Navbar>

      <section className='container'>
        
        <h2>Profile Page</h2>

        <div className='shadow-lg p-4'>
           <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <div className="bg-blue-500 h-24"></div>
      <div className="relative px-6 pb-6">
        <div className="absolute -top-12 left-1/2 d-flex justify-content-center transform -translate-x-1/2">
          <img
            src={process.env.REACT_APP_URL+user.image}
            alt="User"
            className="w-24 h-24 rounded-full border-4 border-white rounded shadow-md object-cover" width="150px" height="150px" 
          />
        </div>
        <div className="mt-14 text-center">
          <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-500 text-sm">{user.email}</p>
          <p className="mt-2 text-gray-600">{user.address}</p>
        </div>

      </div>
    </div>
        </div>
         
      </section>

      <Footer></Footer>
    </div>
  )
}
