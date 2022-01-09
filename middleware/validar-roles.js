const { response, request } = require("express");
const usuario = require("../models/usuario");

const esAdminRole = (req, res = response, next)=>{

    if( !req.usuario){
        return res.status(500).json({
            msg : 'Se quiere validar el role sin validar el token primero'
        })
    }

    const {nombre, rol} = req.usuario;

    if( rol !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg : `${nombre} no es administrador`
        })
    }

    next();
}

const tieneRole = (...roles)=>{
    return (req, res = response, next)=>{

        if( !req.usuario){
            return res.status(500).json({
                msg : 'Se quiere validar el role sin validar el token primero'
            })
        }
    
        const {rol} = req.usuario;

        if (!roles.includes(rol)){
            return res.status(401).json({
                msg : `Se requiere de los siguientes roles ${roles}`
            })
        }


        next();
    }
}


module.exports = {
    esAdminRole,
    tieneRole
}