import { sign } from 'jsonwebtoken';
import { log } from '@config/logger';
import i_jwt from '@interfaces/jwt';

export const generarToken = ( {uid,username}:i_jwt ) => {
    
    const { SECRET_JWT_SEED } = process.env;
    const payload = { uid,  username }

    log.info('generando token')

    return sign(payload,String(SECRET_JWT_SEED),{
        expiresIn: '2h'
    })
}
