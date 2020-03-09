const express= require('express');
const bodyParser= require('body-parser');
const mysql= require('mysql');
const handlebars= require('express-handlebars');
const routes = require('./routes');

const app = express();

 //liberando diretorio img para usar os arquivos  
 //app.use('/views/img',express.static('img'));
 app.use('/css', express.static(__dirname +'/views/front_end/css'));
 app.use('/img', express.static(__dirname +'/views/front_end/img'));
 //app.use('/js',express.static('js'));

const PORT = 3000;

//app.use(express.json()); 
app.use(routes);
//app.use(routes);

app.engine("handlebars",handlebars({defaultLayout: 'main'}));
app.set('view engine','handlebars');

app.listen(PORT,(req,res)=>{
    console.log(`Servidor rodando: http://localhost:${PORT}/`);    
});//porta que sera acessada o servidor 