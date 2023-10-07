import Image from 'next/image';
import React, { useState } from 'react'
import { FileUploader } from "react-drag-drop-files";
import { useDispatch } from 'react-redux';
import UploadIcon from '../icons/UploadIcon';
// import { ERROR } from '../../../store/types';

const FileUpload = ({hasError, returnFileDetails, fieldLabel, preAddedFile, preAddedFileName, acceptedFormats}) => {
  // const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [fileExt, setFileExt] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [fileSize, setFileSize] = useState(null)
//   const [hovering, setHovering] = useState(false)
  const dispatch = useDispatch()

  // eslint-disable-next-line no-unused-vars
  const [allowedFormats, setAllowedFormats] = useState(acceptedFormats ? acceptedFormats : ['jpg', 'jpeg', 'png', 'pdf'])
  const handleFile = (addedFile) => {
    // console.log('dropped...')
    // console.log(addedFile)
    //   if(!allowedFormats.includes(addedFile.name.split('.').pop())) {
    //     triggerNotification({
    //       show: true,
    //       success: false,
    //       message: `Only ${allowedFormats.join(', ')} formats allowed please.`
    //     })
    //     return
    //   }
      setUploadedFile(URL.createObjectURL(addedFile))
      // setFile(addedFile)
      setFileSize(addedFile.size/1000000)
      setFileName(addedFile.name.split('.')[0]);
      setFileExt(addedFile.name.split('.').pop());
      returnFileDetails({
        file: addedFile, 
        fileSize: addedFile.size/1000000
      })
  }

  const UploaderChildren = () =>{
    return (
        <div className='rounded-md text-center'>
            <UploadIcon className={`w-6 h-6 text-gray-200 mx-auto`} />
            <p className='text-xs text-gray-500 mb-3 mt-3'>Click or drop file here to {uploadedFile || preAddedFile ? 'change' : 'upload' }</p>
            <p className='text-xs text-gray-500'>Allowed formats: {allowedFormats.join(', ')}</p>
        </div>
      )
  }
  return (
    <div className='relative'>
      <div className={`${hasError && hasError===true ? 'border-red-400' : 'border-black'} my-10 rounded block border bg-transparent items-center relative w-full p-2`}>
          <label 
            className={`text-sm lg:text-md cursor-text bg-white relative px-3 py-1 transition duration-200`}>
                {fieldLabel}
          </label>

          <FileUploader
                multiple={false}
                handleChange={handleFile}
                name="file"
                types={allowedFormats}
                label='Click to upload or drop a file here'
                hoverTitle=""
                onTypeError={(error)=>{
                  dispatch({
                      type: ERROR,
                      error: {response: {data: {
                          message: error
                      }}}
                  })
                }}
                maxSize={4}
                onSizeError={(error)=>{
                  dispatch({
                    type: ERROR,
                    error: {response: {data: {
                        message: error
                    }}}
                })
                }}
                classes="border-gray-200 block w-full flex items-center justify-center"
                // className={`block w-full`}
                // children={}
            >
              <UploaderChildren />
            </FileUploader>

{/* {preAddedFileName} */}

          {(preAddedFile || uploadedFile) && <div className='block lg:flex flex-row-reverse items-center lg:w-inherit relative box-border w-full mt-5'>
              {/* <label
                  className="block h-full border-l-2 border-black px-8 py-6 cursor-pointer bg-black hover:bg-gray-500 transition duration-200 text-xs text-white"
              >
                  <span className="text-sm leading-normal">Click to {uploadedFile || preAddedFile ? 'change' : 'upload' }</span>
                  <input type="file" accept={acceptedFormats ? `.${acceptedFormats.join(',')}` : '.jpg, .jpeg, .pdf, .png'} className="hidden" onChange={(e)=>{handleFile(e.target.files[0])}} webkitrelativepath="true"  />
              </label> */}
              {uploadedFile &&  (
                  fileExt === 'jpeg' || fileExt === 'png' || fileExt === 'jpg' 
                  ?
                  <Image alt="" className="h-[70px] ml-3 mb-3 border-2 rounded-lg border-black" src={uploadedFile} /> 
                  :
                  <div className='h-[75px] mb-3 w-[70px] ml-3 border-2 rounded-lg border-black flex items-center justify-center'>
                      <p className='text-sm font-tomato font-medium text-black'>.{fileExt}</p>
                  </div>
              )}
              {preAddedFile && !uploadedFile && (
                  preAddedFileName.split('.').pop() === 'jpeg' || preAddedFileName.split('.').pop() === 'png' || preAddedFileName.split('.').pop() === 'jpg' 
                  ?
                  <>
                    <a href={preAddedFile} target="_blank" rel="noreferrer">
                      <Image alt="" className="h-[70px] border-2 border-black" src={preAddedFile} /> 
                    </a>
                    <p className="text-xs px-0 mt-3 lg:px-4 text-black w-full">
                      File name: <span className='font-medium'>{preAddedFileName.split('/').pop()}</span>
                    </p> 
                  </>
                  :
                  <a href={preAddedFile} target="_blank" className='h-[75px] w-[70px] border-l-2 border-t-2 border-b-2 border-black flex items-center justify-center' rel="noreferrer">
                      <p className='text-sm font-tomato font-medium text-black'>.{preAddedFileName.split('.').pop()}</p>
                  </a>
              )}
                {fileName && fileName !== '' && 
                <p className="text-xs px-4 text-black w-full">
                    File name: <span className='font-medium'>{fileName.substring(0,25)}{fileName.length > 25 && '...'} <br />Size: {fileSize.toLocaleString()} MB</span>
                </p> }
          </div>}
      </div>
    </div>
  )
}

export default FileUpload