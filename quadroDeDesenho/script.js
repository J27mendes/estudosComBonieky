//inicio
let corSelecionada = 'black';
let tela = document.querySelector('#tela');
let contexto = tela.getContext('2d');
let desenhar = false;
let mouseX = 0;
let mouseY = 0;

//eventos
document.querySelectorAll('.colorArea , .color').forEach(item => {
    item.addEventListener('click', clicarCor);
});

tela.addEventListener('mousedown', mouseClicado);
tela.addEventListener('mousemove', mouseMovimento);
tela.addEventListener('mouseup', mouseNclick);
document.querySelector('.clear').addEventListener('click', limparTela);
/*
passo a passo para realizar o desenho
se o mouse estiver clicado, ative o modo desenho
monitore constantemente o mouse,
se o mouse não estiver clicado, desative o modo desenho
*/

//funções
function clicarCor(e){
    let cor = e.target.getAttribute('data-color');
    corSelecionada = cor;
    document.querySelector('.color.active').classList.remove('active');
    //primeiro remove a classList ->
    e.target.classList.add('active');
    //depois adciona a classList que foi selecionada.
}

function mouseClicado(e){
    desenhar = true;
    mouseX = e.pageX - tela.offsetLeft;
    mouseY = e.pageY - tela.offsetTop;
}

function mouseMovimento(e){
    if(desenhar){
        desenhando(e.pageX, e.pageY);
    }
}

function mouseNclick(){
    desenhar = false
}

function desenhando(x, y){
    let pontoX = x - tela.offsetLeft;
    let pontoY = y - tela.offsetTop;

    contexto.beginPath();
    contexto.lineWidth = 3;
    contexto.lineJoin = "round";
    contexto.moveTo(mouseX, mouseY);
    contexto.lineTo(pontoX, pontoY);
    contexto.closePath();
    contexto.strokeStyle = corSelecionada;
    contexto.stroke();

    mouseX = pontoX;
    mouseY = pontoY;
}
function limparTela(){
    contexto.setTransform(1, 0, 0, 1, 0, 0);
    contexto.clearRect(0, 0, contexto.canvas.width, contexto.canvas.height)
}