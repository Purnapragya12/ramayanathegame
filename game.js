const canvas =
document.getElementById("gameCanvas");

const ctx =
canvas.getContext("2d");

let state="menu";

let images={};

function load(name,path){

let img=new Image();

img.src=path;

images[name]=img;

}

load("rama","assets/rama.png");
load("sita","assets/sita.png");
load("lakshmana","assets/lakshmana.png");
load("hanuman","assets/hanuman.png");
load("ravana","assets/ravana.png");

load("forest","assets/forest.jpg");
load("lanka","assets/lanka.jpg");
load("ayodhya","assets/ayodhya.jpg");
load("battle","assets/battle.jpg");

let scene=0;
let line=0;

let typingIndex=0;

let currentText="";

let fade=0;

let camX=0;

let story=[

{

bg:"ayodhya",

dialogue:[

{c:"rama",t:"Today I leave Ayodhya."},

{c:"sita",t:"I will follow you."},

{c:"lakshmana",t:"I will protect you both."}

]

},

{

bg:"forest",

dialogue:[

{c:"rama",t:"The forest is peaceful."},

{c:"lakshmana",t:"I feel danger."}

]

},

{

bg:"forest",

dialogue:[

{c:"ravana",t:"Sita is mine now."},

{c:"sita",t:"Rama will come."}

]

},

{

bg:"forest",

dialogue:[

{c:"rama",t:"We must find her."}

]

},

{

bg:"forest",

dialogue:[

{c:"hanuman",t:"My lord I will help."},

{c:"rama",t:"Find Lanka."}

]

},

{

bg:"lanka",

dialogue:[

{c:"hanuman",t:"I found Sita."},

{c:"rama",t:"Prepare war."}

]

},

{

bg:"battle",

dialogue:[

{c:"ravana",t:"Face me Rama."},

{c:"rama",t:"Your evil ends."}

]

},

{

bg:"ayodhya",

dialogue:[

{c:"rama",t:"We return victorious."}

]

}

];

function startStory(){

state="story";

scene=0;

line=0;

startLine();

}

function startLine(){

currentText=
story[scene].dialogue[line].t;

typingIndex=0;

}

function update(){

if(state=="story"){

if(typingIndex<
currentText.length){

typingIndex+=0.4;

}

camX+=0.1;

}

}

function render(){

ctx.clearRect(0,0,1000,550);

if(state=="menu") drawMenu();

if(state=="story") drawStory();

}

function drawMenu(){

ctx.fillStyle="white";

ctx.font="50px Arial";

ctx.fillText(

"RAMAYANA STORY",

300,

160

);

drawButton(420,260,"START");

drawButton(420,330,"INSTRUCTIONS");

}

function drawStory(){

let bg=
story[scene].bg;

ctx.drawImage(

images[bg],

-camX,

0,

1100,

550

);

drawCharacter();

drawDialogue();

}

function drawCharacter(){

let char=
story[scene].dialogue[line].c;

let y=
300+
Math.sin(Date.now()*0.005)*5;

if(char=="rama")

ctx.drawImage(
images.rama,
50,
y,
220,
300
);

if(char=="sita")

ctx.drawImage(
images.sita,
50,
y,
220,
300
);

if(char=="lakshmana")

ctx.drawImage(
images.lakshmana,
50,
y,
220,
300
);

if(char=="hanuman")

ctx.drawImage(
images.hanuman,
50,
y,
220,
300
);

if(char=="ravana")

ctx.drawImage(
images.ravana,
720,
y,
220,
300
);

}

function drawDialogue(){

ctx.fillStyle=
"rgba(0,0,0,0.85)";

ctx.fillRect(

120,

380,

760,

120

);

ctx.strokeStyle="gold";

ctx.strokeRect(

120,

380,

760,

120

);

ctx.fillStyle="white";

ctx.font="22px Arial";

let name=
story[scene].dialogue[line].c;

ctx.fillText(

name.toUpperCase(),

150,

410

);

ctx.fillText(

currentText.substring(
0,
typingIndex
),

150,

450

);

ctx.font="16px Arial";

ctx.fillText(

"Click to continue",

700,

480

);

}

function drawButton(x,y,text){

ctx.fillStyle="#111";

ctx.fillRect(x,y,200,60);

ctx.strokeStyle="#1e90ff";

ctx.strokeRect(x,y,200,60);

ctx.fillStyle="white";

ctx.font="22px Arial";

ctx.fillText(text,x+40,y+38);

}

canvas.addEventListener(

"click",

(e)=>{

let x=e.offsetX;

let y=e.offsetY;

if(state=="menu"){

if(x>420 && x<620 && y>260 && y<320)

startStory();

}

else if(state=="story"){

nextLine();

}

});

function nextLine(){

line++;

if(line>=
story[scene].dialogue.length){

scene++;

line=0;

camX=0;

if(scene>=story.length){

state="menu";

return;

}

}

startLine();

}

function loop(){

update();

render();

requestAnimationFrame(loop);

}

loop();