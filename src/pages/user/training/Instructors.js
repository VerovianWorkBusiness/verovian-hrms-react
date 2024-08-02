import React, { useEffect, useState } from 'react'
import TrainingsLayout from '../../../components/layout/TrainingsLayout'
import { useDispatch, useSelector } from 'react-redux'
import { clearCreatedInstructor, getInstructors } from '../../../store/actions/instructorsActions'
import Preloader from '../../../components/elements/Preloader'
import EmptyState from '../../../components/elements/icons/EmptyState'
import InstructorProfileCard from '../../../components/partials/trainings/instructors/InstructorProfileCard'
import PlusIcon from '../../../components/elements/icons/PlusIcon'
import ModalLayout from '../../../components/layout/ModalLayout'
import NewInstructor from '../../../components/partials/trainings/instructors/NewInstructor'
import { SET_SUCCESS_MESSAGE } from '../../../store/types'

const Instructors = () => {
    const instructorsSelector = useSelector(state => state.instructors)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getInstructors())

        if(instructorsSelector.createdInstructor !== null) {
            dispatch({
				type: SET_SUCCESS_MESSAGE,
				payload: {
					successMessage: 'New instructor created successfully'
				}
			})
            dispatch(clearCreatedInstructor())
            setCreateInstructorModalOpen(false)
        }
        return () => {
            
        };
    }, [dispatch, instructorsSelector.createdInstructor]);

    const [createInstructorModalOpen, setCreateInstructorModalOpen] = useState(false);

    return (
        <>
            <TrainingsLayout sectionTitle={`Instructors`}>
                {instructorsSelector.loadingInstructors 
                ? 
                    <Preloader preloadingText={`Loading instructors`} /> 
                :
                    <div className=''>
                        <div className='w-full lg:flex flex-row gap-x-8'>
                            <div className='w-full pb-6 mx-auto mt-12'>
                                <div className='flex flex-row-reverse justify-between items-center mt-4 mb-4'>
                                    <button onClick={()=>{setCreateInstructorModalOpen(true)}} className='flex gap-x-2 items-center rounded bg-verovian-purple px-3 py-3 text-verovian-light-purple text-sm transition duration-200 hover:bg-gray-600'>
                                        <PlusIcon className={`h-5 w-5`} />
                                        Create Instructor
                                    </button>
                                </div>

                                {instructorsSelector?.instructors?.instructors?.length > 0 ?
                                    <>
                                        <h3 className='font-medium text-lg text-gray-400 mb-6'>Instructors </h3>
                                        
                                        <div className='grid grid-cols-3 gap-6'>
                                            {instructorsSelector.instructors.instructors.map((instructor, instructorIndex)=>(
                                            <div key={instructorIndex}>
                                                <InstructorProfileCard instructor={instructor} />
                                            </div>
                                            ))}
                                        </div>
                                    </>
                                    :
                                    <EmptyState emptyStateText={`No instructors created yet, use the "create instructor" button above to create a new one.`} />
                                }
                            </div>
                        </div>
                    </div>
                }
            </TrainingsLayout>
            <ModalLayout
                isOpen={createInstructorModalOpen} 
                closeModal={()=>{setCreateInstructorModalOpen(false)}} 
                actionFunction={()=>{}} 
                actionFunctionLabel='Create instructor' 
                dialogTitle='Create a new instructor'
                dialogIntro={`Provide instructor details below to create a new instructor profile`}
                maxWidthClass='max-w-7xl'
            >
                <NewInstructor />
            </ModalLayout>
        </>
    )
}

export default Instructors