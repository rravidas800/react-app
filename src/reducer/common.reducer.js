import { LOGIN, LOGOUT } from '../action/common';

export const initialState={userdata:{}};

export default (state=initialState,action)=>{
   
    switch(action.type)
    {
        case LOGIN : {
            return {
                ...state,
                userdata:action.data
            }
        }
        case LOGOUT :{
            return {
                ...state,
                userdata:{}
            }
        }
        default : return state
    }
}



