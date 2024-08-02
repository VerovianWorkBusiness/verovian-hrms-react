import { CREATE_DOCUMENT, CREATING_DOCUMENT, DOCUMENTS_ERROR, GETTING_DOCUMENTS, GET_DOCUMENTS, UPDATE_DOCUMENT, UPDATING_DOCUMENT} from "../types"

const initialState = {
    documents: [],
    loadingDocuments: false,
    documentsError: null,
    creatingDocument: false,
    createdDocument: null,
    updatingDocument: false,
    updatedDocument: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){

    switch(action.type){
        case GETTING_DOCUMENTS:
        return {
            ...state,
            loadingDocuments: action.payload,
            // fetchingMembers:false
        }
        case GET_DOCUMENTS:
        return{
            ...state,
            loadingDocuments: false,
            documentsError: false,
            documents: action.payload,
        }
        case CREATING_DOCUMENT:
        return {
            ...state,
            creatingDocument: action.payload,
            // fetchingMembers:false
        }
        case CREATE_DOCUMENT:
        return{
            ...state,
            creatingDocument:false,
            documentsError: null,
            createdDocument: action.payload,
        }
        case UPDATING_DOCUMENT:
        return {
            ...state,
            updatingDocument: action.payload,
            // fetchingMembers:false
        }
        case UPDATE_DOCUMENT:
        return{
            ...state,
            updatingDocument:false,
            documentsError: null,
            updatedDocument: action.payload,
        }
        case DOCUMENTS_ERROR:
        return{
            ...state,
            loadingDocuments:false,
            creatingDocument: false,
            updatingDocument: false,
            documentsError: action.payload 
        }
        default: return state
    }

}