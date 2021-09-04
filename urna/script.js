let votacao = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let imagens = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3') ;

let etapaAtual = 0;
let contagem = "";
let votoBranco = false;
let votos = [];


function etapaInicial(){
    let etapa = etapas[etapaAtual];

    let numerosHtml = "";
    contagem = "";
    votoBranco = false;

    for(let i = 0; i < etapa.numeros; i ++){
        if(i === 0){
        numerosHtml += '<div class="numero pisca"></div>';
        } else {
             numerosHtml += '<div class="numero"></div>';
        }
    };



    votacao.style.display = "none";
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = "";
    aviso.style.display = "none";
    imagens.innerHTML = "";
    numeros.innerHTML = numerosHtml;
};

function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === contagem){
            return true;
        } else {
            return false;
        };
    });

    if(candidato.length > 0){
        candidato = candidato[0];
        votacao.style.display = 'block';
        aviso.style.display = "block";
        descricao.innerHTML = `Nome: ${candidato.nome}</br>Partido: ${candidato.partido}`;

        let fotoHtml = "";
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotoHtml += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`
                
            } else {
                fotoHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`
            };
            
        };
        imagens.innerHTML = fotoHtml;
    } else {
        votacao.style.display = "block";
        aviso.style.display = "block";
        descricao.innerHTML += `<div class="aviso--grande pisca">VOTO NULO</div>`


    };
};

function clicou(n){
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null){
        elNumero.innerHTML = n;
        contagem = `${contagem}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface()
        }
    }
};

function branco(){
        contagem = "";
        votoBranco = true;
        votacao.style.display = "block";
        aviso.style.display = "block";
        numeros.innerHTML = "";
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO EM BRANCO</div>`
        imagens.innerHTML = "";    
};


function corrige(){
    etapaInicial();
};


function confirma(){
    let etapa = etapas[etapaAtual];

    let confirmacao = false;

    if(votoBranco === true){
        confirmacao = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'Branco'
        });

    } else if (contagem.length === etapa.numeros){
        confirmacao = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: contagem
        });
    };
    if(confirmacao){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined ){
            etapaInicial();
        } else {
            document.querySelector('.tela').innerHTML = `<div class="aviso--gigante pisca">FIM!</div>`
            numeros.innerHTML = "";
            console.log(votos)
        };
    };
};


etapaInicial()