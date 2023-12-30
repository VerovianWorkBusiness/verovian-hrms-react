import React, { useEffect } from 'react'
import LeavesHolidaysLayout from '../../../../components/layout/LeavesHolidaysLayout'
import { tableHeadersFields, transactionTimeStamp } from '../../../../utils'
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
      name: "w-full lg:w-4/12",
      dates: "w-full lg:w-4/12",
      type: "w-full lg:w-4/12",
      datesOff: "w-full lg:w-4/12"
  }

  const cleanupData = (dataSet) => {
      const data = []

      dataSet.forEach((item, itemIndex) => {
          data.push(
              {
                  name: item.name,
                  dates: item.dates.map(date => {
                      return transactionTimeStamp(date).date
                  }).join(', '),
                  type: <p className="capitalize">{item.type.toLowerCase()} holiday</p>,
                  datesOff: item.daysOff.map(date => {
                      return transactionTimeStamp(date).date
                  }).join(', ')
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
                        <button className='flex gap-x-2 items-center rounded bg-verovian-purple px-3 py-3 text-white text-[13px] transition duration-200 hover:bg-blue-800'>
                            {/* <PlusIcon className={`h-5 w-5`} /> */}
                            Apply for a leave
                        </button>
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
                      {leavesState?.leaveApplications?.length > 0 ? 
                      <DataTable
                          tableHeaders={tableHeadersFields(cleanupData(leavesState?.leaveApplications)[0])?.headers} 
                          tableData={cleanupData(leavesState?.leaveApplications)} 
                          columnWidths={columnWidths}
                          columnDataStyles={{}}
                          allFields={tableHeadersFields(cleanupData(leavesState?.leaveApplications)[0]).fields}
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