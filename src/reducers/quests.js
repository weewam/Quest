const initialState = {
	selectedQuest : 0,
}

export const quests = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_SELECTED_QUEST': 
			return {
				...state,
				selectedQuest : action.selectedId
			};

		default:
			return state;
	}
}

export const setQuest = (selectQuest) => {
	return dispatch => {
		dispatch({
			type: 'SET_SELECTED_QUEST',
			selectedId: selectQuest
		})
	}
}