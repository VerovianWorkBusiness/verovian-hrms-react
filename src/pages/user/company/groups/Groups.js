import React from 'react'
import CompanyPageLayout from '../../../../components/layout/CompanyPageLayout'
import UserLayout from '../../../../components/layout/UserLayout'

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