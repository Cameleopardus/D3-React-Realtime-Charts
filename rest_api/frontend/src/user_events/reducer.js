import {SCRAMBLE_DATA, DATA_UPDATED} from './actions'

const initialState = {
    events: [
        {event_type: "type_1", occurences: 10},
        {event_type: "type_2", occurences: 12},
        {event_type: "type_3", occurences: 15},
        {event_type: "type_4", occurences: 16},
    ]
}

 export function reducer(state = initialState, action) {
    //  debugger;
    switch (action.type) {
    case DATA_UPDATED:
        return {
            ...state,
            events: action.payload
        }
    default:
        return state;
    }
}