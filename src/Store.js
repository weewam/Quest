import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { quests } from './reducers/quests';
import { position } from './reducers/position'
const reducers = combineReducers({
  quests: quests,
  position: position
})

const store = createStore(
  reducers,
  applyMiddleware(
    thunk,
    logger
  ),
);

export default store;