import { createLogger,transports,format } from 'winston';
import { resolve } from 'path';
import moment from 'moment';
import 'moment/locale/es';


moment.locale('es');
export const dateNow = moment(new Date())
const { Console,File } = transports;
const { combine,printf,colorize } = format;

export const log = createLogger({
    level: 'debug',
    transports: [
        new Console({
            format: combine(
                colorize({
                    level: true
                }),
                printf(info => `[${info.level}]: ${info.message} -- ${dateNow.format('dddd, DD/MM/YYYY, HH:mm:ss ')}`)
            )
        }),
        new File({
            filename: resolve(__dirname, '../logs/debugger.log'),
            format: printf(info => `[${info.level}]: ${info.message} -- ${dateNow.format('dddd, DD/MM/YYYY, HH:mm:ss ')}`)        
        })
    ]
})