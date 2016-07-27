import { applyMiddleware,  combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';

//thunk is needed for async action creators. combineReducers is for scaling when more reducers are added.

const combined = combineReducers({
  session
});

function configureStore(initialState) {
  const createFinalStore = compose(
    // redux dev tools
    applyMiddleware(thunk),
    (typeof window != 'undefined' && window.devToolsExtension) ?
    window.devToolsExtension() :
    f => f
  )(createStore);
  const store = createFinalStore(combined, initialState);
  return store;
}

export default configureStore;