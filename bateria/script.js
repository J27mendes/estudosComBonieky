document.body.addEventListener('keyup', (event) => {
    tocarSom(event.code.toLowerCase());
});

document.querySelector('.composer button').addEventListener('click',()=>{
    let musica = document.querySelector('#input').value;
    if(musica !== ''){
        let musicaArray = musica.split('');
        playComposicao(musicaArray);
    }
})

function tocarSom(som){
    let elementoAudio = document.querySelector(`#s_${som}`);
    let elementoKey = document.querySelector(`div[data-key="${som}"]`);
    
    if(elementoAudio){
        elementoAudio.currentTime = 0;
        elementoAudio.play();
    }
    if(elementoKey){
        elementoKey.classList.add('active');
        
        setTimeout(()=>{
            elementoKey.classList.remove('active');
        }, 400);
    }
};

function playComposicao(musicaArray){
    let tempo = 0;

    for(let itemSom of musicaArray){
            setTimeout(()=>{
            tocarSom(`key${itemSom}`)
        }, tempo);
        tempo += 300;        
    }
    
}