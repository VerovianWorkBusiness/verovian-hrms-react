import CompanyPageLayout from '@/components/layouts/CompanyPageLayout'
import UserLayout from '@/components/layouts/UserLayout'
import React from 'react'

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