import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import baseUrl from "@/utils/baseUrl";

import Logo from '../../assets/img/logo.png'
import TextField from '../../components/elements/form/TextField';

const Login = () => {
    const [authPayload, setAuthPayload] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    return (
        <div className="w-full flex items-center justify-center h-screen">
            <div className="w-4/12 p-10 rounded border">
                <Link to="/">
                    <span className="flex items-center gap-x-2">
                        <img src={Logo} alt="logo" /><p className="tracking-[0.2em] font-medium mt-[10px]">HRMS</p>
                    </span>
                </Link>

                <h3 className='font-montserrat text-2xl font-medium dark:text-white mt-8'>Welcome back</h3>
                <p className='mt-2 dark:text-gray-500 text-sm'>Please provide your account details below to log in to your account</p>
                <div className='mt-6 w-full'>
                    <TextField
                        inputLabel="Email Address" 
                        inputPlaceholder="Your registered email address" 
                        fieldId="email" 
                        inputType="email" 
                        hasError={validationErrors.email} 
                        returnFieldValue={(value)=>{setAuthPayload({...authPayload, ...{email: value}})}}
                    />
                </div>

                <div className='my-4 w-full'>
                    <TextField
                        inputLabel="Password" 
                        inputPlaceholder="Your password" 
                        fieldId="password" 
                        inputType="password" 
                        hasError={validationErrors.password} 
                        returnFieldValue={(value)=>{setAuthPayload({...authPayload, ...{password: value}})}}
                    />
                </div>


                <div className='animate__animated animate__fadeIn mb-4 mt-8 w-full'>
                    {/* <FormButton buttonLabel="Login to your account" buttonAction={()=>{logInUser()}} /> */}
                    <Link href="">
                        <button className='w-full p-3 rounded bg-verovian-purple text-verovian-light-purple hover:bg-black border border-transparent dark:hover:bg-black text-md transition duration-200 flex items-center justify-center'>
                        Login to your account
                        </button>
                    </Link>
                </div>
                
                <div className='animate__animated animate__fadeIn w-full text-center mt-3'>
                    <p className='text-gray-400 text-sm'>Forgot your password? <Link href="auth/reset-password" className='text-blue-500 dark:text-kt-orange font-medium' to='password-reset'>Click here</Link> to get a new one</p>
                </div>
            </div>
        </div>
    )
}
// 
export default Login