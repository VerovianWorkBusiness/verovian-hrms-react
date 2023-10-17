import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const CompanyPageLayout = ({sectionTitle, children}) => {
    const location = useLocation();
    const currentRoute = location.pathname;
    return (
        <div className='w-full flex items-start gap-x-8'>
            <div className='w-[250px] p-[15px] rounded bg-verovian-light-purple'>
                <Link to={`/user/company/departments`}>
                    <button className={`w-full flex items-center gap-x-3 px-2 py-1 mb-1`}>
                        {/* <HomeIcon className={`w-5 h-5 text-black`} /> */}
                        <p className={`text-sm ${currentRoute.includes('/company/departments') && 'font-bold text-verovian-purple'}`}>Departments</p>
                    </button>
                </Link>
                <Link to={`/user/company/designations`}>
                    <button className='w-full flex items-center gap-x-3 px-2 py-1 mb-1'>
                        {/* <HomeIcon className={`w-5 h-5 text-black`} /> */}
                        <p className={`text-sm ${currentRoute.includes('/company/designations') && 'font-bold text-verovian-purple'}`}>Designations</p>
                    </button>
                </Link>
                <Link to={`/user/company/groups`}>
                    <button className='w-full flex items-center gap-x-3 px-2 py-1 mb-1'>
                        {/* <HomeIcon className={`w-5 h-5 text-black`} /> */}
                        <p className={`text-sm ${currentRoute.includes('/company/groups') && 'font-bold text-verovian-purple'}`}>Groups</p>
                    </button>
                </Link>
                <Link to={`/user/company/shifts`}>
                    <button className='w-full flex items-center gap-x-3 px-2 py-1 mb-1'>
                        {/* <HomeIcon className={`w-5 h-5 text-black`} /> */}
                        <p className={`text-sm ${currentRoute.includes('/company/shifts') && 'font-bold text-verovian-purple'}`}>Shifts</p>
                    </button>
                </Link>

            </div>

            <div className='w-full'>
                <h3 className='uppercase font-light text-[15px] tracking-[0.2em]'>{sectionTitle}</h3>
                <main>{children}</main>
            </div>
        </div>
    )
}

export default CompanyPageLayout