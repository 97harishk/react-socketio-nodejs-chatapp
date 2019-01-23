import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from 'reducers';
import * as utils from 'modules/utils';
import rootSaga from 'sagas';


function configureStore (initialState) {
	const loggerMiddleware = createLogger();
	const sagaMiddleware = createSagaMiddleware();
	const middlewares = [sagaMiddleware];
	let composeEnhancer = compose;

	if (utils.isDevelopmentEnv()) {
		middlewares.push(loggerMiddleware);

		/* eslint-disable-next-line */
		if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
			/* eslint-disable-next-line */
			composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
		}
	}

	const store = createStore(
		rootReducer,
		initialState,
		composeEnhancer(
			applyMiddleware(...middlewares)
		)
	);

	sagaMiddleware.run(rootSaga);

	return store;
}

export default configureStore;
