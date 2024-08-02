import React, { useState } from 'react'
import Logo from '../../assets/img/logo.png'
import TextField from '../../components/elements/form/TextField';
import { Link } from 'react-router-dom';


const ResetPassword = () => {
    const [authPayload, setAuthPayload] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
	return (
		<>

			<div className="w-full flex items-center justify-center h-screen">
				<div className="w-4/12 p-10 rounded border">
					<Link href="/">
						<span className="flex items-center gap-x-2">
							<img src={Logo} alt="logo" /><p className="tracking-[0.2em] font-medium mt-[10px]">HRMS</p>
						</span>
					</Link>

					<h3 className='font-montserrat text-2xl font-medium dark:text-white mt-8'>Create password?</h3>
					<p className='mt-2 dark:text-gray-500'>Choose your new password below</p>
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

					<div className='animate__animated animate__fadeIn mb-4 mt-8 w-full'>
						{/* <FormButton buttonLabel="Create new password" buttonAction={()=>{logInUser()}} /> */}
						<Link to="/user" className='w-full p-3 rounded bg-verovian-purple hover:bg-black border border-transparent dark:hover:bg-kt-navy-dark font-outfit text-white text-md transition duration-200 flex items-center justify-center'>Login to your account</Link>
					</div>
					
					<div className='animate__animated animate__fadeIn w-full text-center mt-3'>
						<p className='text-gray-400 text-sm'><Link href="/" className='text-blue-500 dark:text-kt-orange font-medium' to='password-reset'>Click here</Link> to go back to log in page</p>
					</div>
				</div>
			</div>

		</>
    )
}

export default ResetPassword