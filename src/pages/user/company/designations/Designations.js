import React, { useEffect, useState } from 'react'
import CompanyPageLayout from '../../../../components/layout/CompanyPageLayout'
import UserLayout from '../../../../components/layout/UserLayout'
import PlusIcon from '../../../../components/elements/icons/PlusIcon'
import Preloader from '../../../../components/elements/Preloader'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDesignations } from '../../../../store/actions/designationActions'
import ModalLayout from '../../../../components/layout/ModalLayout'
import NewDesignation from '../../../../components/partials/designations/NewDesignation'
import EmptyState from '../../../../components/elements/icons/EmptyState'
import { fetchDepartments } from '../../../../store/actions/departmentActions'
import TrashIcon from '../../../../components/elements/icons/TrashIcon'
import { SET_SUCCESS_MESSAGE } from '../../../../store/types'

const Designations = () => {
  const dispatch = useDispatch()
  const designationSState = useSelector(state => state.designations)
  
  const [creatingDesignation, setCreatingDesignation] = useState(false);
  useEffect(() => {
      dispatch(fetchDesignations())
      dispatch(fetchDepartments())
      if(designationSState.createdDesignation && designationSState.createdDesignation !== null) {
          dispatch({
            type: SET_SUCCESS_MESSAGE,
            payload: {
              successMessage: `Designation created`
            }
          })
          dispatch(fetchDesignations())
          setCreatingDesignation(false)
      }
      return () => {
          
      };
  }, [dispatch, designationSState.createdDesignation]);
  return (
    <UserLayout pageTitle={`Company`}>
      <CompanyPageLayout sectionTitle={`Designations`}>
        <div className='w-full mx-auto pt-12'>
            <div className='w-full pt-5 flex items-center justify-between mb-12'>
                <div className='w-9/12'>
                    {/* <Filters filterLabel="Filter Tasks" filterOptions={filters} returnSelected={(filter)=>{captureFilter(filter)}} resetFilters={()=>{setSearchFilter(initialFilters)}} /> */}
                </div>
                <div className='3/12'>
                    <button onClick={()=>{setCreatingDesignation(true)}} className='flex gap-x-2 items-center rounded bg-verovian-purple px-3 py-3 text-verovian-light-purple text-sm transition duration-200 hover:bg-gray-700'>
                        <PlusIcon className={`h-5 w-5`} />
                        Create new designation
                    </button>
                </div>
            </div>

            {designationSState?.loadingDesignations && designationSState.loadingDesignations === true ? 
                <Preloader preloadingText={'Loading designations... '} />
                : 
                <>
                    {designationSState?.designations.length > 0 ? <div className='w-full grid grid-cols-3 gap-8'>
                        {designationSState?.designations.map((designation, designationIndex) => ( 
                            <div key={designationIndex} className='w-full p-10 bg-white bg-opacity-50 relative'>
                              <button className='transition duration-200 hover:text-gray-700 p-1 text-gray-400 rounded absolute top-3 right-4'>
                                <TrashIcon className={`w-5 h-5`} />
                              </button>
                                <h3 className='text-lg text-black'>{designation.name}</h3>
                                <p className='mb-5 mt-2 text-sm'>Dept: {designation.department ? designation.department.name : <span className='h-[15px] w-[100px] bg-gray-200 animate-pulse inline-block ml-2'></span>}</p>
                                <p className="text-sm text-gray-500 mb-5">{designation.description}</p>
                                {/* <p className="text-sm">{dept.personnel || 0} personnel</p> */}
                            </div>
                        ))}
                    </div> 
                    :
                    <EmptyState emptyStateText={`No designations created yet. Click on the "Create new designation" button above to create one`} />
                    }
                </>
            }
        </div>
      </CompanyPageLayout>

      <ModalLayout
          isOpen={creatingDesignation} 
          closeModal={()=>{setCreatingDesignation(false)}} 
          actionFunction={()=>{}} 
          actionFunctionLabel='Create designation' 
          dialogTitle='Create a new designation'
          maxWidthClass='max-w-xl'
      >
          <NewDesignation />
      </ModalLayout>
    </UserLayout>
  )
}

export default Designations