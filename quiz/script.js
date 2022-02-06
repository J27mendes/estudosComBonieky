//dados iniciais
let questaoAtual = 0
let respostasCorretas = 0


//funções
showQuestions()

//Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent)


function showQuestions(){
    if(questions[questaoAtual]){
        let q = questions[questaoAtual]
        //console.log(q.question)
        let progressoBarra = Math.floor((questaoAtual / questions.length) * 100)

        document.querySelector('.progress--bar').style.width = `${progressoBarra}%`

        document.querySelector('.scoreArea').style.display = 'none'
        document.querySelector('.questionArea').style.display = 'block'

        document.querySelector('.question').innerHTML = q.question
        
        //document.querySelector('.options').innerHTML = ''
        //substituindo este conteudo por outra variavel que 
        //vai conter todo o processo antes de enviar para a tela

        let optionsHtml = ''
        for(let i in q.options){
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span>${q.options[i]}</div>`
        }
        document.querySelector('.options').innerHTML = optionsHtml

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent)
        })
    } else {
        finishQuestions()
        //acabaram as questões
    }
}

function optionClickEvent(e){
    let clickedOption = parseInt(e.target.getAttribute('data-op'))

    if(questions[questaoAtual].answer === clickedOption){
        respostasCorretas++
    } 
    questaoAtual++
    showQuestions()
}

function finishQuestions(){
    let pontos = Math.floor((respostasCorretas / questions.length) * 100)

    if(pontos < 40){
        document.querySelector('.scoreText1').innerHTML = `Somente ${pontos}% de acerto, você precisa estudar mais!!!`
        document.querySelector('.scoreText1').style.color = '#000000'
        document.querySelector('.scorePct').style.color = '#ff0000'
    }
    if(pontos >= 40 && pontos <= 70){
        document.querySelector('.scoreText1').innerHTML = `Com ${pontos}% de acerto, você está muito bem!!!, continue estudando!`
        document.querySelector('.scoreText1').style.color = '#000000'
        document.querySelector('.scorePct').style.color = '#dfdc29'
    }
    if(pontos >= 70){
        document.querySelector('.scoreText1').innerHTML = `Com ${pontos}% de acerto, você está de Parabéns!!!`
        document.querySelector('.scoreText1').style.color = '#000000'
        document.querySelector('.scorePct').style.color = '#00fff0'
    }


    document.querySelector('.scorePct').innerHTML = `Acertou ${pontos}%`
    document.querySelector('.scoreText2').innerHTML = `<div>Você respondeu ${questions.length} questões e acertou ${respostasCorretas}.</div>`

    document.querySelector('.questionArea').style.display = 'none'
    document.querySelector('.scoreArea').style.display = 'block'
    document.querySelector('.progress--bar').style.width = `100%`
}

function resetEvent(){
    questaoAtual = 0
    respostasCorretas = 0
    showQuestions()
}
