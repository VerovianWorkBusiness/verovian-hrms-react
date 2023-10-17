import React, { useEffect } from 'react'
import UserLayout from '../../../../components/layout/UserLayout'
import CompanyPageLayout from '../../../../components/layout/CompanyPageLayout'
import PlusIcon from '../../../../components/elements/icons/PlusIcon'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchShifts } from '../../../../store/actions/shiftActions'
import Preloader from '../../../../components/elements/Preloader'
import TrashIcon from '../../../../components/elements/icons/TrashIcon'
import EmptyState from '../../../../components/elements/icons/EmptyState'
import ArrowIcon from '../../../../components/elements/icons/ArrowIcon'

const Shifts = () => {
  const dispatch = useDispatch()
  const shiftsState = useSelector(state => state.shifts)

  useEffect(() => {
    dispatch(fetchShifts())
    return () => {
      
    };
  }, [dispatch]);

  return (
    <UserLayout pageTitle={`Company`}>
        <CompanyPageLayout sectionTitle={`Shifts`}>
          <div className=''>

            <div className='w-full lg:flex flex-row gap-x-8'>
                <div className='w-full pb-6 px-8 mt-6'>
                    <div className='flex justify-between items-center mt-4 mb-4'>
                        {/* <h3 className='font-medium text-lg text-gray-400'>Shifts</h3> */}
                        <div className='w-1/2'></div>
                        <Link to={`new-shift`}>
                            <button className='flex gap-x-2 items-center rounded bg-verovian-purple px-3 py-3 text-white text-[13px] transition duration-200 hover:bg-blue-800'>
                                <PlusIcon className={`h-5 w-5`} />
                                Create a shift
                            </button>
                        </Link>
                    </div>

                    {/* <div className='w-full pt-5'>
                        <Filters filterLabel="Filter Orders" filterOptions={filters} returnSelected={(filter)=>{captureFilter(filter)}} resetFilters={()=>{setSearchFilter(initialFilters)}} />
                    </div> */}

                    {shiftsState?.loadingShifts && shiftsState.loadingShifts === true ? 
                    <Preloader preloadingText={'Loading shifts... '} />
                    : 
                    <>
                        {shiftsState?.shifts.length > 0 ? <div className='w-full grid grid-cols-3 gap-8'>
                            {shiftsState?.shifts.map((shift, deptIndex) => ( 
                                <div key={deptIndex} className='w-full p-10 bg-white bg-opacity-50 relative'>

                                    <button className='transition duration-200 hover:text-gray-700 p-1 text-gray-400 rounded absolute top-3 right-4'>
                                        <TrashIcon className={`w-5 h-5`} />
                                    </button>
                                    <h3 className='text-lg text-black'>{shift.name}</h3>
                                    {/* <p className='mb-5 mt-2 text-sm'>Headed by: {dept.headedBy ? dept.headedBy : <span className='h-[15px] w-[100px] bg-gray-200 animate-pulse inline-block ml-2'></span>}</p> */}
                                    <p className="text-sm text-gray-500 mt-5 mb-5">{shift.description}</p>
                                    <p className="text-sm">{shift.personnel || 0} personnel</p>

                                    <Link className='text-sm text-gray-400 flex items-center gap-x-2 hover:text-verovian-purple duration-200 transition mt-3' to={`details/${shift._id}`}>See shift details <ArrowIcon className={`w-4 h-4 -rotate-90`}/></Link>
                                </div>
                            ))}
                        </div> 
                        :
                        <EmptyState emptyStateText={`No shifts created yet. Click on the "Create shift" button above to create one`} />
                        }
                    </>
                  }

                </div>
            </div>

          </div>
        </CompanyPageLayout>
    </UserLayout>
  )
}

export default Shifts