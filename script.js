const words = [
"médico","professor","cachorro","bola",
"andar de bicicleta","tirar selfie",
"crise existencial","dirigir","dançar"
]

let teams=[]
let score=[]
let currentTeam=0
let currentWord=""
let attempts=0
let timer
let timeLeft

document.getElementById("teamsCount").addEventListener("change",createInputs)

createInputs()

function createInputs(){

let count=document.getElementById("teamsCount").value
let html=""

for(let i=0;i<count;i++){
html+=`<input placeholder="Dupla ${i+1}" id="team${i}"><br>`
}

document.getElementById("teamNames").innerHTML=html
}

function startGame(){

let count=document.getElementById("teamsCount").value

teams=[]
score=[]

for(let i=0;i<count;i++){
let name=document.getElementById("team"+i).value || "Dupla "+(i+1)
teams.push(name)
score.push(0)
}

document.getElementById("setup").classList.add("hidden")
document.getElementById("game").classList.remove("hidden")

nextRound()
}

function nextRound(){

attempts=0
currentWord=words[Math.floor(Math.random()*words.length)]

showTurn()
}

function showTurn(){

document.getElementById("team").innerText=teams[currentTeam]
document.getElementById("word").innerText=currentWord

startTimer()
}

function startTimer(){

clearInterval(timer)

timeLeft=document.getElementById("time").value
document.getElementById("timer").innerText=timeLeft

timer=setInterval(()=>{

timeLeft--
document.getElementById("timer").innerText=timeLeft

if(timeLeft<=0){
wrong()
}

},1000)

}

function wrong(){

clearInterval(timer)

attempts++

if(attempts>=teams.length){
nextTeamStart()
return
}

currentTeam++

if(currentTeam>=teams.length)
currentTeam=0

showTurn()
}

function correct(){

clearInterval(timer)

score[currentTeam]++

nextTeamStart()
}

function nextTeamStart(){

currentTeam++

if(currentTeam>=teams.length)
currentTeam=0

updateScore()
nextRound()
}

function updateScore(){

let html="<h3>Placar</h3>"

for(let i=0;i<teams.length;i++){
html+=teams[i]+" : "+score[i]+"<br>"
}

document.getElementById("score").innerHTML=html
}