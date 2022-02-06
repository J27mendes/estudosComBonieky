/*document.querySelector('.neutralArea').addEventListener('click', (e) => {
    console.log('target', e.target)
    console.log('current target', e.currentTarget)
})*/

//aprendendo sobre o evento target
let areas = {
    a: null,
    b: null,
    c: null
}


document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart)
    item.addEventListener('dragend', dragEnd)
})

document.querySelectorAll('.area').forEach(item => {
    item.addEventListener('dragover', dragOver)
    item.addEventListener('dragleave', dragLeave)
    item.addEventListener('drop', drop)    
})

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral)
document.querySelector('.neutralArea').addEventListener('draleave', dragLeaveNeutral)
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral)

//funções relacionadas ao item
function dragStart(e){
    e.currentTarget.classList.add('dragging')
}

function dragEnd(e){
    e.currentTarget.classList.remove('dragging')
}

//funções relacionadas a area
function dragOver(e){
    if(e.currentTarget.querySelector('.item') === null){
    e.preventDefault()
    e.currentTarget.classList.add('hover')
    }
    //console.log('entrou na area dropavel')
}

function dragLeave(e){
    e.currentTarget.classList.remove('hover')
    //console.log('saiu da area dropavel')

}

function drop(e){
    e.currentTarget.classList.remove('hover')

    if(e.currentTarget.querySelector('.item') === null){
        let dragItem = document.querySelector('.item.dragging')
        e.currentTarget.appendChild(dragItem)
        atualizandoAreas()
    }
    //console.log(dragItem)
    //console.log('liberou') 41:30
}

//funções relacionadas a neutral area

function dragOverNeutral(e){
    e.preventDefault()
    e.currentTarget.classList.add('hover')
}

function dragLeaveNeutral(e){
    e.currentTarget.classList.remove('hover')

}

function dropNeutral(e){
    e.currentTarget.classList.remove('hover')
    
    let dragItem = document.querySelector('.item.dragging')
    e.currentTarget.appendChild(dragItem)
    atualizandoAreas()
}

//funções lógicas
function atualizandoAreas(){
    document.querySelectorAll('.area').forEach(area => {
        let name = area.getAttribute('data-name')
        if(area.querySelector('.item') !== null){
            areas[name] = area.querySelector('.item').innerHTML
        } else {
            areas[name] = null
        }
    })
    if(areas.a === '1' && areas.b === '2' && areas.c === '3'){
        document.querySelector('.areas').classList.add('correct')
    } else {
        document.querySelector('.areas').classList.remove('correct')
    }
    //console.log(areas)
}
