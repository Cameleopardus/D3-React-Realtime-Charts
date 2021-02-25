
export const SCRAMBLE_DATA = 'userEvents/SCRAMBLE_DATA'
export const DATA_UPDATED = 'userEvents/DATA_UPDATED'

export function dataUpdated(data){
    return {
        type: DATA_UPDATED,
        payload: data
    }
}


export function scrambleData() {
    return {
        type: SCRAMBLE_DATA
    };
}


