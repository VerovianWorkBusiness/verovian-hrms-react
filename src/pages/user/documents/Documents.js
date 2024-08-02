import React, { useEffect } from 'react'
import PlusIcon from '../../../components/elements/icons/PlusIcon'
import { Link } from 'react-router-dom'
import DocumentSvgIcon from '../../../assets/img/icons/document-icon.svg'
import UserLayout from '../../../components/layout/UserLayout'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDocuments } from '../../../store/actions/documentActions'
import Preloader from '../../../components/elements/Preloader'

const Documents = () => {
  const dispatch = useDispatch()
  const documentsSelector = useSelector(state => state.documents)

  useEffect(() => {
    dispatch(fetchDocuments())
    return () => {
      
    };
  }, [dispatch]);
  return (
    <UserLayout pageTitle={`Documents`}>
      {documentsSelector.loadingDocuments ? 
        <Preloader />
        :
        <div className=''>
          <div className='w-full lg:flex flex-row gap-x-8'>
            <div className='w-full pb-6 mx-auto px-12 mt-12'>
              <div className='flex justify-between items-center mt-4 mb-4'>
                <h3 className='font-medium text-lg text-gray-400'>Documents </h3>

                <Link to={`new-document`}>
                  <button className='flex gap-x-2 items-center rounded bg-verovian-purple px-3 py-3 text-verovian-light-purple text-sm transition duration-200 hover:bg-gray-600'>
                    <PlusIcon className={`h-5 w-5`} />
                    Create a document
                  </button>
                </Link>
              </div>

              <div className='grid grid-cols-3 gap-6'>
                {documentsSelector.documents?.map((document, documentIndex)=>(<Link key={documentIndex} to={`details/${document._id}`}>
                  <div className='w-full p-5 flex items-start gap-x-3 border bg-white border-transparent hover:border-gray-200 transition duration-200 cursor-pointer'>
                    <div className='w-[100px] h-inherit pt-1'>
                      <img src={DocumentSvgIcon} alt="" />
                    </div>
                    <div className='w-full'>
                      <p className='text-sm font-medium text-verovian-purple'>{document.name}</p>
                      <p className='text-xs text-gray-500'>{document.description}</p>
                      <p className='text-xs text-gray-500 mt-3'>Created {new Date(document.createdAt)?.toLocaleDateString()}</p>
                    </div>
                  </div>
                </Link>))}
                
              </div>
            </div>
          </div>
        </div>
      }
    </UserLayout>
  )
}

export default Documents