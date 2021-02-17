import { connect,disconnect } from 'mongoose';
import { config } from '@config/database';

export default class Database {

    private static instance:Database;
    private url:string;

    private constructor(){
        const { DB_URL } = process.env;

        this.url = String( DB_URL );
    }

    public static init() {
        if( !Database.instance ) {
            this.instance = new Database();
        }
        return this.instance;
    }

    public Connect(){
        return connect(this.url,config)
    }

    public Disconnect(){
        return disconnect()
    }
}