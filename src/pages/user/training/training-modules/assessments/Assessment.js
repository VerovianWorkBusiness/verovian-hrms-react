import React, { useEffect, useState } from 'react'
import TrainingsLayout from '../../../../../components/layout/TrainingsLayout'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { authHeader } from '../../../../../utils';
import axios from 'axios';
import { ERROR } from '../../../../../store/types';
import Preloader from '../../../../../components/elements/Preloader';

const Assessment = () => {
    const dispatch = useDispatch()
    // const assessmentsSelector = useSelector((state => state.assessments))
    const {assessmentId} = useParams()

    const [loading, setLoading] = useState(true);
    const [assessmentDetails, setAssessmentDetails] = useState(null);
    
    useEffect(() => {
        const fetchAssessment = async () => {
            try {
                const headers = authHeader()
                
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/training/assessments/${assessmentId}`, { headers })
                setAssessmentDetails(response.data.data)
                setLoading(false)
              } catch (error) {
                dispatch({
                  type: ERROR,
                  error: error
                })
                setLoading(false)
              }
        }

        fetchAssessment()
        return () => {
            
        };
    }, [dispatch, assessmentId]);

    return (
        <TrainingsLayout sectionTitle={`Assessment Details`}>
        {loading ? <Preloader /> :
            <div className='w-full'>
                <div className='w-full 2xl:w-10/12 bg-white p-6 mt-[20px] mb-[100px]'>
                    <h3 className='text-[14px] font-[500] mb-2'>{assessmentDetails.title}</h3>
                    <div className='w-2/3'>
                        <p className='text-[13px] leading-[18px]'>{assessmentDetails.description}</p>
                    </div>

                    <h3 className='mt-5 mb-2 text-[15px]'>ASSESSMENT QUESTIONS</h3>
                    {assessmentDetails.questions.map((question, questionIndex) => (
                        <div key={questionIndex} className='py-4 border-b'>
                            <p className='uppercase tracking-[0.2em] text-[12px] mb-2'>question {questionIndex + 1}</p>
                            <h4 className='text-[14px] mb-2 leading-[18px]'>{question.question}</h4>

                            <p className='uppercase tracking-[0.2em] text-[12px] mb-2 mt-4'>options</p>
                            {question.options.map((option, optionIndex)=>(
                                <div key={optionIndex} className='flex items-center justify-between gap-x-4 my-5'>
                                    <div className='w-[40px]'>
                                        <div className={`w-[30px] h-[30px] flex items-center justify-center ${option.label === question.answer ? 'bg-green-400' : 'bg-gray-100'}`}>
                                            <p className='text-sm'>{option.label}</p>
                                        </div>
                                    </div>
                                    <div className='w-full'>
                                        <p className='text-[12px]'>{option.value}</p>
                                    </div>
                                </div>
                            ))}
                            
                        </div>
                    ))}
                </div>
            </div>
        }
        </TrainingsLayout>
    )
}

export default Assessment