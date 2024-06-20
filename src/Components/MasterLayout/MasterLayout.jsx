import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import BackToTop from '../BackToTop/BackToTop'


export default function MasterLayout({userTokenProfile, setUserTokenProfile}) {
  let navigate= useNavigate()
  let logOut = ()=>{
    // <Navigate to='/log'/>
    localStorage.removeItem("userToken");
    setUserTokenProfile(null);
    navigate("/log")
  }
  return (
    <>
    <BackToTop/>
    <Navbar userTokenProfile={userTokenProfile} logOut={logOut}/>
    <Outlet/>
    
    </>
  )
}
