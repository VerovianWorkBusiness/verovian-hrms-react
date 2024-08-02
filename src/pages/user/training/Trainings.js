import React, { useEffect } from 'react'
import TrainingsLayout from '../../../components/layout/TrainingsLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getTrainings } from '../../../store/actions/trainingsActions'
import Preloader from '../../../components/elements/Preloader'
import EmptyState from '../../../components/elements/icons/EmptyState'
import PlusIcon from '../../../components/elements/icons/PlusIcon'
import { Link } from 'react-router-dom'

const Trainings = () => {
    const trainingsSelector = useSelector(state => state.trainings)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTrainings())
        return () => {
            
        };
    }, [dispatch]);
    return (
        <TrainingsLayout sectionTitle={`Trainings`}>
            {trainingsSelector.loadingTrainings ? <Preloader preloadingText={`Loading trainings`} /> :
            <div className=''>
                <div className='w-full lg:flex flex-row gap-x-8'>
                    <div className='w-full pb-6 mx-auto mt-6'>
                        <div className='flex flex-row-reverse justify-between items-center mt-4 mb-4'>

                            <Link to={`new-training-module`}>
                            <button className='flex gap-x-2 items-center rounded bg-verovian-purple px-3 py-3 text-verovian-light-purple text-sm transition duration-200 hover:bg-gray-600'>
                                <PlusIcon className={`h-5 w-5`} />
                                Create training
                            </button>
                            </Link>
                        </div>

                        {trainingsSelector?.trainings?.trainings?.length > 0 ?
                            <>                                    
                                <div className='grid grid-cols-3 gap-6'>
                                    {trainingsSelector?.trainingModules?.modules?.map((module, moduleIndex)=>(
                                    <div key={moduleIndex} className="bg-white">
                                        {/* <NewsArticleCard article={article} /> */}
                                        {/* <ModuleCardVertical data={module} /> */}
                                    </div>
                                    ))}
                                </div>
                            </>
                            :
                            <EmptyState emptyStateText={`No trainings created yet, use the "create training module" button above to create a new one.`} />
                        }
                    </div>
                </div>
            </div>}
        </TrainingsLayout>
    )
}

export default Trainings