import CompanyPageLayout from '@/components/layouts/CompanyPageLayout'
import UserLayout from '@/components/layouts/UserLayout'
import React from 'react'

const Groups = () => {
  return (
    <UserLayout pageTitle={`Company`}>
        <CompanyPageLayout sectionTitle={`Groups`}>
            <div>Groups</div>
        </CompanyPageLayout>
    </UserLayout>
  )
}

export default Groups