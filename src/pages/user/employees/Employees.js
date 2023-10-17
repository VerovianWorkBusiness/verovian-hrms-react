import React from 'react'
import UserLayout from '../../../components/layout/UserLayout'
import PlusIcon from '../../../components/elements/icons/PlusIcon'
import { Link } from 'react-router-dom'
import DataTable from '../../../components/elements/DataTable'
import EmployeeSnippet from '../../../components/partials/employees/EmployeeSnippet'
import { tableHeadersFields } from '../../../utils'
import Status from '../../../components/elements/Status'

const Employees = () => {
    const employees = [
        {
            id: "UR7365478",
            email: "bram-stoker@verovian.com",
            firstName: 'Frederick',
            middleName: "",
            lastName: 'Kreuger',
            designation: 'Assistant Director',
            department: 'Human Resources',
            phone: '08045712589',
            dateJoined: '21/11/2021',
            systemStatus: 'profiled'
        },
        {
            id: "UR7365478",
            email: "bram-stoker@verovian.com",
            firstName: 'Bram',
            middleName: "",
            lastName: 'Stoker',
            designation: 'Executive Assistant',
            department: 'Human Resources',
            phone: '08045712589',
            dateJoined: '21/11/2021',
            systemStatus: 'profiled'
        },
        {
            id: "ZT60097354",
            email: "bram-stoker@verovian.com",
            firstName: 'Florence',
            middleName: "",
            lastName: 'Nightingale',
            designation: 'Trainee',
            department: 'Information Technology',
            phone: '08045712589',
            dateJoined: '21/11/2021',
            systemStatus: 'not-profiled'
        },
    ]

    const tableOptions = {
        selectable: false,
        expandable: false,
        clickableRows: true,
        rowAction: (value)=>{}
    }

    const columnWidths = {
        id: "w-full lg:w-1/12",
        employee: "w-full lg:w-4/12",
        designation: "w-full lg:w-2/12",
        department: "w-full lg:w-2/12",
        dateJoined: "w-full lg:w-2/12",
        systemStatus: "w-full lg:w-1/12",
    }

    const cleanupData = (dataSet) => {
        const data = []

        dataSet.forEach((item, itemIndex) => {
        data.push(
            {
                id: item.id,
                employee: <EmployeeSnippet showIcon={true} name={`${item.firstName} ${item.lastName}`} phone={item.phone} email={item.email} />,
                designation: item.designation,
                department: item.department,
                dateJoined: item.dateJoined,
                systemStatus: <Status status={item.systemStatus} />, //<OrderPaymentStatus status={item.paymentStatus} />,
            },
        )
        })

        return data
    }
    return (
        <UserLayout pageTitle={`Employee Management`}>
            <div className=''>

                <div className='w-full lg:flex flex-row gap-x-8'>
                    <div className='w-full pb-6 px-12 mt-6'>
                        <div className='flex justify-between items-center mt-4 mb-4'>
                            <h3 className='font-medium text-lg text-gray-400'>Verovian Employees</h3>

                            <Link to={`new-employee`}>
                                <button className='flex gap-x-2 items-center rounded bg-verovian-purple px-3 py-3 text-white text-[13px] transition duration-200 hover:bg-blue-800'>
                                    <PlusIcon className={`h-5 w-5`} />
                                    Onboard an employee
                                </button>
                            </Link>
                        </div>

                        {/* <div className='w-full pt-5'>
                            <Filters filterLabel="Filter Orders" filterOptions={filters} returnSelected={(filter)=>{captureFilter(filter)}} resetFilters={()=>{setSearchFilter(initialFilters)}} />
                        </div> */}

                        <div className='w-full'>
                            <DataTable                                
                                tableHeaders={tableHeadersFields(cleanupData(employees)[0])?.headers} 
                                tableData={cleanupData(employees)} 
                                columnWidths={columnWidths}
                                columnDataStyles={{}}
                                allFields={tableHeadersFields(cleanupData(employees)[0]).fields}
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

export default Employees