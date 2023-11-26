import React, { useEffect, useState } from 'react'
import UserLayout from '../../../components/layout/UserLayout'
import { authHeader, transactionTimeStamp, userDetails } from '../../../utils';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { ERROR } from '../../../store/types';
import { useDispatch } from 'react-redux';
import Preloader from '../../../components/elements/Preloader';

const NewsArticle = () => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const {articleId} = useParams()
  useEffect(() => {
    const fetchNewsArticle = async () => {    
      try{
        const headers = authHeader()
        let requestUrl = `news/articles/${articleId}`
        setLoading(true)
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${requestUrl}`, { headers })

        setArticle(response.data.data)
        setLoading(false)
      }
      catch(error){
        dispatch( {
            type: ERROR,
            error
        })
      }
    }
    fetchNewsArticle()
    return () => {
      
    };
  }, [dispatch, articleId]);
  return (
    <UserLayout pageTitle={`News Article`}>
    {loading ? <Preloader preloadingText={`Loading article`} /> :
    <div className='relative'>
      {(userDetails().accountPermissions?.includes('*') || userDetails().accountPermissions?.includes('news.*') || userDetails().accountPermissions?.includes('news.update')) && <Link to={`/user/news/article/edit/${articleId}`} className='absolute top-5 right-5 bg-gray-300 text-black p-3 rounded-md border border-gray-600 text-xs font-medium'>Edit article</Link>}
      <div className='w-10/12 2xl:w-7/12 mx-auto bg-white p-8'>
        <div style={{
          width: '100%',
          height: '500px',
          backgroundImage: `url(${(article.coverImageUrl)}`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          position: 'relative',
          marginBottom: '20px'
        }}>
          {!article.published && <span className="absolute top-[10px] right-[10px] bg-black inline rounded p-[5px] text-white bg-opacity-30 text-xs">Draft article</span>}
        </div>

        <h3 className="text-xl mb-3 font-medium text-verovian-purple">{article.title}</h3>
        <div className='flex items-center gap-x-1 flex-wrap pb-3'>
            {article.authors.map((author, authorIndex)=>(
                <p className="text-xs text-gray-400" key={authorIndex}>{author.name} {author?.designation !== '' && `(${author.designation})`}{authorIndex < (article.authors.length - 1) && <span>, </span>}</p>
            ))}
        </div>

        <p className='text-xs text-gray-800 mb-[20px]'>Published: {transactionTimeStamp(article.updatedAt).date} at {transactionTimeStamp(article.updatedAt).time}</p>

        <div className='pb-12' dangerouslySetInnerHTML={{__html: article.body}} />
      </div>
    </div>
    }
    </UserLayout>
  )
}

export default NewsArticle