const initialState = {

}


export default function (state = initialState, action) {
    switch (action.type) {

    case 'GET_USER_DETAILS':
        return { ...state, founduser:action.payload }

    default:
        return state
    }
}
