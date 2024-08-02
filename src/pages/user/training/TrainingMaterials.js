import React, { useEffect } from 'react'
import Preloader from '../../../components/elements/Preloader';
import TrainingsLayout from '../../../components/layout/TrainingsLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getTrainingMaterials } from '../../../store/actions/trainingsActions';
import EmptyState from '../../../components/elements/icons/EmptyState';
import PlusIcon from '../../../components/elements/icons/PlusIcon';
import { Link } from 'react-router-dom';
import MaterialCardVertical from '../../../components/partials/trainings/materials/MaterialCardVertical';
// import Player from '../../../components/elements/Player';

const TrainingMaterials = () => {
    const trainingsSelector = useSelector(state => state.trainings)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTrainingMaterials())
        return () => {
            
        };
    }, [dispatch]);
    return (
        <TrainingsLayout sectionTitle={`Training Materials`}>
            {trainingsSelector.loadingTrainingMaterials ? 
                <Preloader preloadingText={`Loading training materials`} /> 
                :
                <div className=''>
                    {/* <Player /> */}
                    <div className='w-full lg:flex flex-row gap-x-8'>
                        <div className='w-full pb-6 mx-auto px-12 mt-12'>
                            <div className='flex flex-row-reverse justify-between items-center mt-4 mb-4'>

                                <Link to={`new-training-material`}>
                                <button className='flex gap-x-2 items-center rounded bg-verovian-purple px-3 py-3 text-verovian-light-purple text-sm transition duration-200 hover:bg-gray-600'>
                                    <PlusIcon className={`h-5 w-5`} />
                                    Create training material
                                </button>
                                </Link>
                            </div>

                            {trainingsSelector.trainingMaterials?.materials?.length > 0 ?
                                <>
                                    {/* <h3 className='font-medium text-lg text-gray-400 mb-6'>Training Materials </h3> */}
                                    
                                    <div className='grid grid-cols-3 gap-6'>
                                        {trainingsSelector?.trainingMaterials?.materials?.map((material, materialIndex)=>(
                                        <div key={materialIndex} className="bg-white">
                                            <MaterialCardVertical material={material} />
                                        </div>
                                        ))}
                                    </div>
                                </>
                                :
                                <EmptyState emptyStateText={`No training materials created yet, use the "create training material" button above to create a new one.`} />
                            }
                        </div>
                    </div>
                </div>
            }
        </TrainingsLayout>
    )
}

export default TrainingMaterials