import { combineReducers } from "redux";
import api from './reducers/apiReducer';

const initialState = {
	isLoading: false,
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

const reducers = { appReducer, api };

export default combineReducers(reducers);
