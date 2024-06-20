import React from 'react'

export default function Profile({userTokenProfile}) {
    console.log(userTokenProfile)
    let {name, role}= userTokenProfile;

  return (
    <>
    <div className="user py-5 my-5 m-auto rounded-5 w-75 bg-gradient text-start px-5 ">
        <p className='fs-2'>User Name : {name}</p>
        <p className='fs-2'>Role : {role}</p>
    </div>
    
    </>
  )
}
