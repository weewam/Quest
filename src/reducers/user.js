import {locations} from '../data/locations'

const selectedQuestion = locations.map(() => {
	return 0
})

const initialState = {
	name : 'Jonte Henrik Birger af Svanberg',
	avatar : 'https://scontent.xx.fbcdn.net/v/t1.0-1/p480x480/14022284_10153890736437799_6132373776909058548_n.jpg?oh=a7a4cd7f03ad6f2c74d45caea1c6cc9f&oe=5ACB15B7',
}


export const user = (state = initialState, action) => {
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