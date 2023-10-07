import React, { useState, useEffect } from 'react'
import zxcvbn from 'zxcvbn'
const PasswordMeter = ({passwordString, returnEvaluation}) => {


    const [passwordEvaluation, setPasswordEvaluation] = useState(null)

    useEffect(() => {
        const checkPassword = async () => {
            const evaluation = zxcvbn(passwordString)
            setPasswordEvaluation(evaluation)
            returnEvaluation(evaluation)
        }

        checkPassword()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [passwordString])
    
    return (
        <div>
            {passwordEvaluation && passwordEvaluation.score ? 
            <div className='h-px w-full bg-gray-200 dark:bg-gray-700 my-2'>
                <div className={`
                    ${passwordEvaluation.score === 1 && 'bg-red-400'} 
                    ${passwordEvaluation.score === 2 && 'bg-orange-300'} 
                    ${passwordEvaluation.score === 3 && 'bg-green-400'} 
                    ${passwordEvaluation.score === 4 && 'bg-green-600'} 
                    transition transform duration-200 h-px
                    `} style={{width: `${(passwordEvaluation.score/4)*100}%`, maxWidth: '100%'}} />
            </div> :
            <div className='h-px w-full bg-gray-200 dark:bg-gray-700 my-2' />
            }

            <p className='text-xs mt-1 tracking-wide leading-5'>
                {passwordEvaluation && passwordString.length > 3 ? 
                <span className={`font-medium text-yellow-700 block`}>
                    {passwordEvaluation.feedback.warning === '' && passwordEvaluation.score >= 3 ? 
                        <span className='text-green-600'>This looks good</span>  
                    : 
                        passwordEvaluation.feedback.warning === '' && passwordEvaluation.feedback.suggestions.length > 0 ? 
                        passwordEvaluation.feedback.suggestions[passwordEvaluation.feedback.suggestions.length - 1] :
                        passwordEvaluation.feedback.warning     
                    }
                </span> 
                :
                <span className={`font-thin text-gray-500 dark:text-gray-400 block`}>type your password above...</span> 
                }
            </p>
        </div>
    )
}

export default PasswordMeter

// 0*bE