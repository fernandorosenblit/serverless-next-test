import httpClient from "httpClient";
import normalize from 'json-api-normalizer';

export const API_DATA_SUCCESS = 'API_DATA_SUCCESS';
export const API_DATA_FAILURE = 'API_DATA_FAILURE';

function executeApiRequest(endpoint, options = {}) {
  return httpClient.request({ ...options, url: endpoint }).then(({ data }) => {
    data.data.id = data.data.id || data.data.type;
    return normalize(data, { endpoint, filterEndpoint: false });
  });
}

export default async function executeRequest(dispatch, endpoint, options) {
  return executeApiRequest(endpoint, options || {}).then(
    response =>
        dispatch({
          response,
          type: API_DATA_SUCCESS,
          endpoint
        }),
    error =>
      dispatch({ type: API_DATA_FAILURE, error: error.message || 'Something went wrong' })
  );
}
