//dados inicias
let velha = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let vez = '';
let aviso = '';
let jogar = false;


//eventos
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});


//funções para auxiliar os eventos
function itemClick(event){
    let item = event.target.getAttribute('data-item');
    if(jogar && velha[item] === ''){
        velha[item] = vez;
        renderVelha();
        alternaVez();
    }
};


function reset(){
    aviso = '';

    let aleatorio = Math.floor(Math.random() * 2);
    //vez = (aleatorio === 0) ? 'x' : 'o'; /outra forma de fazer a verificação/            
    if(aleatorio === 0){
        vez = 'x';
    } else {
        vez = 'o';
    }

    for(let i in velha){
        velha[i] = '';
    };
    jogar = true;

    renderVelha();
    renderInfo();
};


function renderVelha(){
    for(let j in velha){
        let item = document.querySelector(`div[data-item=${j}]`);
        item.innerHTML = velha[j];       
    }
    checarJogo();
};


function renderInfo(){
    document.querySelector('.vez').innerHTML = vez;
    document.querySelector('.resultado').innerHTML = aviso;
};


function alternaVez(){
    //vez = (vez === 'x') ? 'o' : 'x';
    if(vez === 'x'){
        vez = 'o';
    } else {
        vez = 'x';
    }
    renderInfo();
};


function checarJogo(){
    if(checarVitoria('x')){
        aviso = `- ${vez} - foi o vencedor`;
        jogar = false;
    } else if (checarVitoria('o')){
        aviso = `- ${vez} - foi o vencedor`;
        jogar = false;
    } else if (velhaCompleta()){
        aviso = 'O jogo empatou';
        jogar = false;
    }
};


function checarVitoria(vez){
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];
    for(let k in pos){
        let posArray = pos[k].split(','); //'a1,a2,a3' , 'b1,...
        //let venceu = posArray.every(option => velha[option] === vez);
        let venceu = posArray.every((option) =>{
            if(velha[option] === vez){
                return true;
            } else {
                return false;
            }
        }); 
        if(venceu){
            return true;
        }       
    }
    return false;
};


function velhaCompleta(){
    for(let l in velha){
        if(velha[l] === ''){
            return false;
        }
    }
    return true;
};