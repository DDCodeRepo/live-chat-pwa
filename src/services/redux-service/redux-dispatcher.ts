import { entry } from "src/types/entry";
import { Logger } from "../http-service/logger-service";

export class ReduxDispatcher{

    static instance:ReduxDispatcher;
    
    dispatcher:Function | undefined;

    private constructor(){

    }

    static getInstance(){
        if(!this.instance)
        this.instance=new ReduxDispatcher();
        return this.instance;
    }

    setDispatcher(dispatch:Function){
        this.dispatcher=dispatch;
    }

    dispatch(action : { payload: entry[]; type: string; }){
        Logger.log("dispatch()",this.dispatcher);
        if(this.dispatcher){
            this.dispatcher(action);
        }
    }
}