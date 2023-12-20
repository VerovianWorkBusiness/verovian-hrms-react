import React, { useEffect, useState } from 'react'
import Preloader from '../../elements/Preloader';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ERROR } from '../../../store/types';
import DownloadIcon from '../../elements/icons/DownloadIcon';

const ReadDocument = ({documentId, employeeId}) => {
    const [loading, setLoading] = useState(true);
    const [doc, setDoc] = useState(null);
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchDocument = async () => {    
            try{
            //   const headers = authHeader()
              let requestUrl = `documents/read/${documentId}/${employeeId}`
              setLoading(true)
              const response = await axios.get(`${process.env.REACT_APP_API_URL}/${requestUrl}`, { })
      
              setDoc(response.data.data)
              setLoading(false)
            }
            catch(error){
              dispatch( {
                  type: ERROR,
                  error
              })
            }
          }
          fetchDocument()
        return () => {
            
        };
    }, [dispatch, documentId, employeeId]);

    const downloadDocument = async () => {
      try {
        const header = {
          responseType: 'blob'
        }
        
        let url = `${process.env.REACT_APP_API_URL}/documents/download/${documentId}/${employeeId}`
        const response =  await axios.get(url, header ) 

        const blob = new Blob([response.data], {type: "application/pdf"})
        const receiptUrl = window.URL.createObjectURL(blob)

        var link = document.createElement('a');
        link.href = receiptUrl;
        link.download = `${doc.slug}-${documentId}.pdf`;
        setTimeout(() => {
            link.click();
        }, 100);
        // setFetchingCsv(false)

      } catch (error) {
          // setFetchingCsv(false)
          dispatch({
              type: ERROR,
              error
          })
      }
    }

    return (
        <div>
        {loading ? 
            <Preloader preloadingText={`Loading document`} /> :
            <>
              <div className='w-full flex flex-row-reverse mb-5'>
                <button onClick={()=>{downloadDocument()}} className='flex items-center gap-x-2 px-4 py-3 rounded border border-verovian-purple text-verovian-purple hover:border-gray-400 hover:text-gray-400 transition duration-200 text-xs'>
                  <DownloadIcon className={`w-4 h-4`} />
                  Download document
                </button>
              </div>
              <div className='pb-12' dangerouslySetInnerHTML={{__html: doc.documentBody}} />
            </>
            }
        </div>
    )
}

export default ReadDocument