import merge from 'lodash/merge';
import normalize from 'json-api-normalizer';

import buildMeta from 'utils/buildMeta';
import { mergeSocketData } from 'state/actions/apiActions';
import { API_DATA_FAILURE, API_DATA_REQUEST, API_DATA_SUCCESS } from '../middleware/api';

const initialState = {
  meta: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case API_DATA_SUCCESS:
      return merge(
        {},
        state,
        merge({}, action.response, {
          meta: buildMeta(action.endpoint, { loading: false, success: true, error: false })
        })
      );
    case API_DATA_REQUEST:
      return merge({}, state, {
        meta: buildMeta(action.endpoint, { loading: true, success: false, error: false })
      });
    case API_DATA_FAILURE:
      return merge({}, state, {
        meta: buildMeta(action.endpoint, { loading: false, success: false, error: true })
      });
    case mergeSocketData.toString():
      return merge({}, state, normalize(action.payload, { filterEndpoint: false }));
    default:
      return state;
  }
}
