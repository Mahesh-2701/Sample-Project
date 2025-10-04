import React from 'react'
import {Link} from "react-router-dom"

export default function Navbar() {

  let isAuth = localStorage.getItem("token")
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Sample Project</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto d-flex gap-2 mb-2 mb-lg-0">

        { isAuth ? (
            <>
            <li class="nav-item">
          <Link to="/" className="btn btn-primary">Home</Link>
        </li>
        <li class="nav-item">
          <Link to="/logout" className="btn btn-outline-danger rounded-pill">Logout</Link>
        </li>
            </>
        ) : (
          <>
             <li class="nav-item">
          <Link to="/signin" className="btn btn-outline-primary rounded-pill">Signin</Link>
        </li>
         <li class="nav-item">
          <Link to="/login" className="btn btn-primary rounded-pill">Login</Link>
        </li>
          </>
        )

          
        }
        
      
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}
