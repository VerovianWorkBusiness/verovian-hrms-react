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

const Designations = () => {
  const dispatch = useDispatch()
  const departmentsState = useSelector(state => state.designations)
  
  const [creatingDesignation, setCreatingDesignation] = useState(false);
  useEffect(() => {
      dispatch(fetchDesignations())
      dispatch(fetchDepartments())
      if(departmentsState.createdDesignation && departmentsState.createdDesignation !== null) {
          dispatch(fetchDesignations())
          setCreatingDesignation(false)
      }
      return () => {
          
      };
  }, [dispatch, departmentsState.createdDesignation]);
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

            {departmentsState?.loadingDesignations && departmentsState.loadingDesignations === true ? 
                <Preloader preloadingText={'Loading designations... '} />
                : 
                <>
                    {departmentsState?.designations.length > 0 ? <div className='w-full grid grid-cols-3 gap-8'>
                        {departmentsState?.designations.map((dept, deptIndex) => ( 
                            <div key={deptIndex} className='w-full p-10 bg-white bg-opacity-50'>
                                <h3 className='text-lg text-black'>{dept.name}</h3>
                                <p className='mb-5 mt-2 text-sm'>Headed by: {dept.headedBy ? dept.headedBy : <span className='h-[15px] w-[100px] bg-gray-200 animate-pulse inline-block ml-2'></span>}</p>
                                <p className="text-sm text-gray-500 mb-5">{dept.description}</p>
                                <p className="text-sm">{dept.personnel || 0} personnel</p>
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
          actionFunctionLabel='Create department' 
          dialogTitle='Create a new department'
          maxWidthClass='max-w-xl'
      >
          <NewDesignation />
      </ModalLayout>
    </UserLayout>
  )
}

export default Designations