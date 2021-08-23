import { combineReducers } from "redux";

const initialState = {
	isLoading: false,
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

const reducers = { appReducer };

export default combineReducers(reducers);
