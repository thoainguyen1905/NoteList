export const authReducer = (state,action) => {
    const {type ,payload:{isAuthenticated}} = action
    switch(type){
        case 'SET_AUTH':
            const {user} = action.payload
            return{
                ...state,
                isAuthenticated,
                authLoading:false,
                user
            }
        default :
           return state
    }
}