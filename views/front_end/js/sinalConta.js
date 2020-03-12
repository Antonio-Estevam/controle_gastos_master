
function iniciarModal(modalID){
    const modal = document.getElementById(modalID);
    modal.classList.add('mostrar');
    console.log(modal);    
}


const  contaLinha = document.querySelectorAll('#contaLinha');

    function mudarCorConta(){
        for (let i = 0; i < contaLinha.length; i++ ){
             let status = document.querySelector('#status').value; 

            if(String(status) === "paga"){
                contaLinha[i].classList.add("ContaPaga");

            }
            else if(String(status) === "vencida"){
                contaLinha[i].classList.add("ContaVencida");

            }else{

            }        
     } 
    }

    if(contaLinha != null){
        mudarCorConta();
    }else{}