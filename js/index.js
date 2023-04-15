/* 1° PRECISAMOS CAPTURAR OS ELEMENTOS HTML PELO ID OU PELA CLASS */
let inputNovaTarefa = document.querySelector('#inputNovaTarefa');
let btnAddTarefa = document.querySelector('#btnAddTarefa');
let listaTarefas = document.querySelector('#listaTarefas'); 
let janelaEdicao = document.querySelector('#janelaEdicao');
let janelaEdicaoFundo = document.querySelector('#janelaEdicaoFundo');
let janelaEdicaoBtnFechar = document.querySelector('#janelaEdicaoBtnFechar');
let btnAtualizarTarefa = document.querySelector('#btnAtualizarTarefa');
let idTarefaEdicao = document.querySelector('#idTarefaEdicao');
let inputTarefaNomeEdicao = document.querySelector('#inputTarefaNomeEdicao');

/* 2° AGORA PRECISAMOS ADICIONAR UM EVENTO NO ELEMENTO SELECIONADO, O EVENTO GERADO SERÁ CHAMADO DE (e) */
inputNovaTarefa.addEventListener('keypress' , (e) => {
    /* AQUI VAMOS VERIFICAR SE A TECLA PRESSIONADA SERÁ O 13, KEYCODE DA (TECLA ENTER) */
    if(e.keyCode == 13){
    
        /* AQUI VAMOS ADICIONAR UMA NOVA TAREFA, OBSERVE QUE CRIAMOS UM OBJETO CHAMADO
           TARAFA E NELE TEMOS DOIS ATRIBUTOS, NOME E ID */
        let tarefa = {
            nome: inputNovaTarefa.value,
            id: gerarId() ,
        }
        //TODO: ADICIONAR A TAREFA NO HTML
        adicionarTarefa(tarefa);
    }
});

btnAtualizarTarefa.addEventListener('click', (e) => {
    e.preventDefault();
    let idTarefa = idTarefaEdicao.innerHTML.replace('#', '');
    let tarefa = {
        nome: inputTarefaNomeEdicao.value,
        id: idTarefa
    }

    let tarefaAtual = document.getElementById(''+idTarefa+'');
    console.log(tarefaAtual)


    if(tarefaAtual) {
        let li = criarTagLi(tarefa);
        listaTarefas.replaceChild(li, tarefaAtual);
        alternarJanelaEdicao();
    } else {
        alert('Elemento HTML não encontrado!');
    } 
});


janelaEdicaoBtnFechar.addEventListener('click', (e) =>{
    alternarJanelaEdicao();
});


btnAddTarefa.addEventListener('click', (e) => {
    /* AQUI QUE VAMOS CRIAR O OBJETO DA TAREFA */
    let tarefa = {
        nome: inputNovaTarefa.value,
        id: gerarId() ,
    }
      //TO DO: ADICIONAR A TAREFA NO HTML
      adicionarTarefa(tarefa);
})

/* COMO NÃO TRABALHAMOS COM BANCO DE DADOS NESSE PROJETO
VAMOS CRIAR UMA FUNÇÃO PARA GERAR ID ALEATORIOS PARA QUE
POSSAMOS TORNAR O PROJETO MAIS INTERESSANTE */
function gerarId(){
    return Math.floor(Math.random() * 3000)
}


/* VAMOS CRIAR UMA FUNÇÃO PARA ADICIONAR AS TAREFAS, QUE VAI RECEBER COMO
PARAMETRO O PROPRIO OBJETO ABAIXO: */
function adicionarTarefa(tarefa){
    // AQUI VAMOS CRIAR A TAG <LI> </LI> COM A FUNÇÃO criarTagLi(tarefa)
    let li = criarTagLi(tarefa);
    // VAMOS SELECIONAR O ELEMENTO listaTarefas E DENTRO DELE VAMOS COLOCAR A
    // A TAG <LI> </LI> ATRAVÉS DO METODO appendChild()
    listaTarefas.appendChild(li);
    // AQUI LIMPAMOS O INPUT NOVAMENTE DEPOIS DE TER ADICIONADO A TAREFA
    inputNovaTarefa.value = '';
     
}

