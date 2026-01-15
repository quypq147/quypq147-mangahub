const {Request, Response} = require('express');

exports.getMangaList = function(req, res) {
    try{
        
    }catch(err){
        res.status(500).send({error: 'Internal Server Error'});
    }
}