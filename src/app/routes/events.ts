import { Router } from 'express';
import { createEvent, deleteEvent, getEvents, updateEvent } from '@services/event';
import { validarToken } from '@middlewares/jwt';
import { eventVal } from '@middlewares/validations/events';
import validationResult from '@middlewares/validations/isValid';
const router:Router = Router();
const path = '/events';

router.use( validarToken );

router.route(`${path}`)
    .post( [...eventVal(),validationResult], createEvent )
    .get( getEvents )

router.route(`${path}/:id`)
    .put( [...eventVal(),validationResult],updateEvent )
    .delete( deleteEvent )

export default router;