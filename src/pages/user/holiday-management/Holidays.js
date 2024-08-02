
import React, { useEffect, useState } from 'react'
import PlusIcon from '../../../components/elements/icons/PlusIcon'
import DataTable from '../../../components/elements/DataTable'
import { tableHeadersFields, transactionTimeStamp } from '../../../utils'
import NewHoliday from '../../../components/partials/holidays/NewHoliday'
import ModalLayout from '../../../components/layout/ModalLayout'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHolidays } from '../../../store/actions/holidayActions'
import Preloader from '../../../components/elements/Preloader'
import EmptyState from '../../../components/elements/icons/EmptyState'
import { SET_SUCCESS_MESSAGE } from '../../../store/types'
import LeavesHolidaysLayout from '../../../components/layout/LeavesHolidaysLayout'

const Holidays = () => {
    const dispatch = useDispatch()
    const holidaysState = useSelector(state => state.holidays)
  
    useEffect(() => {
      dispatch(fetchHolidays())

      if(holidaysState.createdHoliday && holidaysState.createdHoliday !== null) {
          dispatch({
            type: SET_SUCCESS_MESSAGE,
            payload: 'Holiday recorded successfully!'
          })
          dispatch(fetchHolidays())
          setCreatingHoliday(false)
      }
      return () => {
        
      };
    }, [dispatch, holidaysState.createdHoliday]);

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

    const [creatingHoliday, setCreatingHoliday] = useState(false);

    return (
        <>
        <LeavesHolidaysLayout>
            <div className=''>

                <div className='w-full lg:flex flex-row gap-x-8'>
                    <div className='w-full pb-6 px-12 mt-6'>
                        <div className='flex flex-row justify-between items-center mt-4 mb-4'>
                            <h3 className='font-medium text-lg text-gray-400'>Holidays</h3>

                            <button onClick={()=>{setCreatingHoliday(true)}} className='flex gap-x-2 items-center rounded bg-verovian-purple px-3 py-3 text-white text-[13px] transition duration-200 hover:bg-blue-800'>
                                <PlusIcon className={`h-5 w-5`} />
                                Record a holiday
                            </button>
                        </div>

                        {/* <div className='w-full pt-5'>
                            <Filters filterLabel="Filter Orders" filterOptions={filters} returnSelected={(filter)=>{captureFilter(filter)}} resetFilters={()=>{setSearchFilter(initialFilters)}} />
                        </div> */}

                        <div className='w-full'>
                        {holidaysState?.loadingHolidays && holidaysState.loadingHolidays === true ? 
                        <Preloader preloadingText={'Loading holidays... '} />
                        : 
                        <>
                            {holidaysState?.holidays?.length > 0 ? 
                            <DataTable
                                tableHeaders={tableHeadersFields(cleanupData(holidaysState?.holidays)[0])?.headers} 
                                tableData={cleanupData(holidaysState?.holidays)} 
                                columnWidths={columnWidths}
                                columnDataStyles={{}}
                                allFields={tableHeadersFields(cleanupData(holidaysState?.holidays)[0]).fields}
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
                                <EmptyState emptyStateText={`No holidays recorded yet. Click on the "Record new holiday" button above to create one`} />
                        }
                        </>
                        }
                        </div>

                    </div>
                </div>

            </div>
        </LeavesHolidaysLayout>

        <ModalLayout
            isOpen={creatingHoliday} 
            closeModal={()=>{setCreatingHoliday(false)}} 
            actionFunction={()=>{}} 
            actionFunctionLabel='Record holiday' 
            dialogTitle='Record a new holiday'
            maxWidthClass='max-w-xl'
        >
            <NewHoliday />
        </ModalLayout>
        </>
    )

}

export default Holidays