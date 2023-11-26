import axios from "axios"
import { authHeader } from "../../utils"
import { CREATE_NEWS_ARTICLE, CREATING_NEWS_ARTICLE, GETTING_NEWS_ARTICLES, GET_NEWS_ARTICLES, NEWS_ERROR } from "../types"

export const createNewsArticle = (articlePayload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_NEWS_ARTICLE,
            payload: true
        })
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/news/articles`, articlePayload, { headers })
        
        dispatch({
            type: CREATE_NEWS_ARTICLE,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch({
            type: NEWS_ERROR,
            error
        })
    }
}
export const updateNewsArticle = (articleId, articlePayload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_NEWS_ARTICLE,
            payload: true
        })
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/news/articles/${articleId}`, articlePayload, { headers })
        
        dispatch({
            type: CREATE_NEWS_ARTICLE,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch({
            type: NEWS_ERROR,
            error
        })
    }
}

export const fetchNewsArticles = (pagination, filters, sort, action) => async dispatch => {    
    try{
        const headers = authHeader()
        let requestUrl = 'news/articles'

        dispatch( {
            type: GETTING_NEWS_ARTICLES,
            payload: true
        })

        // let appliedFilters =''
        // if (filters && filters!==null && filters.length > 0) {
        //     appliedFilters = parseFilters(filters, action, 'WALLETS')
        // }


        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${requestUrl}`, { headers })
        // const response = await axios.get(`${process.env.REACT_APP_API_URL}/${requestUrl}?expand=custodian&limit=${pagination.perPage}&page=${pagination.page}&${appliedFilters}&${applySort(sort)}`, { headers })

        dispatch( {
            type: GET_NEWS_ARTICLES,
            payload: response.data.data.articles
        })
        
    }
    catch(error){
        dispatch( {
            type: NEWS_ERROR,
            // payload: error.response.data,
            error
        })
    }
}

export const clearCreatedArticle = () => async dispatch => {
    dispatch({
        type: CREATE_NEWS_ARTICLE,
        payload: null
    })
}