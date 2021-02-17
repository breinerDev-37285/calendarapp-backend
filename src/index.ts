import '@config/index';
import { log } from '@config/logger';
import Database from '@database/index';

const database = Database.init();


database.Connect()
    .then(() => log.info('conexion a la base de datos establecida'))
    .then(() => import('./app/app'))
    .catch(log.error)