/**
 * JSON API + Redux middleware based on the following article:
 * https://www.smashingmagazine.com/2017/05/json-api-normalizer-redux/
 */

import normalize from 'json-api-normalizer';
import httpClient from 'httpClient';

export const API_DATA_REQUEST = 'API_DATA_REQUEST';
export const API_DATA_SUCCESS = 'API_DATA_SUCCESS';
export const API_DATA_FAILURE = 'API_DATA_FAILURE';

function executeApiRequest(endpoint, options = {}) {
  return httpClient.request({ ...options, url: endpoint }).then(({ data }) => {
    data.data.id = data.data.id || data.data.type;
    return normalize(data, { endpoint, filterEndpoint: false });
  });
}

export const CALL_API = Symbol('CALL_API');

const middleware = store => next => action => {
  // Select only the actions with Symbol CALL_API
  const callAPI = action[CALL_API];

  // Filter out any actions that are not CALL_API from continuing executing this middleware
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { options } = callAPI;

  // The endpoint can be a function to select the actual endpoint from the state
  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  // Middleware fails if the endpoint is not a string
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  // Add extra information to the response obtained, such as type, endpoint, error message.
  const actionWith = data => {
    const finalAction = { ...action, ...data };
    delete finalAction[CALL_API];
    return finalAction;
  };

  // Dispatch API_DATA_REQUEST action to the store
  next(actionWith({ type: API_DATA_REQUEST, endpoint }));

  // Execute the api call and dispatch the corresponding actions based on the success of the call
  return executeApiRequest(endpoint, options || {}).then(
    response =>
      next(
        actionWith({
          response,
          type: API_DATA_SUCCESS,
          endpoint
        })
      ),
    error =>
      next(actionWith({ type: API_DATA_FAILURE, error: error.message || 'Something went wrong' }))
  );
};

export default middleware;
