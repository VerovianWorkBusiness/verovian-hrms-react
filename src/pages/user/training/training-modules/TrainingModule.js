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
import ModuleCardVertical from '../../../../components/partials/trainings/modules/ModuleCardVertical';
import DragDropList from '../../../../components/elements/DragDropList';
import PlusIcon from '../../../../components/elements/icons/PlusIcon';
import MaterialSelection from '../../../../components/partials/trainings/materials/MaterialSelection';
import ModalLayout from '../../../../components/layout/ModalLayout';
import MaterialCardHorizontal from '../../../../components/partials/trainings/materials/MaterialCardHorizontal';

const TrainingModule = () => {
  const trainingsSelector = useSelector(state => state.trainings)
  const dispatch = useDispatch()
  const { moduleId } = useParams()
  const [modulePayload, setModulePayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [materialsList, setMaterialsList] = useState([]);
  useEffect(() => {
    dispatch(getTrainingMaterials())
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
            <div className='w-full'>
              <ModuleCardVertical data={modulePayload} hideLink={true} />
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

            <div className='w-full mt-[25px]'>
              <p className='mt-[20px] font-medium text-[15px]'>Module Assessment</p>
              <p className='text-[12px] mt-2'>Add materials required for this training module. You can drag the materials to place them in the order you want your employees to use them</p>
              <div className='text-center'>
                <Link to={`new-assessment`}  className='block rounded-[8px] mt-[12px] p-3 border border-dashed border-gray-300 w-[60%] mx-auto text-xs text-gray-400 text-center hover:border-gray-600 hover:text-gray-600 transition duration-200'>
                  <span className='flex items-center justify-center gap-x-[5px] uppercase tracking-[0.2em] '>
                    <PlusIcon className={`w-5 h-5`} />
                    create assessment
                  </span>
                  click to add an assessment for this module
                </Link>
              </div>
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