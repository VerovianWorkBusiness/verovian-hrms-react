import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_SUCCESS_MESSAGE } from '../../store/types';
import CloseIcon from './icons/CloseIcon';

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

            <div className='fixed flex items-start justify-between top-5 left-5 mt-5 rounded-md text-white p-4 bg-green-500 shadow-lg shadow-green-500/30 transition duration-200  animate__animated animate__fadeIn'  style={{zIndex: '999'}}>
                <div className='w-full'>
                    <p className='text-sm mb-2 font-medium'>Success 🎉</p>
                    <p className='text-sm text-white'>
                    {success.successMessage.successMessage}
                    </p>
                </div>
                <div className='w-[30px] flex flex-row-reverse'>
                    <button className='' onClick={()=>{dismissHandler()}}>
                        <CloseIcon className={`w-5 h-5 text-white`} />
                    </button>
                </div>
            </div>
        )
    }
}

export default SuccessNotifier