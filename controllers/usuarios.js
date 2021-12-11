
const {response, request} = require('express')

const usuariosGet = (req = request, res = response)=>{

    const {serie, opening = "fiesta", rating} = req.query

    res.json({
        ok: true,
        msg:'getApi_controller',
        serie,
        opening,
        rating
    })
}

const usuariosPost = (req, res = response)=>{

    const {nombre, apellido, edad} = req.body;

    res.json({
        ok: true,
        msg: 'Post API controller',
        nombre,
        apellido,
        edad
    });
}

const usuariosPut = (req, res = response)=>{

    const id = req.params.id;

    res.json({
        ok: true,
        msg: 'Put API controller',
        id
    });
}

const usuariosDelete = (req, res = response)=>{
    res.json({
        ok: true,
        msg: 'Delete API controller'
    });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosDelete,
    usuariosPut
}

