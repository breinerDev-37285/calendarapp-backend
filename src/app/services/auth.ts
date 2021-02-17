import { Request, Response } from 'express';
import User from '@database/models/user';
import { log } from '@config/logger';
import { generarToken } from '@helpers/jwt';
import { i_login } from '@interfaces/user.interface';
import i_jwt from '@interfaces/jwt';
import { compareSync } from 'bcryptjs';


export const createUser = ( req:Request, res:Response ) => {
    res.header('X-Service','createUser');

    const user = new User( req.body );

    return user.save((err:any,data) => {
        if(err) return res.status(500).json({
            ok: false,
            err: err.message
        })
        
        const token = generarToken({uid: user.id, username: user.username});

        return res.status(201).json({
            ok: true,
            token
        })
    });
}


export const getLogin = async ( req:Request, res:Response ) => {
    res.header('X-Service','login');
    try {
        const { email,password }:i_login = req.body;
        const user = await User.findOne({email}, 'password');

        if( !user ) return res.status(404).json({
            ok: false,
            msg: 'Usuario no existe'
        });

        if( !compareSync(password, user.password) ) return res.status(400).json({
            ok: false,
            msg: 'Credenciales invalidas'
        });

        const token = generarToken({uid: user.id, username: user.username});

        res.status(201).json({
            ok: true,
            token
        })
        
    } catch (error) {
        log.error(error);
        return res.status(500).json({
            ok: false, 
            msg: 'Por favor contacte a un administrador'
        })
    }
}


export const renewToken = ( req:Request, res:Response ) => {
    res.header('X-Service','renewToken');
    const payload:i_jwt = req.body.tokenPayload;
    const token = generarToken(payload);

    return res.json({
        ok: true,
        token
    })
}