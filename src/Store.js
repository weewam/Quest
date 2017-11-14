import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { quests } from './reducers/quests';

const initialState = {};

let store = createStore(
  quests,
  initialState,
  applyMiddleware(
    thunk,
    logger
  ),
);

export default store;