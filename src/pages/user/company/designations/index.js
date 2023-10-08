import CompanyPageLayout from '@/components/layouts/CompanyPageLayout'
import UserLayout from '@/components/layouts/UserLayout'
import React from 'react'

const Designations = () => {
  return (
    <UserLayout pageTitle={`Company`}>
        <CompanyPageLayout sectionTitle={`Designations`}>
            <div>Designations</div>
        </CompanyPageLayout>
    </UserLayout>
  )
}

export default Designations