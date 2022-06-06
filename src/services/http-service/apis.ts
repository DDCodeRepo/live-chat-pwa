export interface APIConfig{
    hostUrls:string;
    PATH:string;
}

const APIConfigDEV:APIConfig={
    hostUrls:"",
    PATH:"dev/"
}

const APIConfigPROD:APIConfig={
    hostUrls:"",
    PATH:"prod/"
}
var Environment='dev';// possible values are dev, prod

export class Apis{
    
    static getAPIConfig():APIConfig{
        if(Environment == 'dev')
        return APIConfigDEV;
        if(Environment == 'prod')
        return APIConfigPROD;
        else
        return APIConfigDEV;
    }

}