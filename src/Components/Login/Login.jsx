import axios from 'axios'
import React, {  useState } from 'react'
import style from './Login.module.scss'
import logo from '../../images/logo.png'
import {  useNavigate } from 'react-router-dom'
import joi from 'joi'




export default function Login({getuserDataToken}) {
  let navigate = useNavigate()
  const [user, setUser] = useState({
    "email":'',
    "password":'',
  });

  const [validError, setValidError] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');


  let getInputValue = (e)=>{
    let myUser = {...user};
    myUser[e.target.name]= e.target.value;
    setUser(myUser)
  }
  
  let gotoReg = ()=>{
    navigate('/reg')
  }
  

  let submitForm = async(e)=>{
    e.preventDefault()
    
    let validationResponse = ValidationFormData();

    if(validationResponse.error){
      setValidError(validationResponse.error.details);
       }else{
        let {data} =await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', user);
        if(data.message === "success"){
          console.log(data.token)
          localStorage.setItem("userToken", data.token)
          getuserDataToken()
          goToHome()
        }else{
          setErrorMsg(data.message)
        }
    }
    
  }

  let goToHome = ()=>{
    navigate("/")
  }

  // joi data validation function
  let ValidationFormData = ()=>{
    const schema = joi.object({
        email: joi.string().required().email({ tlds: { allow: ['com', 'net'] } }),
        password: joi.string().required(),
      })
    return schema.validate(user,({abortEarly:false}));
  }

  return (
    <>
     <div className="container">
        <div className="row mt-5 shadow-lg">
            <div className={`col-lg-6 ${style.imageDisplay}`}>
                
            </div>
            <div className={`col-lg-6  text-center px-5 ${style.bgForm}`}>
              <img src={logo} className='w-25' />
                <h3  className='pt-2 text-center text-muted'>Log in to GameOver</h3>
                {/* {errorMsg? <p className='alert alert-danger'>{errorMsg}</p>:''} */}
                <form onSubmit={submitForm}>
                  <input type="email" onChange={getInputValue} className={`form-control w-100 ${style.customInput}`} placeholder='Email' name="email"/>
                  {validError.map((error, index)=> error.context.label === "email"? <p className='mt-2 alert alert-warning py-1 px-3'>{error.message}</p>:'')}

                  <input type="password" onChange={getInputValue} className={`form-control w-100 ${style.customInput}`}  placeholder='Password' name="password"/>
                  {validError.map((error, index)=> error.context.label === "password"? <p className='mt-2 alert alert-warning py-1 px-3'>Invalid Password</p>:'')}

                  <button class={`w-100 mb-2 text-white btn ${style.btnControl}`}> Log In</button>
                </form>
                <h6  className={`text-muted text-center my-3 ${style.gotoReg}`} onClick={gotoReg}>Forget Password?</h6>
                <h6 className='text-muted text-center my-3'>Not a member yet?  
                <span className={style.gotoReg} onClick={gotoReg}> Create Account</span>
                </h6>
            </div>
        </div>
    </div>
    </>
  )
}
