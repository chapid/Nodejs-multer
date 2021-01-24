const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');



const storage = multer.diskStorage({
    destination:path.join(__dirname,'public/uploads'),
    filename: (req,file,cb)=>{
        cb(null,uuidv4()+path.extname(file.originalname));
    }
});
//npm install express ejs multer

//Inicializaciones
const app = express();

//settings
app.set('port',3000);
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs');

//midleware
app.use(multer({
    storage,
    dest:path.join(__dirname,'public/uploads'),
    limits: {fileSize: 1000000},
    fileFilter:(req,file,cb)=>{
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if(mimetype && extname){
            return cb(null,true);
        }
        cb("Error el archivo debe ser una imagen valida");
    }
}).single('imagen'));

//rutas
app.use(require('./routes/index.routes'));

//static files
app.use(express.static(path.join(__dirname,'public')));

//Iniciar el servidor
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
});