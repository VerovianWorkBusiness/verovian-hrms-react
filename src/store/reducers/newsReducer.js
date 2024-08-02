import { CREATE_NEWS_ARTICLE, CREATING_NEWS_ARTICLE, GETTING_NEWS_ARTICLES, GET_NEWS_ARTICLES, NEWS_ERROR } from "../types"

const initialState = {
    newsArticles: [],
    loadingNewsArticles: true,
    newsError: null,
    creatingNewsArticle: false,
    createdNewsArticle : null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){

    switch(action.type){
        case GETTING_NEWS_ARTICLES:
        return {
            ...state,
            loadingNewsArticles:action.payload,
            // fetchingMembers:false
        }
        case GET_NEWS_ARTICLES:
        return{
            ...state,
            loadingNewsArticles:false,
            newsError: false,
            newsArticles: action.payload,
        }
        case CREATING_NEWS_ARTICLE:
        return {
            ...state,
            creatingNewsArticle: action.payload,
            // fetchingMembers:false
        }
        case CREATE_NEWS_ARTICLE:
        return{
            ...state,
            creatingNewsArticle: false,
            newsError: false,
            createdNewsArticle: action.payload,
        }
        case NEWS_ERROR:
        return{
            ...state,
            loadingNewsArticles:false,
            creatingNewsArticles:false,
            newsError: action.payload 
        }
        default: return state
    }

}