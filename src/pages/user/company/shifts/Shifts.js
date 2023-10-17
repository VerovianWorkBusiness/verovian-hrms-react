import React from 'react'
import UserLayout from '../../../../components/layout/UserLayout'
import CompanyPageLayout from '../../../../components/layout/CompanyPageLayout'

const Shifts = () => {
  return (
    <UserLayout pageTitle={`Company`}>
        <CompanyPageLayout sectionTitle={`Departments`}>
            <div>Shifts</div>
        </CompanyPageLayout>
    </UserLayout>
  )
}

export default Shifts