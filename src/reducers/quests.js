import {locations} from '../data/locations'
const selectedQuestion = locations.map(() => {
	return 0
})
const initialState = {
	selectedQuest : 0,
	focusedQuest : 0,
	selectedQuestion: selectedQuestion,
}


export const quests = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_SELECTED_QUEST':
			return {
				...state,
				selectedQuest: action.selectedId
			};
		case 'SET_FOCUSED_QUEST': 
			return {
				...state,
				focusedQuest : action.selectedId
			};
		case 'SET_NEXT_QUESTION': 
			let newSelectedQuestion = state.selectedQuestion.slice();
			newSelectedQuestion[state.selectedQuest] = action.nextQuestionId;
			return {
				...state,
				selectedQuestion : newSelectedQuestion,
			};
		case 'NEXT_QUESTION':
			let updatedSelectedQuestion = state.selectedQuestion.slice();
			updatedSelectedQuestion[state.selectedQuest]++;
			return {
				...state,
				selectedQuestion : updatedSelectedQuestion,
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

export const setFocusedQuest = (selectQuest) => {

	return dispatch => {
		dispatch({
			type: 'SET_FOCUSED_QUEST',
			selectedId: selectQuest
		})
	}
}
export const setNextQuestion = (nextQuestion) => {
	return dispatch => {
		dispatch({
			type: 'SET_NEXT_QUESTION',
			nextQuestionId: nextQuestion
		})
	}
}
export const nextQuestion = () => {

	return dispatch => {
		dispatch({
			type: 'NEXT_QUESTION'
		})
	}
}

