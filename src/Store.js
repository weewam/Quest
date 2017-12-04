import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { user } from './reducers/user'
import { quests } from './reducers/quests'
import { position } from './reducers/position'
import { score } from './reducers/score'
const config = {
	key : 'root',
	storage : AsyncStorage,
	whitelist : ['quests'],
}

const reducers = {
  user: user,
  quests: quests,
  position: position,
	score: score
}

const reducer = persistCombineReducers(config, reducers)

function configureStore() {
	const store = createStore(
	  reducer,
	  applyMiddleware(
	    thunk,
	    logger
	  ),
	);

	const persistor = persistStore(store)

	return { persistor, store }
}

export default configureStore;
