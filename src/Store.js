import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { quests } from './reducers/quests';

const reducers = combineReducers({
	quests : quests
})

const store = createStore(
  reducers,
  applyMiddleware(
    thunk,
    logger
  ),
);

export default store;