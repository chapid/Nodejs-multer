const express = require('express');
const {Router} = require('express');

const router = Router();

router.get('/',(req,res)=>{
    res.render('index');
});

router.post('/upload',(req,res)=>{
    console.log(req.file);
    try {
        console.log('La imagen es muy pesada');
    } catch (error) {
        console.log(error);
    }
    res.send('subida');
});

module.exports = router;