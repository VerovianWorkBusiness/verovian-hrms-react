import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import UserLayout from './UserLayout';


const LeavesHolidaysLayout = ({children, sectionTitle}) => {
    const location = useLocation();
    const currentRoute = location.pathname;
    return (
    <UserLayout pageTitle="Leaves and Holidays">

        <div className='w-full flex items-start gap-x-8'>
            <div className='w-[250px] p-[15px] rounded bg-verovian-light-purple'>
                <Link to={`/user/leaves-holidays/holidays`}>
                    <button className={`w-full flex items-center gap-x-3 px-2 py-1 mb-1`}>
                        <p className={`text-sm ${currentRoute.includes('/leaves-holidays/holidays') && 'font-bold text-verovian-purple'}`}>Holidays</p>
                    </button>
                </Link>
                <Link to={`/user/leaves-holidays/leave-applications`}>
                    <button className='w-full flex items-center gap-x-3 px-2 py-1 mb-1'>
                        <p className={`text-sm ${currentRoute.includes('/leaves-holidays/leave-applications') && 'font-bold text-verovian-purple'}`}>Leave Applications</p>
                    </button>
                </Link>
                <Link to={`/user/leaves-holidays/leaves`}>
                    <button className='w-full flex items-center gap-x-3 px-2 py-1 mb-1'>
                        <p className={`text-sm ${currentRoute.includes('/leaves-holidays/leaves') && 'font-bold text-verovian-purple'}`}>Leaves</p>
                    </button>
                </Link>
            </div>

            <div className='w-full'>
                <h3 className='uppercase font-light text-[15px] tracking-[0.2em]'>{sectionTitle}</h3>
                <main>{children}</main>
            </div>
        </div>
    </UserLayout>
    )
}

export default LeavesHolidaysLayout