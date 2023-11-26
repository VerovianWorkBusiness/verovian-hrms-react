import React, { useEffect, useState } from 'react'
import UserLayout from '../../../../components/layout/UserLayout'
import CompanyPageLayout from '../../../../components/layout/CompanyPageLayout'
import PlusIcon from '../../../../components/elements/icons/PlusIcon';
import ModalLayout from '../../../../components/layout/ModalLayout';
import NewDepartment from '../../../../components/partials/departments/NewDepartment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments } from '../../../../store/actions/departmentActions';
import Preloader from '../../../../components/elements/Preloader';
import EmptyState from '../../../../components/elements/icons/EmptyState';
import TrashIcon from '../../../../components/elements/icons/TrashIcon';
import { SET_SUCCESS_MESSAGE } from '../../../../store/types';
import ArrowIcon from '../../../../components/elements/icons/ArrowIcon';
import { Link } from 'react-router-dom';
import { userDetails } from '../../../../utils';

const Departments = () => {
    const dispatch = useDispatch()
    const departmentsState = useSelector(state => state.departments)
    const accountPermissions = userDetails().accountPermissions
    
    const [creatingDepartment, setCreatingDepartment] = useState(false);
    useEffect(() => {
        dispatch(fetchDepartments())
        if(departmentsState.createdDepartment && departmentsState.createdDepartment !== null) {
            dispatch({
                type: SET_SUCCESS_MESSAGE,
                payload: 'Department created successfully!'
            })
            dispatch(fetchDepartments())
            setCreatingDepartment(false)
        }
        return () => {
            
        };
    }, [dispatch, departmentsState.createdDepartment]);

  return (
    <>
      <UserLayout pageTitle={`Company`}>
          <CompanyPageLayout sectionTitle={`Departments`}>
            <div className='w-full mx-auto pt-12'>
                <div className='w-full pt-5 flex items-center justify-between mb-12'>
                    <div className='w-9/12'>
                        {/* <Filters filterLabel="Filter Tasks" filterOptions={filters} returnSelected={(filter)=>{captureFilter(filter)}} resetFilters={()=>{setSearchFilter(initialFilters)}} /> */}
                    </div>
                    <div className='3/12'>
                        <button onClick={()=>{setCreatingDepartment(true)}} className='flex gap-x-2 items-center rounded bg-verovian-purple px-3 py-3 text-verovian-light-purple text-sm transition duration-200 hover:bg-gray-700'>
                            <PlusIcon className={`h-5 w-5`} />
                            Create new department
                        </button>
                    </div>
                </div>

                {departmentsState?.loadingDepartments && departmentsState.loadingDepartments === true ? 
                    <Preloader preloadingText={'Loading departments... '} />
                    : 
                    <>
                        {departmentsState?.departments.length > 0 ? <div className='w-full grid grid-cols-3 gap-8'>
                            {departmentsState?.departments.map((dept, deptIndex) => ( 
                                <div key={deptIndex} className='w-full p-10 bg-white bg-opacity-50 relative'>

                                    {(accountPermissions?.includes('*') || accountPermissions?.includes('departments.*') || accountPermissions?.includes('departments.delete')) && <button className='transition duration-200 hover:text-gray-700 p-1 text-gray-400 rounded absolute top-3 right-4'>
                                        <TrashIcon className={`w-5 h-5`} />
                                    </button>}
                                    <h3 className='text-lg text-black'>{dept.name}</h3>
                                    <p className='mb-5 mt-2 text-sm'>Headed by: {dept.headedBy ? dept.headedBy : <span className='h-[15px] w-[100px] bg-gray-200 animate-pulse inline-block ml-2'></span>}</p>
                                    <p className="text-sm text-gray-500 mb-5">{dept.description}</p>
                                    <p className="text-sm">{dept.personnel || 0} personnel</p>

                                    <Link className='text-sm text-gray-600 flex items-center gap-x-2 hover:text-verovian-purple duration-200 transition mt-3' to={`details/${dept._id}`}>See department details <ArrowIcon className={`w-4 h-4 -rotate-90`}/></Link>
                                </div>
                            ))}
                        </div> 
                        :
                        <EmptyState emptyStateText={`No departments created yet. Click on the "Create new department" button above to create one`} />
                        }
                    </>
                }
            </div>
          </CompanyPageLayout>
      </UserLayout>

      <ModalLayout
          isOpen={creatingDepartment} 
          closeModal={()=>{setCreatingDepartment(false)}} 
          actionFunction={()=>{}} 
          actionFunctionLabel='Create department' 
          dialogTitle='Create a new department'
          maxWidthClass='max-w-xl'
      >
          <NewDepartment />
      </ModalLayout>
    </>
  )
}

export default Departments