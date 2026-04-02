let jogador = localStorage.getItem("jogador") || null;
let batalhas = JSON.parse(localStorage.getItem("batalhas") || "[]");
let editando = null;

if(jogador) iniciar();

function entrar(){
jogador = nome.value;
localStorage.setItem("jogador", jogador);
iniciar();
}

function logout(){
localStorage.removeItem("jogador");
location.reload();
}

function iniciar(){
login.classList.add("hidden");
app.classList.remove("hidden");
player.innerText = "👤 " + jogador;
ranking();
}

function tela(id){
["ranking","nova","historico","perfil"].forEach(t=>{
document.getElementById(t).classList.add("hidden");
});
document.getElementById(id).classList.remove("hidden");

if(id=="historico") historico();
if(id=="perfil") perfil();
}

function salvar(){

let batalha = {
j1:j1.value,
j2:j2.value,
p1:Number(p1.value),
p2:Number(p2.value),
vencedor:vencedor.value,
data:Date.now()
};

if(editando!=null){
batalhas[editando]=batalha;
editando=null;
}else{
batalhas.push(batalha);
}

localStorage.setItem("batalhas", JSON.stringify(batalhas));

j1.value="";
j2.value="";
p1.value="";
p2.value="";
vencedor.value="";

ranking();
historico();
}

function ranking(){

let pontos={};
let vitorias={};
let derrotas={};
let saldo={};

batalhas.forEach(b=>{

[pontos,vitorias,derrotas,saldo].forEach(obj=>{
if(!obj[b.j1]) obj[b.j1]=0;
if(!obj[b.j2]) obj[b.j2]=0;
});

pontos[b.j1]+=b.p1;
pontos[b.j2]+=b.p2;

saldo[b.j1]+=b.p1-b.p2;
saldo[b.j2]+=b.p2-b.p1;

if(b.vencedor=="1"){
pontos[b.j1]+=2;
vitorias[b.j1]++;
derrotas[b.j2]++;
}else{
pontos[b.j2]+=2;
vitorias[b.j2]++;
derrotas[b.j1]++;
}

});

let lista = Object.keys(pontos).map(nome=>({
nome,
pts:pontos[nome],
v:vitorias[nome],
d:derrotas[nome],
s:saldo[nome]
}));

lista.sort((a,b)=>b.pts-a.pts);

let html="<h3>🏆 Ranking</h3>";

lista.forEach((p,i)=>{
html+=`
<div class="card ${i==0?'lider':''}">
${i==0?'👑 ':''}${i+1}. ${p.nome}<br>
🏆 ${p.pts} pts<br>
✅ ${p.v} | ❌ ${p.d} | ⚔️ ${p.s}
</div>
`;
});

ranking.innerHTML=html;
}

function historico(){

let html="<h3>📜 Histórico</h3>";

batalhas.slice().reverse().forEach((b,i)=>{

let id = batalhas.length-1-i;
let venceu = b.vencedor=="1" ? b.j1 : b.j2;

html+=`
<div class="card">

<b>${venceu}</b> venceu<br>
${b.j1} (${b.p1}) x (${b.p2}) ${b.j2}

<div class="small">
<button onclick="editar(${id})">Editar</button>
<button onclick="apagar(${id})">Apagar</button>
</div>

</div>
`;

});

historico.innerHTML=html;
}

function editar(i){

let b = batalhas[i];

j1.value=b.j1;
j2.value=b.j2;
p1.value=b.p1;
p2.value=b.p2;
vencedor.value=b.vencedor;

editando=i;

tela("nova");
}

function apagar(i){

if(confirm("Apagar batalha?")){
batalhas.splice(i,1);
localStorage.setItem("batalhas", JSON.stringify(batalhas));
ranking();
historico();
}

}

function perfil(){

let v=0,d=0,pts=0,saldo=0;
let hist="";

batalhas.forEach(b=>{

if(b.j1==jogador || b.j2==jogador){

let meus = b.j1==jogador ? b.p1 : b.p2;
let deles = b.j1==jogador ? b.p2 : b.p1;

let venceu =
(b.vencedor=="1" && b.j1==jogador) ||
(b.vencedor=="2" && b.j2==jogador);

pts+=meus;
saldo+=meus-deles;

if(venceu){
v++;
pts+=2;
hist+="✅ ";
}else{
d++;
hist+="❌ ";
}

let oponente = b.j1==jogador ? b.j2 : b.j1;

hist+=`vs ${oponente} (${meus}-${deles})<br>`;

}

});

perfil.innerHTML=`
<h3>👤 ${jogador}</h3>

🏆 Pontos: ${pts}<br>
✅ Vitórias: ${v}<br>
❌ Derrotas: ${d}<br>
⚔️ Saldo Pokémon: ${saldo}

<h4>Histórico</h4>
${hist}
`;
}