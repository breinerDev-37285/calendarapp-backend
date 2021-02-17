import { Router } from 'express';
import { createUser,getLogin, renewToken  } from '@services/auth';
import { userVal,loginVal } from '@middlewares/validations/user.val';
import validationResult from '@middlewares/validations/isValid';
import { validarToken } from '@middlewares/jwt';

const router:Router = Router();
const path = '/auth';

router.route(`${path}/user`)
    .post([...userVal(),validationResult], createUser );

router.route(`${path}/login`)
    .post( [...loginVal(),validationResult], getLogin );


router.route(`${path}/token`)
    .get( validarToken,renewToken );


export default router;