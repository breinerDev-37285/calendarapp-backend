import { Request, Response } from 'express';
import { token,format,Options } from 'morgan';
import { dateNow,log } from '@config/logger';
import { join } from 'path';
import { createWriteStream } from 'fs';


export default class morganConfig {

    private static instace:morganConfig;

    private constructor(){
        this.init();
    }

    public static init(){
        if( !morganConfig.instace ) {
            this.instace = new morganConfig();
        }
        return this.instace;
    }

    private init(){
        this.tokens();
        this.formats();
    }

    private tokens() {
        token('date', () => dateNow.format('dddd, DD/MM/YYYY, HH:mm:ss '))

        token('service', (req:Request, res:Response) => res.get('X-Service'))
    }

    private formats() {
       
        log.info('ajustando formato para logs')
        const formato = ':remote-addr - [:date] ":method :url - :service HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent';
        return format('personalizado', formato);
    }

    private stream(typeLog:string) {
        return createWriteStream(
            join(__dirname,`../logs/${typeLog}`), 
            { flags: 'a' }
        )
    }

    public accesLog():Options<Request,Response>{
        log.info('generando archivo access.log')
        return {
            skip: ( req:Request, { statusCode }:Response ) => !(statusCode >= 200 && statusCode < 300),
            stream: this.stream('access.log')
        }
    } 

    public errorLog():Options<Request,Response>{
        log.info('generando archivo error.log')
        return {
            skip: ( req:Request, { statusCode }:Response ) => (statusCode >= 200 && statusCode < 300),
            stream: this.stream('error.log')
        }
    } 
        
}