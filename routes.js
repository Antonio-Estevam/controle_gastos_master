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

let idUsuLogado;

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
                idUsuLogado = results[0].id_user;            
                
                
                res.redirect("/cadtela"); 

            }       
            
            }else{
                res.send("erro a senha não corresponde ");
            }
    });
});

routes.get("/novaconta",(req,res) =>{
    res.render('novaconta');
});


routes.get("/cadtela",(req,res)=>{
    sql.query("use controle_gastos");
    sql.query("SELECT * FROM contas INNER JOIN user ON contas.id_user = user.id_user WHERE user.id_user= ?",idUsuLogado,(err,results,fields)=>{
        
        res.render('cadtela',{data: results});

     }); 
});

routes.get("/deletar/:id",(req,res)=>{
    //res.send(req.param.id_user);
    
    sql.query("DELETE FROM controle_gastos.contas  WHERE id_conta=?",[req.params.id]);
    res.redirect("/cadtela");
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

    routes.post("/inserirconta",urlencodeParser,(req,res)=>{
        sql.query("INSERT INTO controle_gastos.contas (nome,data_compra,data_vencimento,descricao,valor,id_user,status) VALUES (?,?,?,?,?,?,?)",
        [
            req.body.nome,
            req.body.data_compra,
            req.body.data_vencimento,
            req.body.descricao,
            req.body.valor,
            req.body.id_user,
            req.body.status        
        ]
        );
        res.redirect("/cadtela");
        
    });    
    
    routes.post("/alterarconta",urlencodeParser,(req,res)=>{
        sql.query("UPDATE controle_gastos.contas SET nome = ?, data_compra = ?,data_vencimento=?, descricao = ?, valor = ?,  status = ? WHERE (id_conta =?) and (id_user =?)",
        [
            req.body.nome,
            req.body.data_compra,
            req.body.data_vencimento,
            req.body.descricao,
            req.body.valor,
            req.body.status,
            req.body.id_conta,
            idUsuLogado

        ]
        );
        

        res.redirect("/cadtela");

    });
    routes.get("/alterarconta-tela/:id",(req,res)=>{
        console.log(req.params.id);
        

        sql.query("select * from contas where  id_conta=?",req.params.id,(err,results,fields)=>{
        
            res.render('alterar',{data: results});
            console.log(results);
            
    
         });        
    });
    

    //cadastrar contas 
    
module.exports = routes;