import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import baseUrl from "@/utils/baseUrl";

import Logo from '../../assets/img/logo.png'
import TextField from '../../components/elements/form/TextField';
import FormButton from '../../components/elements/form/FormButton';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ERROR } from '../../store/types';

const Login = () => {
    const [authPayload, setAuthPayload] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const validateForm = () => {
        let errors = {}
        if (!authPayload.email || authPayload.email === '') {
            errors.email = true
        }
        if (!authPayload.password || authPayload.password === '') {
            errors.password = true
        }

        setValidationErrors(errors)
        return errors
    }

    const logInUser = async () => {
        if (Object.values(validateForm()).includes(true)) {
            dispatch({
                type: ERROR,
                error: {response: {data: {
                    message: 'Please check the highlighted fields'
                }}}
            });
            return
        }
        
        setProcessing(true)

        const requestPayload = {
            email: authPayload.email,
            password: authPayload.password,
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/sessions`, requestPayload)
            localStorage.setItem("accessToken", JSON.stringify(response.data.data.accessToken));
            navigate('user')
            // if(queryValues.returnUrl && queryValues.returnUrl !== '') {
            //     navigate(queryValues.returnUrl)
            // } else {
            //     navigate("/admin");
            // }

        } catch (error) {
            console.log(error.response)
            dispatch({
                type: ERROR,
                error: error
            });
            setProcessing(false)
        }
    }
    
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
                    <FormButton buttonLabel="Login to your account" buttonAction={()=>{logInUser()}} processing={processing} />
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