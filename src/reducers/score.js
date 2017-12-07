const initialState = {
    totalScore: 0,
    currentScore: 0,
    currentStar: 0,
    starList: {}
}

export const score = (state = initialState, action) => {
    // console.log("score:", state.totalScore, action.currentScore)
    switch (action.type) {
        case 'UPDATE_FINAL':
            state.starList[action.currentQuestion] = action.currentStar;
            return {
                ...state,
                totalScore: state.totalScore + action.currentScore,
                currentScore: action.currentScore,
                currentStar: action.currentStar,
                starList: state.starList
            };

        default:
            return state;
    }
}

export const updateFinalScore = (currentScore, currentStar, currentQuestion) => {
  console.log("updateFinalScore:", currentStar)
    return dispatch => {
        dispatch({
            type: 'UPDATE_FINAL',
            currentScore: currentScore,
            currentStar: currentStar,
            currentQuestion: currentQuestion
        })
    }
}
