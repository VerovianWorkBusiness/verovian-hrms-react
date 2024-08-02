import React, { useState } from 'react'
import { useEffect } from 'react'
import { authHeader } from '../../../../utils';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTrainingMaterials } from '../../../../store/actions/trainingsActions';
import { ERROR } from '../../../../store/types';
import TrainingsLayout from '../../../../components/layout/TrainingsLayout';
import Preloader from '../../../../components/elements/Preloader';
import DragDropList from '../../../../components/elements/DragDropList';
import PlusIcon from '../../../../components/elements/icons/PlusIcon';
import MaterialSelection from '../../../../components/partials/trainings/materials/MaterialSelection';
import ModalLayout from '../../../../components/layout/ModalLayout';
import MaterialCardHorizontal from '../../../../components/partials/trainings/materials/MaterialCardHorizontal';
import ClockIcon from '../../../../components/elements/icons/ClockIcon';
import { getAssessments } from '../../../../store/actions/assessmentsActions';
import ArrowIcon from '../../../../components/elements/icons/ArrowIcon';

const TrainingModule = () => {
  const trainingsSelector = useSelector(state => state.trainings)
  const assessmentsSelector = useSelector(state => state.assessments)
  const dispatch = useDispatch()
  const { moduleId } = useParams()
  const [modulePayload, setModulePayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [materialsList, setMaterialsList] = useState([]);
  useEffect(() => {
    dispatch(getTrainingMaterials())
    dispatch(getAssessments(`module=${moduleId}`, 0, 0))
    const getTrainingModule = async () => {
      try {
        const headers = authHeader()
        
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/training/modules/${moduleId}?expand=materials.material`, { headers })
        setModulePayload(response.data.data)
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
    
    return () => {
      
    };
  }, [dispatch, moduleId]);

  const [addingMaterials, setAddingMaterials] = useState(false);
  return (
    <>
      <TrainingsLayout sectionTitle={`Training Module Details`}> 
        {loading 
          ? 
          
          <Preloader />

          :
          
          <div className='w-[70%] p-5 bg-white mt-[20px] mb-[100px]'>
            {/* <div className='w-full'>
              <ModuleCardVertical data={modulePayload} hideLink={true} />
            </div> */}

            <div className='w-full relative flex items-start justify-between gap-x-6'>
                <div className='w-full bg-gray-400 bg-opacity-20 flex items-center justify-center' style={{
                    width: '100%',
                    height: '300px',
                    backgroundImage: `url(${(modulePayload.coverImage)}`,
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    position: 'relative'
                }} />

                <div className='w-full px-[20px] pb-[20px] pt-[5px] relative'>
                    <h3 className='text-[15px] mt-[15px] mb-[10px] font-[500]'>{modulePayload.title}</h3>
                    <div className='flex items-center gap-x-[5px] mb-[10px]'>
                        <ClockIcon classes={`w-5 h-5 text-gray-500`} />
                        <p className='text-xs text-gray-500'>{modulePayload.estimatedTime} minutes</p>
                    </div>
                    <p className='text-[13px]'>{modulePayload.description}</p>

                    {/* {!hideLink && <Link to={`/user/trainings/training-modules/module/${data._id}`} className='text-xs text-gray-700 font-[400] flex items-center gap-x-2 hover:text-verovian-purple duration-200 transition mt-3'>See module <ArrowIcon className={`w-4 h-4 -rotate-90`}/></Link>} */}
                </div>
            </div>
            <div className='w-full'>
              <p className='mt-[20px] font-medium text-[15px]'>Module Content</p>
              <p className='text-[12px] mt-2'>Add materials required for this training module. You can drag the materials to place them in the order you want your employees to use them</p>

              <div className='p-5 border border-gray-200 rounded-[8px] mt-4 max-w-[100%]'>
                {modulePayload.materials && modulePayload.materials.length > 0 && 
                  <DragDropList 
                    listItems={modulePayload.materials.map(material => {return material.material})} 
                    returnSorting={(list)=>{setMaterialsList(list)}} 
                    ItemTemplate={MaterialCardHorizontal} 
                  />}
                  <div className='text-center'>
                    <button onClick={()=>{setAddingMaterials(true)}} className='rounded-[8px] mt-[12px] p-3 border border-dashed border-gray-300 w-[60%] mx-auto text-xs text-gray-400 text-center hover:border-gray-600 hover:text-gray-600 transition duration-200'>
                      <span className='flex items-center justify-center gap-x-[5px] uppercase tracking-[0.2em] '>
                        <PlusIcon className={`w-5 h-5`} />
                        add new material
                      </span>
                      click to add a new training material
                    </button>
                  </div>
              </div>
            </div>

            <div className='w-full mt-[35px]'>
              <p className='mt-[20px] font-medium text-[15px]'>Module Assessment</p>
              {/* <p className='text-[12px] mt-2'>Add materials required for this training module. You can drag the materials to place them in the order you want your employees to use them</p> */}
              {assessmentsSelector.loadingAssessments ? <Preloader /> : 
              
              <>
                {assessmentsSelector.assessments.assessments.length > 0 
                ? 
                  <div className='w-full p-5'>
                    <h3 className='text-[14px] font-[500]'>{assessmentsSelector.assessments.assessments[0].title}</h3>
                    <p className='text-[12px] my-2'>{assessmentsSelector.assessments.assessments[0].description}</p>
                    <p className='text-[12px] text-gray-500'>{assessmentsSelector.assessments.assessments[0].questions.length} multi-choice questions</p>
                    <Link to={`/user/trainings/training-modules/module/${modulePayload._id}/assessments/${assessmentsSelector.assessments.assessments[0]._id}`} className='text-xs text-gray-700 font-[400] flex items-center gap-x-2 hover:text-verovian-purple duration-200 transition mt-3'>Preview/Edit Assessment <ArrowIcon className={`w-4 h-4 -rotate-90`}/></Link>
                  </div>
                : 
                
                <div className='text-center'>
                  <Link to={`new-assessment`}  className='block rounded-[8px] mt-[12px] p-3 border border-dashed border-gray-300 w-[60%] mx-auto text-xs text-gray-400 text-center hover:border-gray-600 hover:text-gray-600 transition duration-200'>
                    <span className='flex items-center justify-center gap-x-[5px] uppercase tracking-[0.2em] '>
                      <PlusIcon className={`w-5 h-5`} />
                      create assessment
                    </span>
                    click to add an assessment for this module
                  </Link>
                </div>}

              </>
              
              }
            </div>

          </div>
        }
      </TrainingsLayout>

      {modulePayload && <ModalLayout
        isOpen={addingMaterials} 
        closeModal={()=>{setAddingMaterials(false)}} 
        actionFunction={()=>{}} 
        actionFunctionLabel='Add materials' 
        dialogTitle='Add materials'
        dialogIntro={`Select the materials required for this module below`}
        maxWidthClass='max-w-xl'
      >
        <MaterialSelection 
          materials={trainingsSelector?.trainingMaterials?.materials}
          selectedMaterials={materialsList}
        />
      </ModalLayout>}
    </>
  )
}

export default TrainingModule