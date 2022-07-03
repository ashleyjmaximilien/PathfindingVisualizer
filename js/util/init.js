/* Initializes all event listeners for interactive elements */ 


window.startId = null;
window.targetId = null;
window.allowTableModification = true; 
window.buttons = [];

// Navigation Buttons w/ hidden containers
document.getElementById("patterns-btn").addEventListener("click", toggleHidden);
document.getElementById("algorithm-btn").addEventListener("click", toggleHidden);

let arrows = document.getElementsByClassName("hidden-arrow-svg");
for (let i = 0; i < arrows.length; i++)
    arrows[i].addEventListener("click", toggleHidden);

// Maze generation & pattern building buttons
window.BUTTON_RD = document.getElementById("rd");
BUTTON_RD.addEventListener("click", recurDivisionWrapper);
window.buttons.push(BUTTON_RD);

window.BUTTON_RBT = document.getElementById("rbt");
BUTTON_RBT.addEventListener("click", recurBacktrackingWrapper);
window.buttons.push(BUTTON_RBT);

window.BUTTON_PRIMS = document.getElementById("prims");
BUTTON_PRIMS.addEventListener("click", primsWrapper);
window.buttons.push(BUTTON_PRIMS);

window.BUTTON_KRUSKALS = document.getElementById("kruskals");
BUTTON_KRUSKALS.addEventListener("click", kruskalsWrapper);
window.buttons.push(BUTTON_KRUSKALS);

window.BUTTON_RANDOM = document.getElementById("random");
BUTTON_RANDOM.addEventListener("click", buildRandom);
window.buttons.push(BUTTON_RANDOM);

window.BUTTON_SSLH = document.getElementById("sslh");
BUTTON_SSLH.addEventListener("click", buildSslh);
window.buttons.push(BUTTON_SSLH);

window.BUTTON_SSLV = document.getElementById("sslv");
BUTTON_SSLV.addEventListener("click", buildSslv);
window.buttons.push(BUTTON_SSLV);

window.BUTTON_LSLH = document.getElementById("lslh");
BUTTON_LSLH.addEventListener("click", buildLslh);
window.buttons.push(BUTTON_LSLH);

window.BUTTON_LSLV = document.getElementById("lslv");
BUTTON_LSLV.addEventListener("click", buildLslv);
window.buttons.push(BUTTON_LSLV);

window.BUTTON_DAMASK = document.getElementById("damask");
BUTTON_DAMASK.addEventListener("click", buildDamask);
window.buttons.push(BUTTON_DAMASK);

window.BUTTON_HERRINGBONE = document.getElementById("herringbone");
BUTTON_HERRINGBONE.addEventListener("click", buildHerringbone);
window.buttons.push(BUTTON_HERRINGBONE);

window.BUTTON_ELLERS = document.getElementById("ellers");
BUTTON_ELLERS.addEventListener("click", ellersWrapper);
window.buttons.push(BUTTON_ELLERS);

/* Table cleaning buttons */
window.BUTTON_CLEARBOARD = document.getElementById("clearboard");
BUTTON_CLEARBOARD.addEventListener("click", clearBoard);
window.buttons.push(BUTTON_CLEARBOARD);

window.BUTTON_CLEARWALLS = document.getElementById("clearwalls");
BUTTON_CLEARWALLS.addEventListener("click", clearWalls);
window.buttons.push(BUTTON_CLEARWALLS);

window.BUTTON_CLEARPATH = document.getElementById("clearpath");
BUTTON_CLEARPATH.addEventListener("click", clearPath);
window.buttons.push(BUTTON_CLEARPATH);

/* Pathfinding algorithm buttons */
window.BUTTON_BFS = document.getElementById("bfs");
BUTTON_BFS.addEventListener("click", hideAlgorithmReminder);

window.BUTTON_DFS = document.getElementById("dfs");
BUTTON_DFS.addEventListener("click", hideAlgorithmReminder);

window.BUTTON_DIJKSTRAS = document.getElementById("dijkstras");
BUTTON_DIJKSTRAS.addEventListener("click", hideAlgorithmReminder);

window.BUTTON_ASTAR = document.getElementById("astar");
BUTTON_ASTAR.addEventListener("click", hideAlgorithmReminder);

window.BUTTON_GREEDY = document.getElementById("greedy");
BUTTON_GREEDY.addEventListener("click", hideAlgorithmReminder);

/* theme button */
window.BUTTON_THEME = document.getElementById("theme-btn");
BUTTON_THEME.addEventListener("click", changeTheme);

/* visualize button */
window.BUTTON_VISUALIZE = document.getElementById("visualize");
BUTTON_VISUALIZE.addEventListener("click", visualize);
window.buttons.push(BUTTON_VISUALIZE);

/* Start/target node dragstart event*/

let start = document.getElementById("start-node");
start.addEventListener("dragstart", dragStart);
start.addEventListener("dragend", dragEnd);

let target = document.getElementById("target-node");
target.addEventListener("dragstart", dragStart);
target.addEventListener("dragend", dragEnd);

let list = document.getElementsByTagName("TD");

for (let i = 0; i < list.length; i++)
{
    list[i].setAttribute("ondragstart", "return false");
    list[i].addEventListener('dragover', dragOver);
    list[i].addEventListener('dragleave', dragLeave);
    list[i].addEventListener('drop', drop);
}







