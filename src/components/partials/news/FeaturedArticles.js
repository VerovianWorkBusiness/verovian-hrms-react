import React, { useEffect, useState } from 'react'
import ArrowIcon from '../../elements/icons/ArrowIcon';
import { Link } from 'react-router-dom';

const FeaturedArticles = ({articles}) => {
    const [activeArticleIndex, setActiveArticleIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
          setActiveArticleIndex((prevCounter) => (prevCounter === articles.length - 1 ? 0 : prevCounter + 1));
        }, 10000);
    
        return () => clearInterval(intervalId);
    }, [articles.length]); 

    const nextPage = () => {
        if(activeArticleIndex === articles.length - 1) return
        setActiveArticleIndex(activeArticleIndex+1)
    }

    const previousPage = () => {
        if(activeArticleIndex === 0) return
        setActiveArticleIndex(activeArticleIndex-1)
    }
    return (
        <>
            <h3 className='font-medium text-lg text-gray-400 mb-6'>Featured news articles </h3>
            <div className='w-full flex items-start relative gap-x-8'>
                <div className='w-7/12'>
                    <div style={{
                        width: '100%',
                        height: '450px',
                        backgroundImage: `url(${(articles[activeArticleIndex].coverImageUrl)}`,
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                        position: 'relative'
                    }} />
                </div>
                <div className='w-5/12'>
                    <h3 className="text-xl mb-3 font-medium text-verovian-purple">{articles[activeArticleIndex].title}</h3>
                    <div className='flex items-center gap-x-1 flex-wrap'>
                        {articles[activeArticleIndex].authors.map((author, authorIndex)=>(
                            <p className="text-xs text-gray-400" key={authorIndex}>{author.name}{authorIndex < (articles[activeArticleIndex].authors.length + 1) && <span>, </span>}</p>
                        ))}
                    </div>
                    <p className="text-sm mt-5 mb-5">{articles[activeArticleIndex].excerpt}</p>
                    <Link className='text-sm text-gray-600 flex items-center gap-x-2 hover:text-verovian-purple duration-200 transition mt-3' to={`article/read/${articles[activeArticleIndex]._id}`}>Read article <ArrowIcon className={`w-4 h-4 -rotate-90`}/></Link> 

                    <div className='flex items-center mt-20'>
                        <button onClick={()=>{previousPage()}} className='w-[50px] h-[50px] flex items-center justify-center bg-gray-100 text-gray-700 transition duration-200 border-b-2 border-gray-300 hover:bg-gray-300'>
                            <ArrowIcon className={`w-4 h-4 rotate-90`} />
                        </button>
                        <button onClick={()=>{nextPage()}} className='w-[50px] h-[50px] flex items-center justify-center bg-gray-100 text-gray-700 transition duration-200 border-b-2 border-gray-500 hover:bg-gray-300'>
                            <ArrowIcon className={`w-4 h-4 -rotate-90`} />
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default FeaturedArticles