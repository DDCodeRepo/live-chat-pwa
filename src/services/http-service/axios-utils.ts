import { Logger } from "./logger-service";
import axios from "axios";
import { Apis } from "./apis";

export class AxiosUtils {
  protected getHostUrl = (api: string) => {
    return Apis.getAPIConfig().hostUrls + Apis.getAPIConfig().PATH;
  };

  protected getAxios = (api: string, params?: any) => {
    let axiosInstance = axios.create({
      baseURL: this.getHostUrl(api),
      timeout: 60000,
      //headers: this.getHeaders(api, params),
    });

    axiosInstance.interceptors.response.use(
      (response) => {
        Logger.log(`====axios response =======> ${response.data}`);
        // Return a successful response back to the calling service
        return response;
      },
      (error) => {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    );

    return axiosInstance;
  };

  protected getHeaders = (
    api: string,
    apiparam?: any
  ) => {
    let idToken = "ID TOKEN";
    let accessToken = "ACCESS TOKEN";
    let param: any = {};
    let extraparams = apiparam ? apiparam : {};
    Object.assign(param, {
      headerParam: {
        ...extraparams,
        Authorization: accessToken,
        IDToken: idToken,
      },
    });
    Logger.log("Header", param.headerParam, true);
    return param.headerParam;
  };

  fetch(api: string, isFullPath?: boolean) {
    let headers = {};
    return fetch(
      isFullPath
        ? api
        : Apis.getAPIConfig().hostUrls + Apis.getAPIConfig().PATH + api,
      { headers }
    );
  }

  isOnline = () => {
    //if(!navigator.onLine)
    // UserService.errorAlertSubject.next({code:"NetworkError",message:"Please check your internet connection and try again", title:"Network Error",visibility:true})
    return navigator.onLine;
  };
}
