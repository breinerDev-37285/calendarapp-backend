import { Document } from 'mongoose';
import i_user from '@interfaces/jwt';

export interface i_events {
    title: string;
    end: Date,
    start: Date,
    notes: string;
    user: i_user
}


export interface i_events_model extends Document, i_events {  }


export interface i_events_types<T> {
    title: T;
    end:T;
    start:T;
    notes?:T;
}