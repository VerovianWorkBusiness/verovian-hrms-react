import React, { useEffect, useState } from 'react'
import CompanyPageLayout from '../../../../components/layout/CompanyPageLayout'
import UserLayout from '../../../../components/layout/UserLayout'
import PlusIcon from '../../../../components/elements/icons/PlusIcon'
import Preloader from '../../../../components/elements/Preloader'
import { useDispatch, useSelector } from 'react-redux'
import ModalLayout from '../../../../components/layout/ModalLayout'
import EmptyState from '../../../../components/elements/icons/EmptyState'
import { fetchDepartments } from '../../../../store/actions/departmentActions'
import { fetchGroups } from '../../../../store/actions/groupActions'
import NewGroup from '../../../../components/partials/groups/NewGroup'
import TrashIcon from '../../../../components/elements/icons/TrashIcon'
import { SET_SUCCESS_MESSAGE } from '../../../../store/types'

const Groups = () => {
  const dispatch = useDispatch()
  const groupsState = useSelector(state => state.groups)
  
  const [creatingGroup, setCreatingGroup] = useState(false);
  useEffect(() => {
      dispatch(fetchGroups())
      dispatch(fetchDepartments())
      if(groupsState.createdGroup && groupsState.createdGroup !== null) {
          dispatch({
            type: SET_SUCCESS_MESSAGE,
            payload: {
              successMessage: `Group created`
            }
          })
          dispatch(fetchGroups())
          setCreatingGroup(false)
      }
      return () => {
          
      };
  }, [dispatch, groupsState.createdGroup]);
  return (
    <UserLayout pageTitle={`Company`}>
        <CompanyPageLayout sectionTitle={`Groups`}>
        <div className='w-full mx-auto pt-12'>
            <div className='w-full pt-5 flex items-center justify-between mb-12'>
                <div className='w-9/12'>
                    {/* <Filters filterLabel="Filter Tasks" filterOptions={filters} returnSelected={(filter)=>{captureFilter(filter)}} resetFilters={()=>{setSearchFilter(initialFilters)}} /> */}
                </div>
                <div className='3/12'>
                    <button onClick={()=>{setCreatingGroup(true)}} className='flex gap-x-2 items-center rounded bg-verovian-purple px-3 py-3 text-verovian-light-purple text-sm transition duration-200 hover:bg-gray-700'>
                        <PlusIcon className={`h-5 w-5`} />
                        Create new group
                    </button>
                </div>
            </div>

            {groupsState?.loadingGroups && groupsState.loadingGroups === true ? 
                <Preloader preloadingText={'Loading groups... '} />
                : 
                <>
                    {groupsState?.groups.length > 0 ? <div className='w-full grid grid-cols-3 gap-8'>
                        {groupsState?.groups.map((group, groupIndex) => ( 
                            <div key={groupIndex} className='w-full p-10 bg-white bg-opacity-50 relative'>
                                <button className='transition duration-200 hover:text-gray-700 p-1 text-gray-400 rounded absolute top-3 right-4'>
                                  <TrashIcon className={`w-5 h-5`} />
                                </button>
                                <h3 className='text-lg text-black'>{group.name}</h3>
                                <p className='mb-5 mt-2 text-sm'>Dept: {group?.department ? group.department?.name : <span className='h-[15px] w-[100px] bg-gray-200 animate-pulse inline-block ml-2'></span>}</p>
                                <p className="text-sm text-gray-500 mb-5">{group.description}</p>
                                <p className="text-sm">{group.personnel || 0} personnel</p>
                            </div>
                        ))}
                    </div> 
                    :
                    <EmptyState emptyStateText={`No groups created yet. Click on the "Create new group" button above to create one`} />
                    }
                </>
            }
        </div>
      </CompanyPageLayout>

      <ModalLayout
        isOpen={creatingGroup} 
        closeModal={()=>{setCreatingGroup(false)}} 
        actionFunction={()=>{}} 
        actionFunctionLabel='Create group' 
        dialogTitle='Create a new group'
        maxWidthClass='max-w-xl'
      >
        <NewGroup />
      </ModalLayout>
    </UserLayout>
  )
}

export default Groups