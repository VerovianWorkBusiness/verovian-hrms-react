import CompanyPageLayout from '@/components/layouts/CompanyPageLayout'
import UserLayout from '@/components/layouts/UserLayout'
import React from 'react'

const Departments = () => {
  return (
    <UserLayout pageTitle={`Company`}>
        <CompanyPageLayout sectionTitle={`Departments`}>
            Departments
        </CompanyPageLayout>
    </UserLayout>
  )
}

export default Departments