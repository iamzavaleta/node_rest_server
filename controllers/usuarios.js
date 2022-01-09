
const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = async(req = request, res = response)=>{

    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true}

    //  const usuarios = await Usuario.find(query)
    //      .skip(Number(desde))
    //      .limit(Number(limite));

    //  const total = await Usuario.countDocuments(query);

     const [total, usuarios] = await Promise.all([
         Usuario.countDocuments(query),
         Usuario.find(query)
             .skip(Number(desde))
             .limit(Number(limite))
     ])

    res.json({
        total,
        usuarios
    })
}

const usuariosPost = async(req, res = response)=>{

    
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //Verificar si el correo existe
    // const existeEmail = await Usuario.findOne({correo})
    // if(existeEmail) {
    //     return res.status(400).json({
    //         msg: 'Ese correo no se encuentra disponible'
    //     })
    // }
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async(req, res = response)=>{

    const { id } = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    if(password){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    
    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        ok: true,
        msg: 'Put API controller',
        usuario
    });
}

const usuariosDelete = async(req, res = response)=>{

    const {id} = req.params;

    //Eliminar fisicamente
    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});

    const usuarioAutenticado = req.usuario;

    res.json({
        usuario,
        usuarioAutenticado
    });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosDelete,
    usuariosPut
}

