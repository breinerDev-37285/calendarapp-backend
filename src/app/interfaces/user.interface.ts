import { Document } from 'mongoose';

export interface i_user {
    email: string;
    password: string;
    username: string;
}

export interface i_user_model extends Document, i_user { }


export interface i_user_types<T> {
    email: T,
    password: T,
    username: T 
}

export interface i_login {
    email: string;
    password: string;
}