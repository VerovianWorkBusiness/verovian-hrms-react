import React from 'react'
import { Link } from 'react-router-dom'
import ArrowIcon from '../../elements/icons/ArrowIcon'

const NewsArticleCard = ({article}) => {
  return (
    <>
        <div style={{
            width: '100%',
            height: '300px',
            backgroundImage: `url(${(article.coverImageUrl)}`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            position: 'relative'
        }}>
            {!article.published && <span className="absolute top-[10px] right-[10px] bg-black inline rounded p-[5px] text-white bg-opacity-30 text-xs">Draft article</span>}
        </div>
        <div className='w-full p-6'>
            <h3 className="text-xl mb-3 font-medium text-verovian-purple">{article.title}</h3>
            <div className='flex items-center gap-x-1 flex-wrap'>
                {article.authors.map((author, authorIndex)=>(
                    <p className="text-xs text-gray-400" key={authorIndex}>{author.name}{authorIndex < (article.authors.length + 1) && <span>, </span>}</p>
                ))}
            </div>
            <p className="text-sm mt-5 mb-5">{article.excerpt}</p>
            {article.published ? <Link className='text-sm text-gray-600 flex items-center gap-x-2 hover:text-verovian-purple duration-200 transition mt-3' to={`article/read/${article._id}`}>Read article <ArrowIcon className={`w-4 h-4 -rotate-90`}/></Link> 
            :
            <Link className='text-sm text-gray-600 flex items-center gap-x-2 hover:text-verovian-purple duration-200 transition mt-3' to={`article/edit/${article._id}`}>Edit article <ArrowIcon className={`w-4 h-4 -rotate-90`}/></Link>
            }

        </div>
    </>
  )
}

export default NewsArticleCard