/* VAMOS CRIAR A TAG LI ATRAVES DESSA FUNÇÃO */
function criarTagLi(tarefa){
    
   // MODELO QUE ESTAMOS CRIANDO COM O JAVASCRIPT
    // < li>
    //     <span class="TextoTarefa"> Tarefa 1</span>
    //         <div>
    //             <button class="btnAcao">
    //                 <i class="fa fa-pencil"></i>
    //             </button>
    //             <button class="btnAcao">
    //                 <i class="fa fa-trash"></i>
    //             </button>
    //         </div>
    //    </li>
    
    // 1° VAMOS CRIAR O ELEMENTO <li> </li>
    let li = document.createElement('li');
    // AQUI CRIAMOS UM id PARA O ELEMENTO li QUE CRIAMOS
    li.id = tarefa.id;
    // 2° VAMOS CRIAR O <span> </span>
    let span = document.createElement('span');
    // 3° PRECISAMOS TRAZER JUNTO A CLASSE ATRAVÉS DO classList.add
    span.classList.add('textoTarefa');
    // 4° AGORA PRECISAMOS ADICIONAR NO HTML O NOME DA TAREFA QUE VAMOS DIGITAR
    span.innerHTML = tarefa.nome;
    // 5° AGORA VAMOS CRIAR NOSSA <div> </div>
     let div = document.createElement('div');
    // 6° AGORA VAMOS CRIAR OS BOTÃO EDITAR
    let btnEditar =  document.createElement('button');
    // 7° VAMOS ADICIONAR A CLASS btnAcao NO btnEditar
    btnEditar.classList.add('btnAcao')
    // 8° AGORA VAMOS ADICONAR O ICONE DO BOTÃO DE LÁPIS
    btnEditar.innerHTML = ' <i class="fa fa-pencil"></i>';
    // AQUI PODEREMOS EDITAR, OBSERVE QUE TEMOS UMA FUNÇÃO QUE RECEBE COM PARAMETRO O tarefa.id
    btnEditar.setAttribute('onclick', 'editar('+ tarefa.id +')');
     
    // 9° AGORA VAMOS CRIAR OS BOTÃO EXCLUIR 
    let btnExcluir =  document.createElement('button');
     // 10° VAMOS ADICIONAR A CLASS btnAcao NO btnExcluir
     btnExcluir.classList.add('btnAcao');
    // 11° AGORA VAMOS ADICONAR O ICONE DO BOTÃO DE LIXEIRA
     btnExcluir.innerHTML = ' <i class="fa fa-trash"></i>';
     // AQUI PODEREMOS EXCLUIR, OBSERVE QUE TEMOS UMA FUNÇÃO QUE RECEBE COM PARAMETRO O tarefa.id
    btnExcluir.setAttribute('onclick', 'excluir('+ tarefa.id +')');
     
     // 12° PRECISAMOS COLOCAR O btnEditar E O btnExcluir DENTRO DA <div></div>
    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);
    // 13­° AGORA PRECISAMOS ADICIONAR A TAG <span></span> E A <div></div> DENTRO DE li
    li.appendChild(span);
    li.appendChild(div);
    // 14° SÓ PRECISAMOS RETORNAR O li
    return li;
}


function editar(idTarefa) {
    let li = document.getElementById(''+ idTarefa + '');
    if(li) {
        idTarefaEdicao.innerHTML = '#' + idTarefa;
        inputTarefaNomeEdicao.value = li.innerText;
        alternarJanelaEdicao();
    } else {
        alert('Elemento HTML não encontrado!');
    }
}

function excluir(idTarefa){
    // PERGUNTA PARA O USUARIO ANTES
    let confirmacao = window.confirm('Tem certeza que deseja excluir? ')
    // VERIFICA SE EXISTE A CONFIRMAÇÃO
    if(confirmacao){
        // CAPTURA O idTarefa E JOGA NA VARIÁVEL li
        let li = document.getElementById('' + idTarefa + '');
            if(li){
                // REMOVE EXATAMENTE O NÓ FILHO DE listaTarefas NO CASO O li
                listaTarefas.removeChild(li);
            }
    }
}
function alternarJanelaEdicao(){
    janelaEdicao.classList.toggle('abrir');
    janelaEdicaoFundo.classList.toggle('abrir');
}