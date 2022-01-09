
const { response, request } = require('express');
const jwt = require('jsonwebtoken');
// const { findById } = require('../models/usuario');

const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg : 'Se solicita de un token para la eliminacion'
        })
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById(uid);

        if( !usuario){
            return res.status(401).json({
                msg : 'Token no valido - Usuario no existe en la BD'
            })
        }

        if( !usuario.estado){
            return res.status(401).json({
                msg : 'Token no valido - Usuario estado : false '
            })
        }


        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg : 'El token no es válido'
        })
    }

}


module.exports = {
    validarJWT
}