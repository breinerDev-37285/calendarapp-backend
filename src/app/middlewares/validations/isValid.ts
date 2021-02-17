import { validationResult,check, Meta } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { userTypes,eventTypes } from '@typesSrc/index';
import isDate from '@helpers/isDate';
import { dateNow } from '@config/logger';


export const emailVal = () => {
    const { field,msg } = userTypes.email;
    return check( field,msg )
        .isEmail()
        .not().isEmpty()
        .normalizeEmail()
}

export const passwordVal = () => {
    const { field,msg } = userTypes.password;
    return check(field,msg)
        .not().isEmpty()
        .isString()
        .trim()
        .escape()
}

export const usernameVal = () => {
    const { field,msg } = userTypes.username;
    return check(field,msg)
        .not().isEmpty()
        .isString()
        .trim()
        .escape()
}

export const titleVal = () => {
    const { field,msg } = eventTypes.title;
    return check( field,msg )
        .not().isEmpty()
        .isString()
        .trim()
}

export const start = () => {
    const { field,msg } = eventTypes.start;
    return date(field,msg)
}


export const end = () => {
    const { field,msg } = eventTypes.end;
    return date( field,msg );
}


const date = ( field:string, msg: string ) =>  check( field,msg )
    .not().isEmpty()
    .custom( isDate )

    
export default ( req:Request, res:Response,next:NextFunction ) => {
    const val = validationResult(req);

    if( !val.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            err: val.mapped()
        })
    }else{
        return next();
    }
};