import { getStorage, request, setStorage } from 'remax/wechat';

/**
 * 网络请求Url前缀
 */
const BaseUrl: string = 'http://localhost:50003/api';

/**
 * 登陆API
 * @param data 获取的loginCode
 */
export const getDocumentType = (code: string): Promise<any> =>
  new Promise((resolve, reject) => {
    return request({
      url: `${BaseUrl}/DocumentType/GetDocumentTreeTreeDataAsync`,
      data: {},
      method: 'POST',
    }).then((response: any) => {
      resolve(response);
    }).catch((error: any) => {
      reject(error);
    });
  });