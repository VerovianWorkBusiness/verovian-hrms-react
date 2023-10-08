import DataTable from '@/components/DataTable'
import Status from '@/components/Status'
import EmployeeSnippet from '@/components/employees/EmployeeSnippet'
import PlusIcon from '@/components/icons/PlusIcon'
import UserLayout from '@/components/layouts/UserLayout'
import { tableHeadersFields } from '@/utils/utils'
import Link from 'next/link'
import React from 'react'

const Holidays = () => {
    const holidays = [
        {
            name: "Nigerian Independence",
            date: 'October 1st',
            type: 'National Holiday',
            datesOff: "",
        },
        {
            name: "Eid El Kabir",
            date: 'November 12th',
            type: 'Religious Holiday',
            datesOff: "",
        },
        {
            name: "Christmas Celebration",
            date: 'June 12th',
            type: 'Religious Holiday',
            datesOff: "December 23rd - December 26th",
        },
        {
            name: "New Years Celebration",
            date: 'January 1st',
            type: 'National Holiday',
            datesOff: "January 1st",
        },
    ]

    const tableOptions = {
        selectable: false,
        expandable: false,
        clickableRows: true,
        rowAction: (value)=>{}
    }

    const columnWidths = {

        name: "w-full lg:w-4/12",
        date: "w-full lg:w-4/12",
        type: "w-full lg:w-4/12",
        datesOff: "w-full lg:w-4/12"
    }

    const cleanupData = (dataSet) => {
        const data = []

        dataSet.forEach((item, itemIndex) => {
        data.push(
            {

                name: item.name,
                date: item.date,
                type: item.type,
                datesOff: item.datesOff,
            },
        )
        })

        return data
    }

    return (
        <UserLayout pageTitle={`Holiday Management`}>
            <div className=''>

                <div className='w-full lg:flex flex-row gap-x-8'>
                    <div className='w-full pb-6 px-12 mt-6'>
                        <div className='flex flex-row justify-between items-center mt-4 mb-4'>
                            <h3 className='font-medium text-lg text-gray-400'>Holidays</h3>

                            <Link href={`new-employee`}>
                                <button className='flex gap-x-2 items-center rounded bg-verovian-purple px-3 py-3 text-white text-[13px] transition duration-200 hover:bg-blue-800'>
                                    <PlusIcon className={`h-5 w-5`} />
                                    Record a holiday
                                </button>
                            </Link>
                        </div>

                        {/* <div className='w-full pt-5'>
                            <Filters filterLabel="Filter Orders" filterOptions={filters} returnSelected={(filter)=>{captureFilter(filter)}} resetFilters={()=>{setSearchFilter(initialFilters)}} />
                        </div> */}

                        <div className='w-full'>
                            <DataTable
                                tableHeaders={tableHeadersFields(cleanupData(holidays)[0])?.headers} 
                                tableData={cleanupData(holidays)} 
                                columnWidths={columnWidths}
                                columnDataStyles={{}}
                                allFields={tableHeadersFields(cleanupData(holidays)[0]).fields}
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
                        </div>

                    </div>
                </div>

            </div>
        </UserLayout>
    )

}

export default Holidays