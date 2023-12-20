import React, { useEffect, useState } from 'react'
import UserLayout from '../../../components/layout/UserLayout'
import TextField from '../../../components/elements/form/TextField';
import TextareaField from '../../../components/elements/form/TextareaField';
import FileUpload from '../../../components/elements/form/FileUpload';
import Wysiwyg from '../../../components/elements/form/Wysiwyg';
import FormButton from '../../../components/elements/form/FormButton';
import { useDispatch, useSelector } from 'react-redux';
import { clearCreatedArticle, createNewsArticle } from '../../../store/actions/newsActions';
import { ERROR, SET_SUCCESS_MESSAGE } from '../../../store/types';
import TrashIcon from '../../../components/elements/icons/TrashIcon';
import { Switch } from '@headlessui/react';
import { authHeader } from '../../../utils';
import { useNavigate } from 'react-router-dom';

const NewArticle = () => {
  const newsSelector = useSelector(state => state.news)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const mediaSchema = {
  //   type: '', // VIDEO, IMAGE, DOCUMENT
  //   url: ''
  // }
  const authorSchema = {
    name: '',
    designation: ''
  }
  const articleSchema = {
    title: '',
    excerpt: '',
    authors: [
      authorSchema
    ],
    coverImageUrl: '',
    body: '',
    published: false
  }

  const [articlePayload, setArticlePayload] = useState(articleSchema);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if(newsSelector.createdNewsArticle !== null) {
      dispatch({
        type: SET_SUCCESS_MESSAGE,
        payload: "news article created successfully!"
      })
      dispatch(clearCreatedArticle())
      navigate('./user/news')
    }
    return () => {
      
    };
  }, [newsSelector.createdNewsArticle, dispatch, navigate]);

  const validateForm = () => {
    let errors = {}
    if (!articlePayload.title || articlePayload.title === '') {
        errors.title = true
    }

    if (!articlePayload.body || articlePayload.body === '') {
        errors.body = true
    }

    if(articlePayload.excerpt && articlePayload.excerpt.length > 250){
      errors.excerpt = true
    }

    if (articlePayload.authors.length === 1 && articlePayload.authors[0].name === '') {
        errors.noAuthor = true
    }

    articlePayload.authors.forEach((author, authorIndex) => {
      if(!author.name || author.name === '') {
        errors[`author-name-${authorIndex}`] = true
      }
    })

    setValidationErrors(errors)
    return errors
  }

  const addAuthor = () => {
    let temp = {...articlePayload}
    temp.authors.push(authorSchema)
    setArticlePayload(temp)
  }

  const removeAuthor = (authorIndex) => {
    let temp = {...articlePayload}
    temp.authors.splice(authorIndex, 1)
    setArticlePayload(temp)
  }

  const updateAuthor = (authorIndex, field, value) => {
    let temp = {...articlePayload}
    temp.authors[authorIndex][field] = value

    setArticlePayload(temp)
  }

  const triggerCreateArticle = async () => {
    if (Object.values(validateForm()).includes(true)) {
      dispatch({
          type: ERROR,
          error: {response: {data: {
              message: 'Please check the highlighted fields'
          }}}
      });
      return
    }
    console.log('article payload: ', articlePayload)
    const uploadResponse = await handleUpload()
    // return
    if(uploadResponse.success) {
      setUploading(false)
      dispatch(createNewsArticle({...articlePayload, ...{coverImageUrl: uploadResponse.data.file}}))
    }
  }

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    console.log(file)
    setUploading(true)   
    var formData = new FormData()
    formData.append('file', file.file )
    // dispatch(uploadTransactionReceipt(id, formdata))
    const headers = new Headers();
    headers.append("Authorization", authHeader().Authorization);
    try {

        const doUpload = await fetch(`${process.env.REACT_APP_API_URL}/files/new`, {
            method: "POST",
            headers,
            body: formData,
        });
        const response = await doUpload.json();

       return response
    } catch (error) {
        dispatch({
            type: ERROR,
            error,
        });
    }
}


  return (
    <UserLayout pageTitle={`Create news article`}>
      <div className='w-10/12 xl:w-8/12 2xl:w-7/12 mx-auto mt-12'>
        
        <div className='my-4 w-full'>
          <TextField
            inputLabel="Article Title" 
            fieldId="article-title" 
            inputType="text" 
            preloadValue={''}
            hasError={validationErrors.title} 
            returnFieldValue={(value)=>{setArticlePayload({...articlePayload, ...{title: value}})}}
          />
        </div>
        
        <div className='my-4 w-full'>
          <TextareaField
            inputLabel="Excerpt (Max 250 chars)" 
            fieldId="article-excerpt" 
            inputType="text" 
            preloadValue={''}
            hasError={validationErrors.excerpt || articlePayload.excerpt.length > 250} 
            returnFieldValue={(value)=>{setArticlePayload({...articlePayload, ...{excerpt: value}})}}
          />
          {articlePayload.excerpt.length > 250 && <label className='block mt-3 text-xs text-red-500'>Excerpt must not be more than 250 characters.</label>}
          <label className='block mt-3 text-xs text-gray-400'>If left blank, the first 250 characters of the article will be used</label>
        </div>

        <div className='my-4 w-full'>
          <FileUpload
            hasError={false}
            fieldLabel={`Cover Image`}
            returnFileDetails={(details)=>{
              setFile(details)
            }}
            acceptedFormats={['jpeg', 'jpg', 'png']}
          />
        </div>

        
        <div className='w-full mt-12 px-8 py-4 rounded bg-gray-100 bg-opacity-60 mb-6 border border-gray-200'>
          <h3 className='font-medium mt-4'>Article Authors</h3>
          <p className='text-sm mb-3'>Add one or more authors for this article</p>
          {validationErrors.noAuthor === true && <p className='text-sm text-red-400 mb-3'>Please add at least one author for your article</p>}
          {articlePayload.authors.map((author, authorIndex)=>(
            <div key={authorIndex} className='w-full mt-6'>
              {authorIndex > 0 && <div className='flex flex-row-reverse mb-2'>
                <button onClick={()=>{removeAuthor(authorIndex)}} className='flex items-center gap-x-2 text-red-600 hover:text-reg-800 duration-200 transition text-xs'>
                  <TrashIcon className={`w-5 h-5`} />
                  Remove author
                </button>
              </div>}
              <div className='flex items-center justify-between gap-x-6 mb-4'>
                <div className='w-full'>
                  <TextField
                    inputLabel="Author name" 
                    fieldId={`author-name-${authorIndex}`} 
                    inputType="text" 
                    preloadValue={author.name || ''}
                    hasError={validationErrors[`author-name-${authorIndex}`]} 
                    returnFieldValue={(value)=>{updateAuthor(authorIndex, 'name', value)}}
                  />
                </div>
                
                <div className='w-full'>
                  <TextField
                    inputLabel="Author designation" 
                    fieldId={`author-designation-${authorIndex}`} 
                    inputType="text" 
                    preloadValue={''}
                    hasError={false} 
                    returnFieldValue={(value)=>{updateAuthor(authorIndex, 'designation', value)}}
                  />
                </div>
              </div>

            </div>
          ))}

          <button onClick={()=>{addAuthor()}} className='w-max p-3 text-sm bg-black text-white rounded'>Add another author</button>
        </div>

        <h3 className='font-medium mt-12'>Article body</h3>
        <p className='text-sm mb-3'>Please create your article in the field below</p>
          
        <div className='w-full border-t mt-6 pt-6 border-gray-300'>
          <div className='borderless px-6 long-text'>
              <Wysiwyg 
                fieldTitle=""
                initialValue={''}
                updateValue={(value)=>{setArticlePayload({...articlePayload, ...{body: value}})}}
                hasError={validationErrors.body}
              />
          </div>
        </div>

        <div className='w-full my-4 flex gap-x-4 items-center justify-between'>
            <div  className='w-full'>
                <p className="text-sm text-gray-600">
                   Publish article?
                </p>
                <p className='text-xs text-gray-400'>Publishing the article now means the article will become visible to the platform users once it's saved.</p>
            </div>
            <div className='w-24'>
                <Switch
                    checked={articlePayload.createUserProfile}
                    onChange={()=>{setArticlePayload({...articlePayload, ...{published: !articlePayload.published}})}}
                    className={`${
                      articlePayload.published ? 'bg-verovian-purple' : 'bg-gray-200'
                    } relative inline-flex items-center h-5 rounded-full w-10`}
                    >
                    {/* <span className="sr-only">Display stock levels</span> */}
                    <span
                        className={`transform transition ease-in-out duration-200 ${
                          articlePayload.published ? 'translate-x-6' : 'translate-x-1'
                        } inline-block w-3 h-3 transform bg-white rounded-full`}
                    />
                </Switch>
            </div>
        </div>

        <div className='my-8 flex flex-row-reverse items-center justify-between'>
            <div className='w-3/12'>
            <FormButton 
              buttonLabel={`Create article`} 
              buttonAction={()=>{triggerCreateArticle()}} 
              processing={uploading || newsSelector.creatingNewsArticle} />
            </div>
        </div>


      </div>
    </UserLayout>
  )
}

export default NewArticle