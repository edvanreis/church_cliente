//import './dist/index.html'
//importar express
const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080

app.use(express.static(__dirname+'/dist/'));

app.get('/*',(req,res)=>{
    res.sendFile(__dirname+'/dist/index.xhtml');
});

app.listen(PORT , ()=>{
    console.log('Iniciando na porta '+PORT)
})





