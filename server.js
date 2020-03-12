const express= require('express');
const bodyParser= require('body-parser');
const mysql= require('mysql');
const handlebars= require('express-handlebars');
const routes = require('./routes');
const moment =  require('moment');

const app = express();


 app.use('/css', express.static(__dirname +'/views/front_end/css'));
 app.use('/img', express.static(__dirname +'/views/front_end/img'));
 app.use('/js', express.static(__dirname +'/views/front_end/js'));

const PORT = 3000;

app.use(routes);

app.engine("handlebars",handlebars({defaultLayout: 'main', helpers:{brasil:(data) =>{
    return moment(data).locale('pt-br').format('l')
}}}));
app.set('view engine','handlebars');

app.listen(PORT,(req,res)=>{
    console.log(`Servidor rodando: http://localhost:${PORT}/`);    
});//porta que sera acessada o servidor 