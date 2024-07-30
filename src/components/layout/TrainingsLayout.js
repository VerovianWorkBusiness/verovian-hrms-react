import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import UserLayout from './UserLayout';

const TrainingsLayout = ({children, sectionTitle}) => {
    const location = useLocation();
    const currentRoute = location.pathname;
    return (
    <UserLayout pageTitle="Training & Knowledge">

        <div className='w-full flex items-start gap-x-8'>
            <div className='min-w-[250px] p-[15px] rounded bg-verovian-light-purple'>
                <Link to={`/user/trainings/trainings`}>
                    <button className={`w-full flex items-center gap-x-3 px-2 py-1 mb-1`}>
                        <p className={`text-sm ${currentRoute.includes('/trainings/trainings') && 'font-bold text-verovian-purple'}`}>Trainings</p>
                    </button>
                </Link>
                <Link to={`/user/trainings/training-modules`}>
                    <button className='w-full flex items-center gap-x-3 px-2 py-1 mb-1'>
                        <p className={`text-sm ${currentRoute.includes('/trainings/training-modules') && 'font-bold text-verovian-purple'}`}>Training Modules</p>
                    </button>
                </Link>
                <Link to={`/user/trainings/training-materials`}>
                    <button className='w-full flex items-center gap-x-3 px-2 py-1 mb-1'>
                        <p className={`text-sm ${currentRoute.includes('/trainings/training-materials') && 'font-bold text-verovian-purple'}`}>Training Materials</p>
                    </button>
                </Link>
                <Link to={`/user/trainings/instructors`}>
                    <button className='w-full flex items-center gap-x-3 px-2 py-1 mb-1'>
                        <p className={`text-sm ${currentRoute.includes('/trainings/instructors') && 'font-bold text-verovian-purple'}`}>Instructors</p>
                    </button>
                </Link>
            </div>

            <div className='w-full max-w-[100%]'>
                <h3 className='uppercase font-light text-[15px] tracking-[0.2em]'>{sectionTitle}</h3>
                <main>{children}</main>
            </div>
        </div>
    </UserLayout>
    )
}

export default TrainingsLayout