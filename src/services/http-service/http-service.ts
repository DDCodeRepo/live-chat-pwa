import { Logger } from './logger-service';
import { AxiosUtils } from './axios-utils';

export class HttpService extends AxiosUtils{
    static httpService: HttpService;
    loginUser: any;

    private constructor() {
        super();
    }

    static getInstance(): HttpService {
        if (!HttpService.httpService)
            HttpService.httpService = new HttpService();
        return HttpService.httpService;
    }


    get = (api: string, params?: any) => {
        console.log("<--<--GET-->-->");
        let ax = this.getAxios(api,params);

        ax.interceptors.request.use((config: any) => {
            Logger.log("axios request");
            Logger.log(config);
            return config;
        })
        Logger.log(ax.request);

        return ax.get(api);
    }
    
    post = (api: string, payload: any, params?: any) => {
        let ax = this.getAxios(api);

        ax.interceptors.request.use((config: any) => {
            Logger.log("axios request");
            Logger.log(config);
            return config;
        })
        Logger.log(ax.request);
        return ax.post(api, payload);
    }

    put = (api: string, payload: any, params?: any,headers?:any) => {
        let ax = this.getAxios(api,(params && params.isImageUpload));

        ax.interceptors.request.use((config: any) => {
            Logger.log("axios request");
            Logger.log(config);
            return config;
        })
        Logger.log(ax.request);
        return ax.put(api, payload);
    }

    delete = (api: string) => {
        let ax = this.getAxios(api);

        ax.interceptors.request.use((config: any) => {
            Logger.log("axios request");
            Logger.log(config);
            return config;
        })
        Logger.log(ax.request);
        return ax.delete(api);
    }
}

export {}