import React from 'react'
import errImage from '../../images/notfound.jpg'

export default function Notfound() {
  return (
    <>
    <div className="d-flex justify-content-center align-items-center">
    <img src={errImage} className="w-75" alt="" />
    </div>
    
    </>
  )
}
