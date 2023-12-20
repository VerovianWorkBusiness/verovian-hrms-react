import React, { useEffect, useState } from 'react'
import UserLayout from '../../../components/layout/UserLayout'
import PlusIcon from '../../../components/elements/icons/PlusIcon'
import { Link } from 'react-router-dom'
import Preloader from '../../../components/elements/Preloader'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNewsArticles } from '../../../store/actions/newsActions'
import EmptyState from '../../../components/elements/icons/EmptyState'
import NewsArticleCard from '../../../components/partials/news/NewsArticleCard'
import { authHeader } from '../../../utils'
import axios from 'axios'
import { NEWS_ERROR } from '../../../store/types'
import FeaturedArticles from '../../../components/partials/news/FeaturedArticles'

const News = () => {
  const newsSelector = useSelector(state => state.news)
  const dispatch = useDispatch()
  const [featuredArticles, setFeaturedArticles] = useState(null);
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    // dispatch(fetchNewsArticles())
    const fetchFeaturedArticles = async () => {    
      try{
        const headers = authHeader()
        setFetching(true)
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/news/articles?featured=true`, { headers })
        // const response = await axios.get(`${process.env.REACT_APP_API_URL}/${requestUrl}?expand=custodian&limit=${pagination.perPage}&page=${pagination.page}&${appliedFilters}&${applySort(sort)}`, { headers })
        dispatch(fetchNewsArticles())
        setFeaturedArticles(response.data.data.articles)
        setFetching(false)
        
      }
      catch(error){
        dispatch( {
          type: NEWS_ERROR,
          error
        })
        setFetching(false)
      }
    }
    fetchFeaturedArticles()
    return () => {
      
    };
  }, [dispatch]);
  return (
    <UserLayout pageTitle={`News`}>
      {newsSelector.loadingNewsArticles || fetching ? 
        <Preloader />
        :
        <div className=''>
          <div className='w-full lg:flex flex-row gap-x-8'>
            <div className='w-full pb-6 mx-auto px-12 mt-12'>
              <div className='flex flex-row-reverse justify-between items-center mt-4 mb-4'>

                <Link to={`new-article`}>
                  <button className='flex gap-x-2 items-center rounded bg-verovian-purple px-3 py-3 text-verovian-light-purple text-sm transition duration-200 hover:bg-gray-600'>
                    <PlusIcon className={`h-5 w-5`} />
                    Create news article
                  </button>
                </Link>
              </div>

              {featuredArticles && featuredArticles.length > 0 && <div className='w-full mb-12'>
                <FeaturedArticles articles={featuredArticles} />
              </div>}

              {newsSelector.newsArticles.length > 0 ?
                <>
                  <h3 className='font-medium text-lg text-gray-400 mb-6'>News Articles </h3>
                  
                  <div className='grid grid-cols-3 gap-6'>
                    {newsSelector.newsArticles.map((article, articleIndex)=>(
                      <div key={articleIndex} className="bg-white">
                        <NewsArticleCard article={article} />
                      </div>
                    ))}
                  </div>
                </>
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