import express, { Application,json,NextFunction,Request,Response,urlencoded } from 'express';
import morgan, { Morgan } from 'morgan';
import helmet from 'helmet';
import { log } from '@config/logger';
import MorganConfig from '@helpers/morganFormats';


export default abstract class Server<T,F> {

    protected app:Application;
    protected port:number;
    protected appName:string;
    private morganConfig:MorganConfig;

    constructor( port:number,name:string ) {
        this.app = express();
        this.port = port;
        this.appName = name;
        this.morganConfig = MorganConfig.init();
        this.onInit();
    }

    private onInit() {
        this.Parser();
        this.Helmet();
        this.log_register();
    }

    private Parser(){
        this.app.use( json() );
        this.app.use( urlencoded({
            extended:true
        }))
        log.warn('agregando modulos de parseo de informacion...')
    }

    private log_register() {
        this.app.use( morgan('personalizado', this.morganConfig.accesLog()))
        this.app.use( morgan('personalizado',this.morganConfig.errorLog()))
    }

    private Helmet(){
        this.app.use(helmet())
    }


    get App(){
        return this.app;
    }

    get Port(){
        return this.port;
    }

    get AppName() {
        return this.appName;
    }

    abstract listening(callback:F):T;

}