import axios, { AxiosAdapter } from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
import qs from 'qs';
import { isEmpty, parseUrl } from './helper';

const apiConfig = {
  url: 'https://api.openweathermap.org',
  appid: '0fc5dda0292b4cb0abfd0221ca9e4822',
  lang: 'ko'
};

const API_SERVER_URL = apiConfig.url;

const DEFAULT_PARAMS = {
  appid: apiConfig.appid,
  lang: apiConfig.lang
};

/**
 * api conn
 *
 * @TODO: axios version upgrade 시, 참고
 * https://joararenewal.atlassian.net/browse/MI-727
 */
const jsonConn = axios.create({
  baseURL: API_SERVER_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json'
  },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter, {
    enabledByDefault: true
  }),
  withCredentials: false,
  responseType: 'json',
  validateStatus: status => status >= 200 && status < 500
});

/**
 * get
 * @param {string} pathname
 * @param {json} params
 * @param {bool} cache
 */
const get = async ({ pathname = '', params = {}, cache = false }) => {
  const parsed = parseUrl(pathname);
  if (!parsed.pathname) {
    return false;
  }

  const requestParams = getRequestParams(
    parsed.params,
    params,
    parsed.pathname
  );
  const requestUrl = `${parsed.pathname}?${qs.stringify(requestParams)}`;

  const res = await jsonConn.get(requestUrl, { cache });
  return res.data;
};

/**
 * get request params
 * @param {json} requiredParams
 * @param {json} params
 */
const getRequestParams = (requiredParams: any, params: any, url: string) => {
  let requestParams: any = {};

  // DEFAULT_PARAMS을 앞으로 보내기 위해 추가. by cjkim
  // 해당 구문이 없을경우 main page의경우 api_key를 requiredParams에서 빈값으로 덮어씌워버린다.
  if (!isEmpty(requiredParams)) {
    Object.assign(requiredParams, DEFAULT_PARAMS);
  }

  Object.assign(requestParams, DEFAULT_PARAMS, requiredParams, params);

  // set required params
  if (!isEmpty(requiredParams)) {
    requestParams = Object.keys(requiredParams).reduce(
      (result: any, key: string) => {
        if (!key) {
          return result;
        }
        result[key] = requiredParams[key]
          ? requiredParams[key]
          : requestParams[key];
        return result;
      },
      {}
    );
  } else {
    requestParams = Object.keys(requestParams).reduce(
      (result: any, key: string) => {
        if (!key) {
          return result;
        }
        result[key] = requiredParams[key]
          ? requiredParams[key]
          : requestParams[key];
        return result;
      },
      {}
    );
  }

  return requestParams;
};

jsonConn.interceptors.response.use(
  response => {
    const { config, data, status } = response;

    if (data && data.status !== undefined && data.status !== 1) {
      console.log(`[FAIL][${status}]`, config, data);
      return Promise.reject({ ...data });
    }
    if (data === null) {
      return {
        ...response,
        data: {}
      };
    }
    return response;
  },
  error => {
    // Your Interceptor code to do something with response error
    // Return error
    console.log('[ERROR] api-interceptors-error : ', error);
    return Promise.reject(error);
  }
);

export default { get };
