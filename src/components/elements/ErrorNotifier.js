import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_ERROR } from '../../store/types';
import CloseIcon from './icons/CloseIcon';
// import LoginModal from './LoginModal';

const ErrorNotifier = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.errors.error);

    const dismissHandler = () => {
        dispatch( {
            type: CLEAR_ERROR
        })
    }

    if (!error) return null;

    // if (error && error.statusCode === 401) {
    //     return (
    //       <LoginModal />
    //     )
    // }

    if(error && error.statusCode !== 401) {
        setTimeout(() => {
            dismissHandler()
        }, 10000);
        console.log('....', error)
        return (

            <div className='fixed flex items-start justify-between top-5 left-5 mt-5 rounded-md text-white p-4 bg-red-700 shadow-lg shadow-red-500/30 transition duration-200  animate__animated animate__fadeIn'  style={{zIndex: '999'}}>
                <div className='w-full'>
                    <p className='text-sm mb-2 font-medium'>Sorry, something went wrong</p>
                    <p className='text-sm text-white'>
                        {error.message}
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

export default ErrorNotifier
