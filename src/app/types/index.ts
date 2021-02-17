import { i_events_types } from '@interfaces/events.interface';
import { i_user_types } from '@interfaces/user.interface';
import i_types from '@interfaces/types';

export const userTypes:i_user_types<i_types> = {
    email: {
        field: 'email',
        msg: 'El email es necesario'
    },
    password: {
        field: 'password',
        msg: 'El password es necesario'
    },
    username: {
        field: 'username',
        msg: 'El nombre de usuario es obligatorio'
    }
}

export const eventTypes:i_events_types<i_types> = {
    title: {
        field: 'title',
        msg: 'El titulo es necesario'
    },
    start: {
        field: 'start',
        msg: 'La fecha de inicio es obligatoria'
    },
    end: {
        field: 'end',
        msg: 'La fecha de finalizacion es obligatoria'
    }
}