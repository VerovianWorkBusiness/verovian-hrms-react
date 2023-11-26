import React, { useEffect } from 'react'
import UserLayout from '../../../components/layout/UserLayout'
import PlusIcon from '../../../components/elements/icons/PlusIcon'
import { Link } from 'react-router-dom'
import Preloader from '../../../components/elements/Preloader'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNewsArticles } from '../../../store/actions/newsActions'
import EmptyState from '../../../components/elements/icons/EmptyState'
import NewsArticleCard from '../../../components/partials/news/NewsArticleCard'

const News = () => {
  const newsSelector = useSelector(state => state.news)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchNewsArticles())
    return () => {
      
    };
  }, [dispatch]);
  return (
    <UserLayout pageTitle={`News`}>
      {newsSelector.loadingNewsArticles ? 
        <Preloader />
        :
        <div className=''>
          <div className='w-full lg:flex flex-row gap-x-8'>
            <div className='w-full pb-6 mx-auto px-12 mt-12'>
              <div className='flex justify-between items-center mt-4 mb-4'>
                <h3 className='font-medium text-lg text-gray-400'>News Articles </h3>

                <Link to={`new-article`}>
                  <button className='flex gap-x-2 items-center rounded bg-verovian-purple px-3 py-3 text-verovian-light-purple text-sm transition duration-200 hover:bg-gray-600'>
                    <PlusIcon className={`h-5 w-5`} />
                    Create news article
                  </button>
                </Link>
              </div>

              {newsSelector.newsArticles.length > 0 ?
                <div className='grid grid-cols-3 gap-6'>
                  {newsSelector.newsArticles.map((article, articleIndex)=>(
                    <div key={articleIndex} className="bg-white">
                      <NewsArticleCard article={article} />
                    </div>
                  ))}
                </div>
                :
                <EmptyState emptyStateText={`No articles available at the`} />
              }
            </div>
          </div>
        </div>
      }
    </UserLayout>
  )
}

export default News