//seleciona a tag form e faz o eventlistener ficar monitorando o input 
//usa a função assincrona e depois preveni o evento padrão que é atualizar a página.
document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault()

    let input = document.querySelector('#searchInput').value
    //console.log(input)
//verifica se o input está vazio, se não estiver vazio.
//exibe uma mensagem de aviso do carregamento
//faz a busca numa api que dá as informações do clima que vem em formato JSON.
//quando carregar as informações através do fetch na url colocando na variavel
//recebe em um objeto o json recebido 
    if(input !== ''){
        showWarning('Carregando...')
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=dd46b3552d363cad1a8e110b2153bab4&units=metric&lang=pt_br`
                
        let results = await fetch(url)

        let json = await results.json()

//verifica se o objeto recebido é valido
        if(json.cod === 200){
            clearInfo()
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp.toFixed(1),
                umidade: json.main.humidity,
                tempIcon: json.weather[0].icon,
                tempDescription: json.weather[0].description,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
            console.log(json)
//se não for valido limpa o conteudo
//e informa que a cidade não foi encontrada            
        } else {
            clearInfo()
            showWarning('Infelizmente a cidade não foi encontrada')
        }
//e se o campo estiver vazio limpa o conteudo na tela        
    } else {
        clearInfo()
    }
})

//função que exibe na tela os dados recebidos
function showInfo(json){
    showWarning('')

    document.querySelector('.titulo').innerHTML = `${json.name} - ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`

    document.querySelector('.umidade').innerHTML = `${json.umidade}(UR)`
    document.querySelector('.descricao').innerHTML = `${json.tempDescription}`

    document.querySelector('.resultado').style.display = 'block'

}

//função que limpa tela
function clearInfo(){
    showWarning('')
    document.querySelector('.resultado').style.display = 'none'
}

//coloca uma mensagem provisória numa tag de aviso fora painel de informações
function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg
