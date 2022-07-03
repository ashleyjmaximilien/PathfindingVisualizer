function getTableLength(){
    return document.getElementById("table").rows.length;
}


function getTableWidth(){
    return document.getElementById("table").rows[0].cells.length;
}


// Returns true if both x and y are valid indexes for the table
// based on the table's length and width. Returns false otherwise
function isWithinRange(x, y){
    const LENGTH = getTableLength();
    const WIDTH = getTableWidth();
    
    let b = (x >= 0 && x < LENGTH && y >= 0 && y < WIDTH) ? true : false

return b;
}


// Removes all classes from all cells in table
function clearBoard(){
    clearWalls();
    clearPath();
    resetStartNode();
    resetTargetNode();
}


function clearWalls(){
    const WIDTH = getTableWidth();
    const LENGTH = getTableLength();

    for (let i = 0; i < LENGTH; i++)
        for (let j = 0; j < WIDTH; j++)
            if (!isPath(i, j))
                resetClassName(i, j);
}


function clearPath(){
    const WIDTH = getTableWidth();
    const LENGTH = getTableLength();

    for (let i = 0; i < LENGTH; i++)
        for (let j = 0; j < WIDTH; j++)
        {
            if (isPath(i, j))
                resetClassName(i, j);

            if (isPfExplored(i, j))
                resetClassName(i, j);
        }
}


function cleanBoard(){
    let table = document.getElementById("table");
    const LENGTH = getTableLength();
    const WIDTH = getTableWidth();

    for (let i = 0; i < LENGTH; i++)
        for (let j = 0; j < WIDTH; j++)
        {
            if (table.rows[i].cells[j].classList.contains("wall"))
                table.rows[i].cells[j].className = "wall";
            
            else
                table.rows[i].cells[j].className = "";
        }
}


function resetStartNode(){
    if (!startId)
        return;

    let cell = document.getElementById(startId);
    let parent = document.getElementById("start-element");

    let nodeBox = cell.children[0];
    nodeBox.className = "node-box";
    
    cell.removeChild(nodeBox);
    parent.appendChild(nodeBox);
    parent.className = "legend-element";

    startId = null;
}


function resetTargetNode(){
    if (!targetId)
        return;

    let cell = document.getElementById(targetId);
    let parent = document.getElementById("target-element");

    let nodeBox = cell.children[0];
    nodeBox.className = "node-box";
    
    cell.removeChild(nodeBox);
    parent.appendChild(nodeBox);
    parent.className = "legend-element";

    targetId = null;
}


// Returns a random number no lower than min and and less than max.
// In other words the value returned can be greater than or equal to min
// but is always less than max
function getRandomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}


function isEven(n){
    return ((n & 1) != 1);
}


// Removes all instances of "value" from an array
function arrayRemove(arr, value){ 
    return arr.filter(function(e){ 
        return e != value; 
    });
}

