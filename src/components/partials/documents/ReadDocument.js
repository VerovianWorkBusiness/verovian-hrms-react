import React, { useEffect, useState } from 'react'
import Preloader from '../../elements/Preloader';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ERROR } from '../../../store/types';

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
    }, []);
    return (
        <div>
        {loading ? 
            <Preloader preloadingText={`Loading document`} /> :
            <div className='pb-12' dangerouslySetInnerHTML={{__html: doc.documentBody}} />
            }
        </div>
    )
}

export default ReadDocument