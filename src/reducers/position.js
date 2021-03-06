const initialState = {
    coords: { lat: 59.333184, long: 18.076914 },
}

export const position = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_POSITION':
            return {
                ...state,
                coords: { lat: action.coords.latitude, long: action.coords.longitude }
            };

        default:
            return state;
    }
}

export const setPosition = (position) => {
    return dispatch => {
        dispatch({
            type: 'SET_POSITION',
            coords: position.coords,
            lat: position.coords.latitude,
            long: position.coords.longitude,
        })
    }
}
