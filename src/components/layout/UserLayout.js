import React from 'react'
import Logo from '../../assets/img/logo.png'
import HomeIcon from '../elements/icons/HomeIcon'
import NewspaperIcon from '../elements/icons/NewspaperIcon'
import DocumentIcon from '../elements/icons/DocumentIcon'
// import LightbulbIcon from '../elements/icons/LightbulbIcon'
import GroupIcon from '../elements/icons/GroupIcon'
import PresentationIcon from '../elements/icons/PresentationIcon'
import UsersIcon from '../elements/icons/UsersIcon'
import QueueListIcon from '../elements/icons/QueueListIcon'
import GlobeIcon from '../elements/icons/GlobeIcon'
// import ClipboardIcon from '../elements/icons/ClipboardIcon'
import ProfileImage from '../../assets/img/avatar.webp'
import SearchIcon from '../elements/icons/SearchIcon'
import BellIcon from '../elements/icons/BellIcon'
import OfficeIcon from '../elements/icons/OfficeIcon'

import { Link, useLocation, useNavigate } from 'react-router-dom'
import LogoutIcon from '../elements/icons/LogoutIcon'
import { authHeader, userDetails } from '../../utils'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { ERROR } from '../../store/types'

const UserLayout = ({pageTitle, children}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()
  const currentRoute = location.pathname;

  const signOut = async (token) => {    
    try{
      const headers = authHeader()
      let requestUrl = `auth/sessions`

      await axios.delete(`${process.env.REACT_APP_API_URL}/${requestUrl}`, { headers })
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      navigate('/')
    }
    catch(error){
      dispatch( {
          type: ERROR,
          error
      })
    }
  }
  return (
    <div className='w-full'>
        <div className='w-full flex items-start relative'>
            <div className='w-2/12 p-[15px] shadow-xl min-h-screen bg-[#fff] fixed'>
              <div className='w-8/12 mb-6'>
                <img src={Logo} alt="logo" width={150} />
              </div>

              <Link to={`/user`}>
                <button className={`w-full flex items-center gap-x-3 px-3 py-3 mb-1 rounded-md ${currentRoute.includes('user/home') && 'bg-verovian-light-purple'}`}>
                  <HomeIcon className={`w-5 h-5 text-black`} />
                  <p className='text-sm font-medium'>Home</p>
                </button>
              </Link>

              <Link to={`/user/company/departments`}>
                <button className={`w-full flex items-center gap-x-3 px-3 py-3 mb-1 rounded-md ${currentRoute.includes('user/company') && 'bg-verovian-light-purple'}`}>
                  <OfficeIcon className={`w-5 h-5 text-black`} />
                  <p className='text-sm font-medium'>Company</p>
                </button>
              </Link>

              <Link to={`/user/news`}>
                <button className={`w-full flex items-center gap-x-3 px-3 py-3 mb-1 rounded-md ${currentRoute.includes('user/news') && 'bg-verovian-light-purple'}`}>
                  <NewspaperIcon className={`w-5 h-5 text-black`} />
                  <p className='text-sm font-medium'>News</p>
                </button>
              </Link>

              <Link to={`/user/documents`}>
                <button className={`w-full flex items-center gap-x-3 px-3 py-3 mb-1 rounded-md ${currentRoute.includes('user/documents') && 'bg-verovian-light-purple'}`}>
                  <DocumentIcon className={`w-5 h-5 text-black`} />
                  <p className='text-sm font-medium'>Documents</p>
                </button>
              </Link>

              {/* <div className='flex items-center gap-x-3 px-3 py-3 mb-1'>
                <LightbulbIcon className={`w-5 h-5 text-black`} />
                <p className='text-sm font-medium'>Manage Knowledge</p>
              </div> */}

              <div className='flex items-center gap-x-3 px-3 py-3 mb-1'>
                <GroupIcon className={`w-5 h-5 text-black`} />
                <p className='text-sm font-medium'>Groups</p>
              </div>

              <Link to={`/user/employees`}>
                <button className={`w-full flex items-center gap-x-3 px-3 py-3 mb-1 rounded-md ${currentRoute.includes('user/employees') && 'bg-verovian-light-purple'}`}>
                  <UsersIcon className={`w-5 h-5 text-black`} />
                  <p className='text-sm font-medium'>Employees</p>
                </button>
              </Link>

              <Link to={`/user/trainings`}>
                <button className={`w-full flex items-center gap-x-3 px-3 py-3 mb-1 rounded-md ${currentRoute.includes('user/trainings') && 'bg-verovian-light-purple'}`}>
                  <PresentationIcon className={`w-5 h-5 text-black`} />
                  <p className='text-sm font-medium'>Training & Knowledge</p>
                </button>
              </Link>

              <div className='flex items-center gap-x-3 px-3 py-3 mb-1'>
                <QueueListIcon className={`w-5 h-5 text-black`} />
                <p className='text-sm font-medium'>Task Management</p>
              </div>

              <Link to={`/user/leaves-holidays`}>
                <button className={`w-full flex items-center gap-x-3 px-3 py-3 mb-1 rounded-md ${currentRoute.includes('user/leaves-holidays') && 'bg-verovian-light-purple'}`}>
                  <GlobeIcon className={`w-5 h-5 text-black`} />
                  <p className='text-sm font-medium'>Leaves & Holidays</p>
                </button>
              </Link>

              {/* <div className='flex items-center gap-x-3 px-3 py-3 mb-1'>
                <ClipboardIcon className={`w-5 h-5 text-black`} />
                <p className='text-sm font-medium'>Contract</p>
              </div> */}

              <div className='absolute bottom-[25px] w-[90%] border rounded-md bg-verovian-light-purple border-[#2D0048] p-2 flex items-center gap-x-2'>
                  <div className='w-[45px] h-[45px] rounded-full relative border' style={{backgroundImage: `url(${ProfileImage})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover'}}>
                    {/* <Image src={ProfileImage} alt='' objectFit='fill' objectPosition={`center`} /> */}
                    {/* <Image  
                      layout="fill" 
                      objectFit='cover'
                      objectPosition="center"
                      src={ProfileImage}
                      className={`rounded-full`}
                      alt='' 
                    /> */}
                  </div>
                  <div>
                    <p className='text-sm font-medium text-verovian-purple'>{userDetails().firstName} {userDetails().lastName}</p>
                    <button onClick={()=>{signOut()}} className='flex items-center gap-x-2 text-left text-gray-500 hover:text-verovian-purple transition duration-200 text-xs'>
                      <LogoutIcon className={`h-5 w-5`} />
                      Sign out
                    </button>
                  </div>
              </div>

            </div>
            <div className='w-10/12 min-h-screen h-inherit bg-[#F7F7F7] ml-auto'>
              <div className='w-full p-4 flex items-center justify-between'>
                <p className='font-medium text-lg text-black'>{pageTitle || `Dashboard`}</p>
                <div className='flex items-center gap-x-4'>
                  <div className='bg-[#fff] flex items-center gap-x-3 rounded p-2 w-[500px]'>
                    <div className='flex items-center justify-center'>
                      <SearchIcon className={`w-7 h-7 text-verovian-purple text-opacity-40`} />
                    </div>
                    <input placeholder='Search for anything' className='w-full placeholder:text-sm' />
                  </div>

                  <button className='bg-verovian-purple rounded p-2 text-white'>
                    <BellIcon className="w-5 h-5" />
                  </button>
                </div>

              </div>
              <div className='w-full px-5'>
                {children}
              </div>
            </div>
        </div>
    </div>
  )
}

export default UserLayout