declare namespace NodeJS {
    export interface ProcessEnv {
        NODE_ENV: string;
        APP_NAME: string;
        PORT:string;
        DB_USER:string;
        DB_PASSWORD:string;
        DB_NAME:string;
        DB_PORT:number;
        DB_URL:string;
        SECRET_JWT_SEED:string;
    }
}