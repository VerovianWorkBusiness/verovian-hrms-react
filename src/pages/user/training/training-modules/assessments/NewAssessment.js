import React, { useEffect, useState } from 'react'
import TrainingsLayout from '../../../../../components/layout/TrainingsLayout'
import TextField from '../../../../../components/elements/form/TextField'
import TextareaField from '../../../../../components/elements/form/TextareaField';
import PlusIcon from '../../../../../components/elements/icons/PlusIcon';
import SelectField from '../../../../../components/elements/form/SelectField';
import FormButton from '../../../../../components/elements/form/FormButton';
import { useNavigate, useParams } from 'react-router-dom';
import { authHeader } from '../../../../../utils';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ERROR, SET_SUCCESS_MESSAGE } from '../../../../../store/types';
import Preloader from '../../../../../components/elements/Preloader';
import { clearCreatedAssessment, createAssessment } from '../../../../../store/actions/assessmentsActions';

const NewAssessment = () => {
    const { moduleId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const assessmentsSelector = useSelector((state => state.assessments))
    const [loading, setLoading] = useState(true);
    const [moduleDetails, setModuleDetails] = useState(null);
    const [materialsList, setMaterialsList] = useState([]);

    useEffect(() => {
        const getTrainingModule = async () => {
            try {
              const headers = authHeader()
              
              const response = await axios.get(`${process.env.REACT_APP_API_URL}/training/modules/${moduleId}?expand=materials.material`, { headers })
              setModuleDetails(response.data.data)
              setMaterialsList(response.data.data.materials)
              setLoading(false)
            } catch (error) {
              dispatch({
                type: ERROR,
                error: error
              })
              setLoading(false)
            }
          }
      
          getTrainingModule()

          if(assessmentsSelector.createdAssessment !== null) {
            dispatch(clearCreatedAssessment())
            dispatch({
                type: SET_SUCCESS_MESSAGE,
                payload: {successMessage: `Assessment created successfully for Module - ${moduleDetails.title}`}
            })
            navigate(`/user/trainings/training-modules/module/${moduleId}`)
          }
        return () => {
            
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, moduleId, assessmentsSelector.createdAssessment, navigate]);
    
    const [validationErrors, setValidationErrors] = useState({});
    const [assessmentPayload, setAssessmentPayload] = useState({});

    const assessmentQuestionOption = {
        label: '',
        value: ''
    }

    const assessmentQuestion = {
        question: '',
        sourceMaterial: '',
        answer: '',
        options: [assessmentQuestionOption]
    }
    const [questions, setQuestions] = useState([assessmentQuestion]);

    const addOption = (questionIndex) => {
        const tempQuestions = [...questions]
        tempQuestions[questionIndex].options.push(assessmentQuestionOption)
        setQuestions(tempQuestions)
    }
    
    const updateOption = (questionIndex, optionIndex, field, value) => {
        const tempQuestions = [...questions]
        tempQuestions[questionIndex].options[optionIndex][field] = value
        setQuestions(tempQuestions)
    }

    const addQuestion = () => {
        const tempQuestions = [...questions]
        tempQuestions.push(assessmentQuestion)
        setQuestions(tempQuestions)
    }

    const updateQuestion = (questionIdex, field, value) => {
        const tempQuestions = [...questions]
        tempQuestions[questionIdex][field] = value
        setQuestions(tempQuestions)
    }


  const validateForm = () => {
        let errors = {}
        if (!assessmentPayload.title || assessmentPayload.title === '') {
            errors.title = true
        }
        if (!assessmentPayload.description || assessmentPayload.description === '' || assessmentPayload.description.length > 400) {
            errors.description = true
        }
        // if (!materialsList || materialsList.length === 0) {
        //     errors.estTime = true
        // }
        questions.forEach((question, questionIndex) => {
            if(!question.question || question.question === '') {
                errors[`question-${questionIndex}`] = true
            }
            if(!question.answer || question.answer === '') {
                errors[`correct-answer-${questionIndex}`] = true
            }
            if(!question.sourceMaterial || question.sourceMaterial === '') {
                errors[`source-material-${questionIndex}`] = true
            }

            question.options.forEach((option, optionIndex)=>{
                if(!option.label || option.label === '') {
                    errors[`label-${questionIndex}-${optionIndex}`] = true
                }
                if(!option.value || option.value === '') {
                    errors[`value-${questionIndex}-${optionIndex}`] = true
                }
            })
        })

        console.log(errors)

        setValidationErrors(errors)
        return errors
    }

    const pushAssessment = async () => {
        if (Object.values(validateForm()).includes(true)) {
            dispatch({
                type: ERROR,
                error: {response: {data: {
                    message: 'Please check the highlighted fields'
                }}}
            });
            return
        }
    
        const payload = {
            ...assessmentPayload,
            ...{
                module: moduleId,
                questions: questions.map((question, questionIndex) => {
                    return {
                        ...question,
                        ...{
                            order: questionIndex
                        }
                    }
                })
            }
        }
    
        dispatch(createAssessment(payload))
    }

    return (
        <TrainingsLayout sectionTitle={`Create a new assessment`}>
        {loading 
            ? 
            
            <Preloader />

            :
            
            <div className='bg-white min-h-screen h-inherit w-8/12 mt-[20px] p-5 mb-[200px]'>
                <p className='text-sm font-[550] mb-2'>New Assessment for module - {moduleDetails.title}</p>
                <p className='text-xs'>Please provide details of the assessment along with the questions, options and answers to create an assessment. Please note that only multi-choice questions are allowed and each question can have a maximum of 4 options each.</p>

                <div className='mt-[20px] mb-[100px]'>
                    <div className='w-full max-w-[100%]'>
                        <div className='mb-4 mt-2 w-full'>
                            <TextField
                                inputLabel="Title" 
                                fieldId="material-name" 
                                inputType="text" 
                                preloadValue={''}
                                hasError={validationErrors.title } 
                                returnFieldValue={(value)=>{setAssessmentPayload({...assessmentPayload, ...{title: value}})}}
                            />
                        </div>

                        <div className='mb-4 mt-2 w-full'>
                            <TextareaField
                                inputLabel="Description" 
                                fieldId="material-description" 
                                inputType="text" 
                                preloadValue={''}
                                hasError={validationErrors.description} 
                                returnFieldValue={(value)=>{setAssessmentPayload({...assessmentPayload, ...{description: value}})}}
                            />
                            {assessmentPayload?.description?.length > 400 && <p className='text-xs text-red-500 mt-[10px]'>Description text is too long, please make it 400 characters or less</p>}
                        </div>
                        
                        <p className='mt-[20px] text-[14px] font-[500]'>Assessment Questions</p>
                        <p className='text-sm'>Please provide questions below, click on "add question" for each question you need to add</p>

                        <div className='p-5 border border-gray-200 rounded-[8px] mt-4 max-w-[100%]'>
                            {questions.map((question, questionIndex) => (
                                <div key={questionIndex} className='mt-[30px]'>
                                    <p className='mb-[10px] text-[14px] font-[400] uppercase tracking-[0.2em]'>Question {questionIndex + 1}</p>
                                    <div className='w-full'>
                                        <TextField
                                            inputLabel="Question" 
                                            fieldId={`question-${questionIndex}`} 
                                            inputType="text" 
                                            preloadValue={''}
                                            hasError={validationErrors[`question-${questionIndex}`]} 
                                            returnFieldValue={(value)=>{updateQuestion(questionIndex, 'question', value)}}
                                        />
                                    </div>

                                    <div className='p-5 bg-gray-50 rounded'>
                                        <p className='mt-[10px] mb-[5px] text-[14px] font-[500]'>Please create options for this question</p>

                                        {question.options.map((option, optionIndex) => (
                                            <div key={optionIndex}>
                                                <div className='flex items-start gap-x-[8px] mt-3'>
                                                    <div className='w-3/12'>
                                                        <SelectField
                                                            selectOptions={[
                                                                {label: 'A', value: 'A'},
                                                                {label: 'B', value: 'B'},
                                                                {label: 'C', value: 'C'},
                                                                {label: 'D', value: 'D'},
                                                            ]}
                                                            inputLabel="Label"
                                                            titleField="label"
                                                            displayImage={false}
                                                            imageField=""
                                                            preSelected=''
                                                            fieldId={`option-label-${questionIndex}-${optionIndex}`}
                                                            hasError={validationErrors[`label-${questionIndex}-${optionIndex}`]}
                                                            // return id of accounts of the selected option
                                                            returnFieldValue={(value) => {updateOption(questionIndex, optionIndex, 'label', value.value)}}
                                                        />
                                                    </div>
                                                    <div className='w-9/12'>
                                                        <TextField
                                                            inputLabel="Value" 
                                                            fieldId={`option-value-${questionIndex}-${optionIndex}`}
                                                            inputType="text" 
                                                            preloadValue={''}
                                                            hasError={validationErrors[`value-${questionIndex}-${optionIndex}`]} 
                                                            returnFieldValue={(value)=>{updateOption(questionIndex, optionIndex, 'value', value)}}
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        ))}
                                        {question.options.length < 4 && <button onClick={()=>{addOption(questionIndex)}} className='rounded-[8px] mt-[12px] p-3 border border-dashed border-gray-300 w-full text-xs text-gray-400 text-center hover:border-gray-600 hover:text-gray-600 transition duration-200'>
                                            <span className='flex items-center justify-center gap-x-[5px] uppercase tracking-[0.2em] '>
                                            <PlusIcon className={`w-5 h-5`} />
                                            add option
                                            </span>
                                        </button>}
                                    </div>
                                    

                                    <div className='w-full mb-4'>
                                        <SelectField
                                            selectOptions={[
                                                {label: 'A', value: 'A'},
                                                {label: 'B', value: 'B'},
                                                {label: 'C', value: 'C'},
                                                {label: 'D', value: 'D'},
                                            ]}
                                            inputLabel="Select the correct option"
                                            titleField="label"
                                            displayImage={false}
                                            imageField=""
                                            preSelected=''
                                            fieldId={`correct-answer-${questionIndex}`}
                                            hasError={validationErrors[`correct-answer-${questionIndex}`]}
                                            // return id of accounts of the selected option
                                            returnFieldValue={(value) => {updateQuestion(questionIndex, 'answer', value.value)}}
                                        />
                                    </div>

                                    <div className='w-full mb-4'>
                                        <SelectField
                                            selectOptions={materialsList.map(material => {return material.material})}
                                            inputLabel="Select the source material for this question"
                                            titleField="title"
                                            displayImage={false}
                                            imageField=""
                                            preSelected=''
                                            fieldId={`source-material-${questionIndex}`}
                                            hasError={validationErrors[`source-material-${questionIndex}`]}
                                            returnFieldValue={(value) => {updateQuestion(questionIndex, 'sourceMaterial', value._id)}}
                                        />
                                    </div>

                                </div>
                            ))}
                            <button onClick={()=>{addQuestion()}} className='rounded-[8px] mt-[12px] p-3 border border-dashed border-gray-300 w-full text-xs text-gray-400 text-center hover:border-gray-600 hover:text-gray-600 transition duration-200'>
                                <span className='flex items-center justify-center gap-x-[5px] uppercase tracking-[0.2em] '>
                                <PlusIcon className={`w-5 h-5`} />
                                add question
                                </span>
                                click to add a new training material
                            </button>
                        </div>
                    </div>
                </div>

                <div className='flex flex-row-reverse mt-[20px]'>
                    <div className='w-max'>
                        <FormButton buttonLabel={`Create assessment`} buttonAction={()=>{pushAssessment()}} processing={assessmentsSelector.creatingAssessment} />
                    </div>
                </div>
            </div>
        }
        </TrainingsLayout>
    )
}

export default NewAssessment