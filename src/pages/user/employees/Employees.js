import React, { useEffect } from 'react'
import UserLayout from '../../../components/layout/UserLayout'
import PlusIcon from '../../../components/elements/icons/PlusIcon'
import { Link } from 'react-router-dom'
import DataTable from '../../../components/elements/DataTable'
import EmployeeSnippet from '../../../components/partials/employees/EmployeeSnippet'
import { tableHeadersFields } from '../../../utils'
import Status from '../../../components/elements/Status'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployees } from '../../../store/actions/employeeActions'
import Preloader from '../../../components/elements/Preloader'
import EmptyState from '../../../components/elements/icons/EmptyState'

const Employees = () => {
    const dispatch = useDispatch()
    const employeesState = useSelector(state => state.employees)

    useEffect(() => {
        dispatch(fetchEmployees())
        return () => {
        
        };
    }, [dispatch]);

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
                id: item.employeeId || '',
                employee: <EmployeeSnippet showIcon={true} name={`${item.firstName} ${item.lastName}`} phone={item.phone} email={item.email} />,
                designation: item.designation.name,
                department: item.department.name,
                dateJoined: item.dateJoined,
                systemStatus: <Status status={item.userProfile ? 'profiled' : 'not-profiled'} />, //<OrderPaymentStatus status={item.paymentStatus} />,
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
                        {employeesState?.loadingEmployees && employeesState.loadingEmployees === true ? 
                            <Preloader preloadingText={'Loading employees... '} />
                            : 
                            <>
                                {employeesState?.employees.length > 0 ? 
                                    <DataTable                                
                                        tableHeaders={tableHeadersFields(cleanupData(employeesState.employees)[0])?.headers} 
                                        tableData={cleanupData(employeesState.employees)} 
                                        columnWidths={columnWidths}
                                        columnDataStyles={{}}
                                        allFields={tableHeadersFields(cleanupData(employeesState.employees)[0]).fields}
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
                                    <EmptyState emptyStateText={`No employees created yet. Click on the "Onboard employee" button above to create one`} />
                                }
                            </>
                        }
                        </div>

                    </div>
                </div>

            </div>
        </UserLayout>
    )
}

export default Employees