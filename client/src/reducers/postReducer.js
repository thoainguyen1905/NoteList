import { POST_LOADED_FAIL,POST_LOADED_SUCCESS } from "../contexts/constants"

export const postReducer = (state,action)=>{
    const {type,payload} = action
    switch(type){
        case POST_LOADED_SUCCESS :
            return {
                ...state,
                posts:payload,
                postLoading:false
            }
        case POST_LOADED_FAIL :
             return {
                    ...state,
                    posts:payload,
                    postLoading:false
             }
        default:
            return state
    }
}