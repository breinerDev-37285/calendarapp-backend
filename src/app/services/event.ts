import { Request, Response } from 'express';
import Event from '@database/models/events';
import { i_events } from '@interfaces/events.interface';

export const createEvent = ( req:Request,res:Response ) => {
    res.header('X-Service','createEvent');

    const event = new Event(req.body);

    return event.save((err) => {
        if(err) return res.status(500).json({
            ok: false,
            err: err.message
        });

        return res.status(201).json({ ok: true })
    });

}


export const getEvents = ( req:Request,res:Response ) => {
    res.header('X-Service','getEvents');

    const event = Event.find()

    event.exec((err,events) => {

        if(err) return res.status(500).json({
            ok: false,
            msg: err.message
        });

        if( !events ) return res.status(404).json({
            ok: false,
            msg: 'No existen eventos'
        })

        return res.json({
            ok: true,
            events
        })
    })

}


export const updateEvent = ( req:Request,res:Response ) => {
    res.header('X-Service','updateEvent');
    const id = req.params.id 

    return Event.findById( id )
        .exec(async (err,event) => {

            if(err) return res.status(500).json({
                ok: false,
                msg: err.message
            });
    
            if( !event ) return res.status(404).json({
                ok: false,
                msg: 'No existe el evento'
            });

            if( event.user != req.body.user ) return res.status(403).json({
                ok: false,
                msg: 'No cuentas con permisos para modificar este evento'
            });

            const { title,start,end,notes }:i_events = req.body;
            event.title = title;
            event.start = start;
            event.end = end;
            event.notes = notes;

            await event.save();
        
            return res.json({
                ok: true,
                event
            })
        })
}


export const deleteEvent = ( req:Request,res:Response ) => {
    res.header('X-Service','deleteEvent');
    const id = req.params.id

    return Event.findById( id )
        .exec(async (err,event) => {

            if(err) return res.status(500).json({
                ok: false,
                msg: err.message
            });
    
            if( !event ) return res.status(404).json({
                ok: false,
                msg: 'No existe el evento'
            });

            if( event.user != req.body.user ) return res.status(403).json({
                ok: false,
                msg: 'No cuentas con permisos para eliminar este evento'
            });

            await event.delete();
        
            return res.json({ ok: true })
        })
}