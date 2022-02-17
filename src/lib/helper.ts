import qs from 'qs';

/**
 * isEmpty
 * @param {mixed} input
 * @return {bool}
 */
export const isEmpty = (input: any) =>
  !input || Object.keys(input).length === 0;

/**
 * parse url
 * @param {string} uri
 * @return {json}
 */
export const parseUrl = (uri: string = '') => {
  const parsedUrl = new URL(uri, window.location.origin);
  const query = parsedUrl.search.slice(1);
  //const params = qs.parse(parsedUrl.query);
  //const params = qs.parse(encodeURIComponent(parsedUrl.query));

  // TODO: '+' 를 공백으로 디코딩하는 문제떄문에 아래와 같이 임시추가한다.
  // 해당 방식은 권장하는 방식이 아닌 임시 대처이며 추후문제가 될시
  // uri의 cid값을 가져와 encodeURIComponent 해주거나, cid를 url로 보내는 시점에서 이미 encodeURIComponent가 되어있어야한다.
  const params = qs.parse(query, { decoder: c => c });

  // TODO: url 은 맞는 단어가 아니다 path를 사용해야한다. 향후 사용하는 곳을 찾아 제거 필요. #JMD-2429
  return {
    pathname: parsedUrl.pathname,
    params,
    hash: parsedUrl.hash,
    pathQueryString: `${parsedUrl.pathname}${parsedUrl.search}`
  };
};
