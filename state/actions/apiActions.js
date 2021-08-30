import { createThunk, createAction } from '@rootstrap/redux-tools';
import httpClient from 'httpClient';

import { SERVICE_LOCALES } from 'constants/serviceAccessors';
import { toApiLocaleFormat } from 'utils/localeFormatters';

import { CALL_API } from '../middleware/api';

export const getApi = (endpoint, options = {}) => ({
  type: [CALL_API.toString()],
  [CALL_API]: {
    endpoint,
    options: { ...options, method: 'GET' }
  }
});

export const postApi = (endpoint, options = {}) => ({
  type: [CALL_API.toString()],
  [CALL_API]: {
    endpoint,
    options: { ...options, method: 'POST' }
  }
});

export const patchApi = (endpoint, options = {}) => ({
  type: [CALL_API.toString()],
  [CALL_API]: {
    endpoint,
    options: { ...options, method: 'PATCH' }
  }
});

export const putApi = (endpoint, options = {}) => ({
  type: [CALL_API.toString()],
  [CALL_API]: {
    endpoint,
    options: { ...options, method: 'PUT' }
  }
});

export const deleteApi = (endpoint, options = {}) => ({
  type: [CALL_API.toString()],
  [CALL_API]: {
    endpoint,
    options: { ...options, method: 'DELETE' }
  }
});

export const mergeSocketData = createAction('MERGE_SOCKET_DATA');

export const initializeApi = createThunk('INITIALIZE_API', async (locale, dispatch) => {
  try {
    const homeUrl = process.env.API_URL;
    const {
      data: {
        data: { links }
      }
    } = await httpClient.get(homeUrl);

    dispatch(getApi(links[toApiLocaleFormat(SERVICE_LOCALES[locale])]));
  } catch ({ response: { data } }) {
    throw new Error('Api initialization error');
  }
});
