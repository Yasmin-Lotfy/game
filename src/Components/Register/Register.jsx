import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from './Register.module.scss'
import joi from 'joi'

export default function Register() {

const [user, setUser] = useState({
  "name":'',
  "email":'',
  "password":'',
  "rePassword":"",
  "phone":""
});


const navigate = useNavigate();
const [errorMsg, setErrorMsg] = useState('');

const [validError, setValidError] = useState([]);

  let getInputValue = (e)=>{
    let myUser = {...user};
    myUser[e.target.name]= e.target.value;
    setUser(myUser)
  }

  // joi data validation function
  let ValidationFormData = ()=>{
    const schema = joi.object({
        name: joi.string().alphanum().min(2).max(10).required(),
        email: joi.string().email({ tlds: { allow: false } }),
        password: joi.string().required(),
        rePassword: joi.string().required(),
        phone: joi.number().integer().required(),

       })
    return schema.validate(user,({abortEarly:false}));
  }
// submit function to send data to api
//but first it validate the data 
  let submitForm = async(e)=>{
    e.preventDefault()
    let validationResponse = ValidationFormData();
// قبل ما ببعت الداتا بروح اتشيك ال validation joi 

    if(validationResponse.error){
      //error from joi validation 
      setValidError(validationResponse.error.details);
       }else{
        // calling api 
        let {data} =await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', user);
        console.log(data);
        if(data.message === "success"){
          goToLogin()
        }else{
          //error from api
          setErrorMsg(data.message)
          console.log("error")
        }
    }
    
  }
  // function to navigate for login component
  let goToLogin= ()=>{
    navigate('/log')
  }
  return (
    <>
    <div className="container">
        <div className="row mt-5 shadow-lg">
            <div className={`col-lg-6 ${style.imageDisplay}`}>
                
            </div>
            <div className={`col-lg-6 px-5 ${style.bgForm}`}>
                <h3  className='pt-2 text-center text-muted'>Create My Account!</h3>
                {errorMsg? <p className='alert alert-danger'>{errorMsg}</p>:''}
                <form onSubmit={submitForm}>
                    <div className="form-name d-flex">
                    
                        <input onChange={getInputValue} type="text" className='form-control w-100' placeholder='First Name' name='name' />
                        {validError.map((error, index)=> error.context.label === "name"? <p className='mt-2 alert alert-warning me-2 py-1 px-3'>{error.message}</p>:'')}
                        </div>

                        
                 
                    <input onChange={getInputValue} type="email" className='form-control w-100 ' placeholder='Email' name="email"/>
                    {validError.map((error, index)=> error.context.label === "email"? <p className='mt-2 alert alert-warning py-1 px-3'>{error.message}</p>:'')}
                    <input onChange={getInputValue} type="password" className='form-control w-100 ' placeholder='password' name="password"/>
                    {validError.map((error, index)=> error.context.label === "password"? <p className='mt-2 alert alert-warning py-1 px-3'>Invalid Password</p>:'')}

                    <input onChange={getInputValue} type="password" className='form-control w-100 ' placeholder='rePassword' name="rePassword"/>
                    {validError.map((error, index)=> error.context.label === "rePassword"? <p className='mt-2 alert alert-warning py-1 px-3'>Invalid Password</p>:'')}

                    <input onChange={getInputValue} type="number" className='form-control w-100 ' placeholder='Phone' name="phone"/>
                    {validError.map((error, index)=> error.context.label === "phone"? <p className='mt-2 alert alert-warning py-1 px-3'>{error.message}</p>:'')}
                    
        
                    <button type='submit' class={`w-100 mb-2 text-white btn ${style.btnControl}`}> Create Account</button>
                  </form>
                <p className={`text-center text-muted`}>This site is protected by reCAPTCHA and the Google<a href='https://policies.google.com/privacy'>  Privacy Policy</a> and <a href="https://policies.google.com/terms"> Terms of Service</a> apply</p>
                <h6 className='text-muted text-center'>Already a member? 
                <span className={style.gotoLogin} onClick={goToLogin}> Log In</span>
                </h6>
            </div>
        </div>
    </div>
    </>
  )
}
