const words = {
easy:[
"médico","professor","cachorro","bola","comer",
"dormir","correr","nadar","telefone","carro"
],

medium:[
"andar de bicicleta","tirar selfie","escorregar",
"fotógrafo","quebrar vidro","plantar árvore",
"andar de skate"
],

hard:[
"crise existencial","debater política",
"imitar celebridade","ganhar na loteria",
"dirigir no trânsito"
]
}

let used=[]
let teams=[]
let score=[]
let currentTeam=0
let timer
let timeLeft

function startGame(){

let num=document.getElementById("teams").value

teams=[]
score=[]

for(let i=0;i<num;i++){
teams.push("Dupla "+(i+1))
score.push(0)
}

document.getElementById("setup").classList.add("hidden")
document.getElementById("game").classList.remove("hidden")

updateScore()
nextRound()
}

function nextRound(){

let level=document.getElementById("level").value

let available=words[level].filter(w=>!used.includes(w))

if(available.length===0){
used=[]
available=words[level]
}

let word=available[Math.floor(Math.random()*available.length)]

used.push(word)

document.getElementById("word").innerText=word
document.getElementById("team").innerText=teams[currentTeam]

startTimer()
}

function startTimer(){

clearInterval(timer)

timeLeft=document.getElementById("time").value
document.getElementById("timer").innerText=timeLeft+"s"

timer=setInterval(()=>{

timeLeft--
document.getElementById("timer").innerText=timeLeft+"s"

if(timeLeft<=0){
clearInterval(timer)
nextTeam()
}

},1000)

}

function nextTeam(){

currentTeam++

if(currentTeam>=teams.length)
currentTeam=0

updateScore()
nextRound()
}

function correct(){
score[currentTeam]++
updateScore()
nextRound()
}

function skip(){
nextRound()
}

function updateScore(){

let html="<h3>🏆 Placar</h3>"

for(let i=0;i<teams.length;i++){
html+=teams[i]+" : "+score[i]+"<br>"
}

document.getElementById("score").innerHTML=html
}