const state = {
    view:{
        squares: document.querySelectorAll(".square"), 
        enemy: document.querySelectorAll(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),

/* Variáveis de acesso global */
    },
    values:{
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions:{
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000), 
    }

/* Objetos para acessar essas variáveis que vão alterar algum elemento visual na tela */   
}

function countDown(){
    state.values.currentTime--
    state.view.timeLeft.textContent = state.values.currentTime

    if(state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
        alert("Game over! O seu resultado foi: "+state.values.result+ "Para jogar novamente de um F5")
    }

/* Função que mostra o tempo decorrido e ao final o resultado */
}

function playSound(){
    let audio = new Audio("./src/audios/Sound-Coin-Mario.mp3")
    audio.volume = 0.1
    audio.play()

/* Colocando audio no minigame */     
}

function randomSquare(){

    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    })

    let randomNumber = Math.floor(Math.random() * 9)
    let randomSquare = state.view.squares[randomNumber]
    randomSquare.classList.add("enemy")

    state.values.hitPosition = randomSquare.id

/* Função que vai sortear um quadrado aleatório para ter o inimigo */
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)

/* !!! Outro modo de fazer !!! 

Velocidade que a imagem do inimigo aparece na tela (1000) 
*/   
}

function addListenerHitBox(){

    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result
                state.values.hitPosition = null
                playSound()
            }
        })
    })

/* Listener = Conceito universal que escuta algum tipo de ação, neste exemplo o clique dentro do jogo */  

/* Nessa função estamos validando o clique do mouse de acordo com os quadrados da imagem e aumentando o score do player */
}

function init(){
    moveEnemy()
    addListenerHitBox()
/* Inicializar as funções */    
}

init()