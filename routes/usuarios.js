
const { Router } = require("express");
const {check} = require("express-validator");

const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosDelete } = require("../controllers/usuarios");
        
const { validarCampos } = require("../middleware/validar-campos");
const { esRoleValido, emailExiste, existeUsusarioPorId} = require("../helpers/db-validators");

const router = Router();

router.get('/', usuariosGet);

router.post('/',[
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña debe tener mas de 6 caracteres').isLength({min: 6}),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom(emailExiste),
        // check('rol', 'El rol no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom(esRoleValido),
        validarCampos
] ,usuariosPost);

router.put('/:id', [
        check('id','No es un mongo ID válido').isMongoId(),
        check('id').custom(existeUsusarioPorId),
        validarCampos
],usuariosPut);

router.delete('/:id',[
        check('id','No es un mongo ID válido').isMongoId(),
        check('id').custom(existeUsusarioPorId),
        validarCampos
] ,usuariosDelete);



module.exports = router;