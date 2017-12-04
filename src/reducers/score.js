const initialState = {
    totalScore: 0,
    currentScore: 0,
    currentStar: 0
}

export const score = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_FINAL':
            return {
                ...state,
                totalScore: state.totalScore + action.currentScore,
                currentScore: action.currentScore,
                currentStar: action.currentStar
            };

        default:
            return state;
    }
}

export const updateFinalScore = (currentScore, currentStar) => {
  console.log("updateFinalScore:", currentScore, currentStar)
    return dispatch => {
        dispatch({
            type: 'UPDATE_FINAL',
            currentScore: currentScore,
            currentStar: currentStar
        })
    }
}
