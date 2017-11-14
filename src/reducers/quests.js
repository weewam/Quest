export const initialState = {
	quests : [],
	selectedQuest : null,
}

export const quests = (state = initialState, action) => {
	switch (action.type) {

		case 'UPDATE_SELECTED_QUEST': 
			return {
				...state,
				selectedQuest : action.selectedId
			};

		default:
			return state;

	}
}

export const updateQuest = (selectQuest) => {
  return dispatch => {
		alert(selectQuest);

    dispatch({
      type: 'UPDATE_SELECTED_QUEST',
      selectedId: selectQuest
    })
  }
}