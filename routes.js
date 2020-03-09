const { Router } = require('express');
const bodyParser= require('body-parser');
const mysql= require('mysql');

 //configurando body parser
 const urlencodeParser = bodyParser.urlencoded({extended: false});

const sql = mysql.createConnection({ 
    host:'localhost',
    user:'root',
    password:'',
    port:3306,
});

const routes = Router();

routes.get("/",(req,res)=>{
    res.render('index');
    
});
routes.post("/logar",urlencodeParser,(req,res)=>{
   let conta ={ 
    email:req.body.email,
    password:req.body.password
   }
   sql.query("use controle_gastos");
   sql.query("select * from user  where email=?",
   conta.email,(err,results,fields)=>{ 
       
    if(String(conta.password) === String(results[0].password)){
            if(String(results[0].user_type) === "user")
            {
                res.send("bem vindo ususário comum");
            }
            else if(String(results[0].user_type) === "admin")
            {
                res.send("bem vindo Admin");
            }
            else if(String(results[0].user_type) === "master")
            {
                res.redirect("/cadtela");
            }       
            
            }else{
                res.send("erro a senha não corresponde ");
            }
    });
});

routes.get("/cadtela",(req,res)=>{
    res.render('cadtela');
});

    //cadastro de Usuarios 
routes.post("/cadastrar",urlencodeParser,(req,res)=>{
    if(req.body.user_type == "") {
        res.send('Você esquceu de selecionar o tipo de Usuários');
    } else{
        sql.query("use controle_gastos");
        sql.query("insert into user values (?,?,?,?,?,?)",[        
            null,
            req.body.name,
            req.body.lastName,
            req.body.email,
            req.body.senha,
            req.body.user_type
            ]);
    
            res.render('cadOk',{name:req.body.name});
        }
    });

    //cadastrar contas 
    
module.exports = routes;