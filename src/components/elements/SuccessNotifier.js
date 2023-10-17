import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_SUCCESS_MESSAGE } from '../../store/types';
import CloseIconCircled from './icons/CloseIconCircled';

const SuccessNotifier = () => {
  const dispatch = useDispatch();
    const success = useSelector(state => state.success);

    const dismissHandler = () => {
        dispatch( {
            type: CLEAR_SUCCESS_MESSAGE,
            payload: null
        })
    }

    if(success && success.successMessage !== null) {
        setTimeout(() => {
            dismissHandler()
        }, 20000);
        
        return (
            <div className='fixed top-5 left-5 mt-5 rounded-md text-white p-4 bg-green-500 shadow-lg shadow-green-500/30 transition duration-200  animate__animated animate__fadeIn'  style={{zIndex: '999'}}>
                <button className='absolute -right-8 -top-8' onClick={()=>{dismissHandler()}}>
                    <CloseIconCircled className={`w-8 h-8 text-green-500`} />
                </button>
                <p className='text-sm mb-1'>Success 🎉</p>
                <p className='font-medium text-sm text-white'>
                    {success.successMessage}
                </p>

            </div>
        )
    }
}

export default SuccessNotifier