import Server from '@server/mainserver';
import { log } from '@config/logger';

const { PORT,APP_NAME,NODE_ENV } = process.env;
const server = Server.init( Number(PORT), String(APP_NAME) )

server.listening(() => log.info(`Escuchando app ${  server.AppName } en el puerto ${ server.Port } en modo '${NODE_ENV}'`))