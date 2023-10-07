import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import Logo from '../../../assets/img/logo.png'
import TextField from '@/components/form/TextField';
import FormButton from '@/components/form/FormButton';
import RadioGroup from '@/components/form/RadioGroup';
import ArrowIcon from '@/components/icons/ArrowIcon';
import FileUpload from '@/components/form/FileUpload';
import { useRouter } from 'next/router';
import SelectField from '@/components/form/SelectField';
import DateField from '@/components/form/DateField';

const Signup = () => {
    const [onboardPayload, setOnboardPayload] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
	const [activeStep, setActiveStep] = useState(1);
	const router = useRouter();

	const completeOnboarding = () => {
		router.push('/')
	}

	const educationTypes = [
		{
			label: "Bachelors Degree"
		},
		{
			label: "Masters Degree"
		},
		{
			label: "Doctorate Degree"
		},
	]

	const educationItem = [
		{
			type: '',
			institution: '',
			course: '',
			startDate: '',
			endDate: ''
		}
	]

	const [education, setEducation] = useState([educationItem]);

	const addEducation = () => {
		let tempEducation = [...education]
		tempEducation.push(education)
		setEducation(tempEducation)
	}

	const updateEducation = (index, field, value) => {
		let tempEducation = [...education]
		tempEducation[index][field] = value
		setEducation(tempEducation)
	}

	return (
		<>
			<div className="relative">
				<div className="w-4/12 p-10 rounded border border-gray-10 mx-auto mt-24">
					<Link href="/">
						<a className="flex items-center gap-x-2">
							<Image src={Logo} alt="logo" /><p className="tracking-[0.2em] font-medium mt-[10px]">HRMS</p>
						</a>
					</Link>

					<h3 className='font-montserrat text-lg font-medium dark:text-white mt-8'>Welcome aboard</h3>
					<p className='mt-2 dark:text-gray-500 text-sm'>You&apos;ve gotten here because you have been enrolled on the Verovian HRMS Platform by and administrator.</p>
					<p className='mt-4 dark:text-gray-500 text-sm'>Please provide your details in the following steps to complete your onboarding</p>
					
					{activeStep === 1 && <>
						<p className='text-sm text-gray-500 mt-6'><span className='text-black fon-medium'>STEP 1:</span> Personal Information</p>
						<div className='mt-3 w-full'>
							<TextField
								inputLabel="First name" 
								inputPlaceholder="Your given name" 
								fieldId="first-name" 
								inputType="first-name" 
								hasError={validationErrors.firstName} 
								returnFieldValue={(value)=>{setOnboardPayload({...onboardPayload, ...{firstName: value}})}}
							/>
						</div>
						
						<div className='mt-6 w-full'>
							<TextField
								inputLabel="Middle name" 
								inputPlaceholder="Middle name" 
								fieldId="middle-name" 
								inputType="text" 
								hasError={validationErrors.middleName} 
								returnFieldValue={(value)=>{setOnboardPayload({...onboardPayload, ...{middleName: value}})}}
							/>
						</div>
						
						<div className='mt-6 w-full'>
							<TextField
								inputLabel="Last name" 
								inputPlaceholder="Your surname" 
								fieldId="last-name" 
								inputType="text" 
								hasError={validationErrors.lastName} 
								returnFieldValue={(value)=>{setOnboardPayload({...onboardPayload, ...{lastName: value}})}}
							/>
						</div>

						<div className='mt-6 w-full'>
							<RadioGroup
								inputLabel="Gender"
								items={[
									{label: 'Female'},
									{label: 'Male'},
								]} 
								hasError={validationErrors.gender} 
								returnSelected={(value)=>{setOnboardPayload({...onboardPayload, ...{gender: value.label}})}}
							/>
						</div>

						<p className='mt-4 dark:text-gray-500 text-sm mb-2'>Create your password to use and access this platform. please choose a strong password</p>
						<div className='mb-4 w-full'>
							<TextField
								inputLabel="Password" 
								inputPlaceholder="Your password" 
								fieldId="password" 
								inputType="password" 
								hasError={validationErrors.password} 
								returnFieldValue={(value)=>{setOnboardPayload({...onboardPayload, ...{password: value}})}}
							/>
						</div>

						<div className='animate__animated animate__fadeIn mb-4 mt-8 w-full'>
							<FormButton 
								buttonLabel={<span className='flex items-center gap-x-2 text-sm'>Continue <ArrowIcon className={`-4 h-4 transform -rotate-90`} /></span>} 
								buttonAction={()=>{setActiveStep(2)}} />
							{/* <Link to="/admin" className='block w-full p-4 bg-black text-white text-center text-md rounded-md transition duration-200 hover:bg-allawee-ink-navy'>Login to your account</Link> */}
						</div>
					</>}
					
					{activeStep === 2 && <>
						<p className='text-sm text-gray-500 mt-6'><span className='text-black fon-medium'>STEP 2:</span> Education</p>
						{education.map((item, itemIndex)=>(<div key={itemIndex} className='w-full border rounded p-3 mb-5'>
							<div className='mt-3 w-full'>
								<SelectField
									selectOptions={educationTypes}
									inputLabel="Select education type"
									titleField="label"
									displayImage={false}
									imageField=""
									preSelected=''
									fieldId="account"
									hasError={false}
									// return id of accounts of the selected option
									returnFieldValue={(value) => {updateEducation(itemIndex, 'type', value.label)}}
								/>
							</div>
							
							<div className='mt-6 w-full'>
								<TextField
									inputLabel="Institution" 
									inputPlaceholder="Name of institution" 
									fieldId="institution-name" 
									inputType="text" 
									hasError={validationErrors.institution} 
									returnFieldValue={(value) => {updateEducation(itemIndex, 'institution', value)}}
								/>
							</div>
							
							<div className='mt-6 w-full'>
								<TextField
									inputLabel="Course" 
									inputPlaceholder="Which course did you study here?" 
									fieldId="middle-name" 
									inputType="text" 
									hasError={validationErrors.course} 
									returnFieldValue={(value) => {updateEducation(itemIndex, 'course', value.label)}}
								/>
							</div>

							<div className='mt-6 w-full flex items-center justify-between gap-x-6'>
								<div className='w-full'>
									<DateField
										inputLabel="Start date" 
										inputPlaceholder="" 
										fieldId="education-start-date" 
										inputType="date" 
										hasError={validationErrors.course} 
										returnFieldValue={(value) => {updateEducation(itemIndex, 'startDate', value)}}
									/>
								</div>
								<div className='w-full'>
									<DateField
										inputLabel="End date" 
										inputPlaceholder="" 
										fieldId="education-end-date" 
										inputType="date" 
										hasError={validationErrors.course} 
										returnFieldValue={(value) => {updateEducation(itemIndex, 'endDate', value)}}
									/>
								</div>
							</div>
						</div>))}

						<button className='rounded bg-verovian-light-purple p-3 text-verovian-purple text-sm' onClick={()=>{addEducation()}}>Add Education</button>

						<div className='animate__animated animate__fadeIn mb-4 mt-8 w-full'>
							<FormButton 
								buttonLabel={<span className='flex items-center gap-x-2 text-sm'>Continue <ArrowIcon className={`-4 h-4 transform -rotate-90`} /></span>} 
								buttonAction={()=>{setActiveStep(3)}} />
							{/* <Link to="/admin" className='block w-full p-4 bg-black text-white text-center text-md rounded-md transition duration-200 hover:bg-allawee-ink-navy'>Login to your account</Link> */}
						</div>
					</>}
					
					{activeStep === 3 && <>
						<p className='text-sm text-gray-500 mt-6'><span className='text-black fon-medium'>STEP 2:</span> Documentation</p>
						<p className='mt-3 dark:text-gray-500 text-sm'>Please upload or sign-off the following required documents </p>
						
						<div className='mt-3 w-full'>

							<FileUpload
								hasError={false}
								fieldLabel="Your current resume"
								returnFileDetails={(details)=>{
									// acceptFile(details)
								}}
								acceptedFormats={['pdf', 'doc', 'docx']}
								// triggerNotification={(value)=>{triggerNotification(value)}}
							/>
							
						</div>
						
						<div className='mt-3 w-full'>

							<FileUpload
								hasError={false}
								fieldLabel="Your NYSC Certificate"
								returnFileDetails={(details)=>{
									// acceptFile(details)
								}}
								acceptedFormats={['pdf', 'jpg', 'png']}
								// triggerNotification={(value)=>{triggerNotification(value)}}
							/>
							
						</div>


						<div className='animate__animated animate__fadeIn mb-4 mt-8 w-full flex items-center gap-x-4 justify-between'>
								<div className='w-4/12'>
									<button className='flex items-center justify-center gap-x-3 text-gray-500 text-sm'>
										<ArrowIcon className={`w-4 h-4 transform rotate-90`} /> Go back
									</button>
								</div>
								<div className='w-8/12'>
									<FormButton buttonLabel={<span className='text-sm'>Complete onboarding</span>} buttonAction={()=>{completeOnboarding()}} />
								</div>
							{/* <Link to="/admin" className='block w-full p-4 bg-black text-white text-center text-md rounded-md transition duration-200 hover:bg-allawee-ink-navy'>Login to your account</Link> */}
						</div>
					</>}
					
					
					{/* <div className='animate__animated animate__fadeIn w-full text-center mt-3'>
						<p className='text-gray-400 text-sm'>Forgot your password? <Link href="" className='text-blue-500 dark:text-kt-orange font-medium' to='password-reset'>Click here</Link> to get a new one</p>
					</div> */}
				</div>
			</div>

		</>
	);
}

export default Signup