import httpClient from "httpClient";
import normalize from 'json-api-normalizer';

export const API_DATA_SUCCESS = 'API_DATA_SUCCESS';
export const API_DATA_FAILURE = 'API_DATA_FAILURE';

function executeApiRequest(endpoint, options = {}) {
  return httpClient.request({ ...options, url: endpoint }).then(({ data, responseData }) => {
    data.data.id = data.data.id || data.data.type;
    return { response: normalize(data, { endpoint, filterEndpoint: false }), responseData };
  });
}

export default async function executeRequest(dispatch, endpoint, options) {
  return executeApiRequest(endpoint, options || {}).then(
    ({ response, responseData }) => {
        dispatch({
          response,
          type: API_DATA_SUCCESS,
          endpoint
        })
        return responseData;
    },
    error =>
      dispatch({ type: API_DATA_FAILURE, error: error.message || 'Something went wrong' })
  );
}
