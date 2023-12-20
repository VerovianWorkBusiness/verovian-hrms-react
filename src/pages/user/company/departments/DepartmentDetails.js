import React, { useEffect, useState } from 'react'
import UserLayout from '../../../../components/layout/UserLayout'
import CompanyPageLayout from '../../../../components/layout/CompanyPageLayout'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { authHeader, tableHeadersFields } from '../../../../utils';
import axios from 'axios';
import { ERROR, SET_SUCCESS_MESSAGE } from '../../../../store/types';
import { fetchEmployees } from '../../../../store/actions/employeeActions';
import Status from '../../../../components/elements/Status';
import EmployeeSnippet from '../../../../components/partials/employees/EmployeeSnippet';
import Preloader from '../../../../components/elements/Preloader';
import DataTable from '../../../../components/elements/DataTable';
import EmptyState from '../../../../components/elements/icons/EmptyState';
import ChevronIcon from '../../../../components/elements/icons/ChevronIcon';
import LeavePolicyManagement from '../../../../components/partials/departments/LeavePolicyManagement';
import ModalLayout from '../../../../components/layout/ModalLayout';
import EditDepartment from '../../../../components/partials/departments/EditDepartment';

const DepartmentDetails = () => {
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const {departmentId} = useParams()
  const employeesState = useSelector(state => state.employees)
  const departmentState = useSelector(state => state.department)

  useEffect(() => {
    const fetchDepartmentDetails = async () => {    
      try{
        const headers = authHeader()
        let requestUrl = `departments/${departmentId}?expand=createdBy`
        setLoading(true)
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${requestUrl}`, { headers })

        setDepartment(response.data.data)
        setLoading(false)
      }
      catch(error){
        dispatch( {
            type: ERROR,
            error
        })
      }
    }
    dispatch(fetchEmployees(`department=${departmentId}`))
    fetchDepartmentDetails()
    // if(departmentState.createdDepartment !== null){
    //   dispatch({
    //     type: SET_SUCCESS_MESSAGE,
    //     payload: "Department details updated"
    //   })
    // }
    return () => {
      
    };
  }, [dispatch, departmentId, 
    // departmentState.createdDepartment
  ]);

  const employeeTableOptions = {
    selectable: false,
    expandable: false,
    clickableRows: true,
    rowAction: (value)=>{}
  }

  const employeeColumnWidths = {
      id: "w-full lg:w-1/12",
      employee: "w-full lg:w-4/12",
      designation: "w-full lg:w-3/12",
      dateJoined: "w-full lg:w-2/12",
      systemStatus: "w-full lg:w-2/12",
  }

  const cleanupData = (dataSet) => {
      const data = []

      dataSet.forEach((item, itemIndex) => {
      data.push(
          {
              id: item.employeeId || '',
              employee: <EmployeeSnippet showIcon={true} name={`${item.firstName} ${item.lastName}`} phone={item.phone} email={item.email} />,
              designation: item.designation.name,
              dateJoined: item.dateJoined,
              systemStatus: <Status status={item.userProfile ? 'profiled' : 'not-profiled'} />, //<OrderPaymentStatus status={item.paymentStatus} />,
          },
      )
      })

      return data
  }

  const [leavePoliciesActive, setLeavePoliciesActive] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(false);
  
  return (
    <UserLayout pageTitle="Company">
      <CompanyPageLayout sectionTitle="Department details">

        {!loading ? 
          <div className="w-full px-8 py-12 bg-white mt-8">
            <div className='w-1/2'>
              <div className='w-full my-5'>
                <label className='text-xs tracking-[0.2em]'>DEPARTMENT NAME</label>
                <p className='mt-1'>{department.name}</p>
              </div>
              <div className='w-full my-5'>
                <label className='text-xs tracking-[0.2em]'>DESCRIPTION</label>
                <p className='mt-1 text-sm'>{department.description}</p>
              </div>
              <div className='w-full my-5 flex items-start justify-between'>
                <div className=''>
                  <label className='text-xs tracking-[0.2em]'>LEAVE POLICIES</label>
                  <p className='mt-1 text-sm'>Expand this section to see and edit leave policies for this department</p>

                </div>
                <div className='w-[50px] pt-5'>
                  <button onClick={()=>{setLeavePoliciesActive(!leavePoliciesActive)}} className='className w-[40px] h-[40px] rounded-full bg-gray-100 flex items-center justify-center'>
                    <ChevronIcon className={`h-5 w-5 text-gray-400 transition duration-200 ${leavePoliciesActive && '-rotate-180'}`} />
                  </button>
                </div>
              </div>
              {leavePoliciesActive &&
                <div className='py-5 border-t border-gray-300'>
                  <LeavePolicyManagement />
                </div>
              }
            </div>
            <div className='w-full'>
              <label className='text-xs tracking-[0.2em]'>EMPLOYEES</label>
              <p className='text-sm mb-5 mt-1'>Employees in this department</p>
              {employeesState?.loadingEmployees && employeesState.loadingEmployees === true ? 
                  <Preloader preloadingText={'Loading department employees... '} />
                : 
                <>
                  {employeesState?.employees.length > 0 ? 
                    <>

                      <DataTable                                
                          tableHeaders={tableHeadersFields(cleanupData(employeesState.employees)[0])?.headers} 
                          tableData={cleanupData(employeesState.employees)} 
                          columnWidths={employeeColumnWidths}
                          columnDataStyles={{}}
                          allFields={tableHeadersFields(cleanupData(employeesState.employees)[0]).fields}
                          onSelectItems={()=>{}}
                          tableOptions={employeeTableOptions}
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
                    </>
                    :
                    <EmptyState emptyStateText={`No employees in this department.`} />
                  }
                </>
              }
              </div>
              
            </div>
            :
            <EmptyState emptyStateText={`Department not found`} />
        }
      </CompanyPageLayout>

      {department&& <ModalLayout
          isOpen={editingDepartment} 
          closeModal={()=>{setEditingDepartment(false)}} 
          actionFunction={()=>{}} 
          actionFunctionLabel='Edit department' 
          dialogTitle={`Edit Department - ${department.name}`}
          maxWidthClass='max-w-xl'
      >
          <EditDepartment department={department} />
      </ModalLayout>}
    </UserLayout>
  )
}

export default DepartmentDetails