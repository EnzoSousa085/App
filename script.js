let words = {
easy: [
"médico","professor","bola","cachorro","comer","dormir",
"carro","telefone","dançar","pular","nadar","correr"
],

medium: [
"fotógrafo","escova de dente","andar de bicicleta",
"quebrar vidro","escorregar","plantar árvore",
"andar de skate","tirar selfie"
],

hard: [
"debater política","imitar celebridade",
"crise existencial","dirigir no trânsito",
"fazer mágica","ganhar na loteria"
]
};

let used = [];
let teams = [];
let currentTeam = 0;
let score = [];
let timeLeft;
let timer;

function startGame(){
let numTeams = document.getElementById("teams").value;

teams = [];
score = [];

for(let i=0;i<numTeams;i++){
teams.push("Dupla " + (i+1));
score.push(0);
}

document.getElementById("setup").classList.add("hidden");
document.getElementById("game").classList.remove("hidden");

nextRound();
}

function nextRound(){
let level = document.getElementById("level").value;
let available = words[level].filter(w => !used.includes(w));

if(available.length === 0){
used = [];
available = words[level];
}

let word = available[Math.floor(Math.random()*available.length)];
used.push(word);

document.getElementById("word").innerText = word;
document.getElementById("team").innerText = teams[currentTeam];

startTimer();
}

function startTimer(){
clearInterval(timer);

timeLeft = document.getElementById("time").value;
document.getElementById("timer").innerText = timeLeft;

timer = setInterval(()=>{
timeLeft--;
document.getElementById("timer").innerText = timeLeft;

if(timeLeft <= 0){
clearInterval(timer);
currentTeam++;

if(currentTeam >= teams.length){
currentTeam = 0;
}

updateScore();
nextRound();
}

},1000);
}

function correct(){
score[currentTeam]++;
nextRound();
}

function skip(){
nextRound();
}

function updateScore(){
let html = "<h2>Placar</h2>";

for(let i=0;i<teams.length;i++){
html += `${teams[i]}: ${score[i]}<br>`;
}

document.getElementById("score").innerHTML = html;
}
