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
        
        return (
            // <div className={`bg-red-300 text-black font-medium fixed top-5 left-0 md:left-5 mt-5 font-atyp block border-2 border-black rounded px-6 py-4 capitalize tranisition duration-200 flex justify-between items-start box-shadow-bottom-solid w-96`} style={{zIndex: '999'}}>   
            //     {/* {error.message} */}
            //     <button 
            //         onClick={dismissHandler} 
            //         className={`text-black hover:text-opacity-60 p-2 transition bg-white duration-200 border-2 border-black`}>
            //         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            //         </svg>
            //     </button>
            // </div>

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
