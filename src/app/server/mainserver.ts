import Server from '@server/index';
import endPoint from '@routes/index';
import { log } from '@config/logger';

export default class ServerMain extends Server<void,Function> {

    private static instance: ServerMain;

    private constructor( port:number,name:string ){
        super( port,name )
        this.init();
    }

    private init(){
        this.app.use('/api/v1/',endPoint);
        log.warn('cargando rutas de auth...')
    }

    public static init( port:number,name:string ){
        if( !ServerMain.instance ){
            this.instance =  new ServerMain( port,name );
            log.info('inicializando servidor...');
        }else{
            log.warn('Servidor ya ha sido inicializado');
        }
        return this.instance;
    }

    public listening(callback: Function): void {
        this.app.listen( this.port,callback() );
    }

}