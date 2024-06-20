import React from 'react'
import { useNavigate, Navigate } from 'react-router-dom'


export default function ProtectedRoute(props) {
    // let navigate = useNavigate();
if(!localStorage.getItem("userToken")){
    return <Navigate to="/log"/>
}else{
    return props.children
}

}
