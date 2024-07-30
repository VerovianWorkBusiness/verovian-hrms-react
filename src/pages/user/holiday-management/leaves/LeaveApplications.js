import React, { useEffect } from 'react'
import LeavesHolidaysLayout from '../../../../components/layout/LeavesHolidaysLayout'
import { tableHeadersFields, transactionTimeStamp, userDetails } from '../../../../utils'
import { useDispatch, useSelector } from 'react-redux'
import Preloader from '../../../../components/elements/Preloader'
import DataTable from '../../../../components/elements/DataTable'
import EmptyState from '../../../../components/elements/icons/EmptyState'
import { getLeaveApplications } from '../../../../store/actions/leaveActions'
import { Link } from 'react-router-dom'

const LeaveApplications = () => {
  const dispatch = useDispatch()
  const leavesState = useSelector(state => state.leaves)

  useEffect(() => {
    dispatch(getLeaveApplications())

    // if(holidaysState.createdHoliday && holidaysState.createdHoliday !== null) {
    //     dispatch({
    //       type: SET_SUCCESS_MESSAGE,
    //       payload: 'Holiday recorded successfully!'
    //     })
    //     dispatch(fetchHolidays())
    //     setCreatingHoliday(false)
    // }
    return () => {
      
    };
  }, [dispatch, leavesState.createdLeaveApplication]);

  const tableOptions = {
      selectable: false,
      expandable: false,
      clickableRows: true,
      rowAction: (value)=>{}
  }

  const columnWidths = {
    employee: "w-full lg:w-3/12",
    leaveType: "w-full lg:w-2/12",
    requestedDaysOff: "w-full lg:w-2/12",
    startDay: "w-full lg:w-1/12",
    status: "w-full lg:w-1/12",
    supportingDocuments: "w-full lg:w-2/12",
    dateApplied: "w-full lg:w-1/12",

  }

  const cleanupData = (dataSet) => {
    console.log('->', dataSet)
      const data = []

      dataSet.forEach((item, itemIndex) => {
          data.push(
              {
                  employee: item?.employee?.name,
                  leaveType: <p className="capitalize">{item.leaveType.toLowerCase()}</p>,
                  requestedDaysOff: item.daysOff,
                  startDay: transactionTimeStamp(item.proposedStartDay).date,
                  status: item.status,
                  supportingDocuments: item.supportingDocuments.length,
                  dateApplied: transactionTimeStamp(item.createdAt).date
              },
          )
      })

      return data
  }


  return (
    <>
      <LeavesHolidaysLayout>
        <div className=''>

          <div className='w-full lg:flex flex-row gap-x-8'>
              <div className='w-full pb-6 px-12 mt-6'>
                  <div className='flex flex-row justify-between items-center mt-4 mb-4'>
                      <h3 className='font-medium text-lg text-gray-400'>Leave applications</h3>
                      <Link to={`new-application`}>
                        {userDetails().employeeProfile && userDetails().employeeProfile !== '' && <button className='flex gap-x-2 items-center rounded bg-verovian-purple px-3 py-3 text-white text-[13px] transition duration-200 hover:bg-blue-800'>
                            {/* <PlusIcon className={`h-5 w-5`} /> */}
                            Apply for a leave
                        </button>}
                      </Link>
                  </div>

                  {/* <div className='w-full pt-5'>
                      <Filters filterLabel="Filter Orders" filterOptions={filters} returnSelected={(filter)=>{captureFilter(filter)}} resetFilters={()=>{setSearchFilter(initialFilters)}} />
                  </div> */}

                  <div className='w-full'>
                  {leavesState?.loadingLeaveApplications && leavesState?.loadingLeaveApplications === true ? 
                    <Preloader preloadingText={'Loading leave applications... '} />
                  : 
                  <>
                    {leavesState?.leaveApplications?.applications?.length > 0 ? 
                        <DataTable
                            tableHeaders={tableHeadersFields(cleanupData(leavesState?.leaveApplications?.applications)[0])?.headers} 
                            tableData={cleanupData(leavesState?.leaveApplications?.applications)} 
                            columnWidths={columnWidths}
                            columnDataStyles={{}}
                            allFields={tableHeadersFields(cleanupData(leavesState?.leaveApplications?.applications)[0]).fields}
                            onSelectItems={()=>{}}
                            tableOptions={tableOptions}
                            // pagination={{
                            //     perPage: 25, 
                            //     currentPage: 1,
                            //     totalItems: 476,
                            // }}
                            changePage={()=>{}}
                            updatePerPage={()=>{}}
                            // expandedIndex={rowOpen || ''}
                            // expansion={<OrderExpansion orders={orders} rowOpen={rowOpen} />}
                        />
                    :
                        <EmptyState emptyStateText={`No leave applications recorded yet. Click on the "Apply for leave" button above to start an application`} />
                  }
                  </>
                  }
                  </div>

              </div>
          </div>

        </div>
      </LeavesHolidaysLayout>
    </>
  )
}

export default LeaveApplications