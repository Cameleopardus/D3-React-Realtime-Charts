import { combineReducers } from 'redux'
import { reducer as userEventReducer } from './user_events/reducer'

const realtimedemo = combineReducers({
    user_events: userEventReducer
})

export default realtimedemo
