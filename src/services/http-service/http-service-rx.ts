/* import { BehaviorSubject } from 'rxjs';
import * as Rx from 'rxjs';
import { Logger } from './logger-service';
import axios from "axios";
import { Apis } from './apis';

export class HttpService {
    authBehaviour = new BehaviorSubject<any>(null);
    authAccessTokenBehaviour = new BehaviorSubject<any>(null);

    static httpService: HttpService;
    loginUser: any;

    private constructor() { }

    static getInstance(): HttpService {
        if (!HttpService.httpService)
            HttpService.httpService = new HttpService();
        return HttpService.httpService;
    }

    getHostUrl=(api:string)=>{
        return Apis.getAPIConfig().hostUrls+Apis.getAPIConfig().PATH;
    }

    getAxios = (api: string,isImageUpload?:boolean, params?:any) => {
        let axiosInstance = axios.create({
             baseURL: this.getHostUrl(api),
            timeout: 60000,
            headers: this.getHeaders(api,isImageUpload, params)
        });


        axiosInstance.interceptors.response.use(
            (response) => {
                Logger.log(`====axios response =======> ${response.data}`);
                // Return a successful response back to the calling service
                return response;
            }, (error) => {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        );


        return axiosInstance;
    }

    getHeaders = (api: string, isImageUpload?:boolean, apiparam?:any) => {
            let idToken = this.authBehaviour.getValue()?this.authBehaviour.getValue().idToken:'';
            let accessToken = this.authBehaviour.getValue()?this.authBehaviour.getValue().accessToken:'';
            let param: any = {};
            let extraparams = apiparam?apiparam:{};
            let imageUploadParam=isImageUpload?{"Content-Type": "multipart/form-data"}:{};
            Object.assign(param, {
                headerParam: {
                    ...extraparams,
                   ...imageUploadParam,
                   "Authorization":accessToken,
                   "IDToken":idToken
                }
            });
            Logger.log("Header", param.headerParam, true);
            return param.headerParam;
        
    }


    get = (api: string, params?: any) => {
        let ax = this.getAxios(api,undefined,params);

        ax.interceptors.request.use((config: any) => {
            Logger.log("axios reques");
            Logger.log(config);
            return config;
        })
        Logger.log(ax.request);

        return ax.get(api);
    }
    
    handleErrors(response: any, isImage?: boolean) {
        Logger.log("handleErrors");
        if (!response.ok) {
            Logger.log("handleErrors ok");
            Logger.log(response);
            throw response;
        } else {
            Logger.log("handleErrors response");
            Logger.log(response);
            if (isImage)
                return response;
            else
                return response.json()
        }
    }
    post = (api: string, payload: any, params?: any) => {
        let ax = this.getAxios(api);

        ax.interceptors.request.use((config: any) => {
            Logger.log("axios reques");
            Logger.log(config);
            return config;
        })
        Logger.log(ax.request);
        return ax.post(api, payload);
    }

    put = (api: string, payload: any, params?: any,headers?:any) => {
        let ax = this.getAxios(api,(params && params.isImageUpload));

        ax.interceptors.request.use((config: any) => {
            Logger.log("axios reques");
            Logger.log(config);
            return config;
        })
        Logger.log(ax.request);
        return ax.put(api, payload);
    }
    putImage = (api: string, payload: any, params?: any,headers?:any) => {
        let ax = this.getAxios(api,(params && params.isImageUpload));

        ax.interceptors.request.use((config: any) => {
            Logger.log("axios reques");
            Logger.log(config);
            return config;
        })
        Logger.log(ax.request);
        return ax.put(api, payload);
    }

    putImageFetch = (api: string, file: any, payload: any) => {
        const result = Rx.Observable.create(
            async (observable: Rx.Subscriber<any>) => {
                //NetInfo.fetch().then(async state => {
                    //Logger.log('Connection type', state.type);
                    //Logger.log('Is connected?', state.isConnected);
                    //if (!state.isConnected) {
                      //  observable.error(this.getNetworkError());
                    //} else {
                        //const response = await fetch(payload.uri);
                        //console.log("putImageFetch response ", response)
                        //const blob = await response.blob();
                        //console.log("putImageFetch blob ", payload)
                        fetch(api, {
                            method: 'PUT',
                            body: file,
                            headers: {
                                'Content-Type': 'image/jpeg',
                            },
                        }).then(response => {
                                console.log("putImageFetch response -> "+ JSON.stringify(response))
                                return this.handleErrors(response, true);
                            })
                            .then(resp => {
                                console.log("putImageFetch resp -> "+ JSON.stringify(resp))
                                observable.next({data: resp});
                                observable.complete();
                            })
                            .catch(err => {
                                Logger.log(err);
                                console.log("putImageFetch err -> "+ err)
                                return observable.error(err);
                            });
                    //}
                //});
            },
        );
        return result;
    };


    delete = (api: string) => {
        let ax = this.getAxios(api);

        ax.interceptors.request.use((config: any) => {
            Logger.log("axios reques");
            Logger.log(config);
            return config;
        })
        Logger.log(ax.request);
        return ax.delete(api);
    }


    uploadImageToS3 = (url: string, file: any, params?: any) => {
        //file={uri,type}
        var result = Rx.Observable.create((observable: Rx.Subscriber<any>) => {

            const xhr = new XMLHttpRequest();
            xhr.open('PUT', url);
            xhr.setRequestHeader('Content-Type', file.type);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200) {
                        Logger.log(`Request failed. Status: ${xhr.status}. Content: ${xhr.responseText}`);
                        observable.error({ message: `Request failed. Status: ${xhr.status}. Content: ${xhr.responseText}` })
                    } else {
                        observable.next({ message: xhr.responseText })
                    }
                }
            }
            xhr.send(file);


        });

        return result;
    }


    fetch(api:string, isFullPath?:boolean){
        let headers = {
           
        }
        return fetch(isFullPath?api: Apis.getAPIConfig().hostUrls+Apis.getAPIConfig().PATH+api,{headers});
       
    }
    isOnline=()=>{
        //if(!navigator.onLine)
           // UserService.errorAlertSubject.next({code:"NetworkError",message:"Please check your internet connection and try again", title:"Network Error",visibility:true})
        return navigator.onLine;
    }
}
*/
export {}