function generateCid(row, col){
    return row.toString() + "-" + col.toString();
}


function setPath(row, col){
    let table = document.getElementById("table");

    if (isWithinRange(row, col))
        table.rows[row].cells[col].classList.add("path");
}


function setWall(row, col){
    let table = document.getElementById("table");

    if (isWithinRange(row, col))
        table.rows[row].cells[col].classList.add("wall");
}


function removeWall(row, col){
    let table = document.getElementById("table");
 
    if (isWithinRange(row, col))
        table.rows[row].cells[col].classList.remove("wall");
}


function resetClassName(row, col){
    let table = document.getElementById("table");

    if (isWithinRange(row, col))
        table.rows[row].cells[col].className = "";
}


// Adds the class "visited" to the table cell at (i, j)
function markCellVisited(row, col){
    let table = document.getElementById("table");

    if (isWithinRange(row, col))
        table.rows[row].cells[col].classList.add("visited");
}


function markCellExplored(row, col){
    let table = document.getElementById("table");

    if (isWithinRange(row, col))
        table.rows[row].cells[col].classList.add("explored");
}


function markCellPFExplored(row, col){
    let table = document.getElementById("table");

    if (isWithinRange(row, col))
        table.rows[row].cells[col].classList.add("pfexplored");   
}


function isVisited(row, col){
    let table =  document.getElementById("table");
    let b = false;

    if (isWithinRange(row, col))
        if (table.rows[row].cells[col].classList.contains("visited"))
            b = true;   
    return b;
}


function isPfExplored(row, col){
    let table =  document.getElementById("table");
    let b = false;

    if (isWithinRange(row, col))
        if (table.rows[row].cells[col].classList.contains("pfexplored"))
            b = true;   
    return b;
}


function isPath(row, col){
    let table = document.getElementById("table");
    let b = false;

    if (isWithinRange(row, col))
        if (table.rows[row].cells[col].classList.contains("path"))
            b = true;
    return b;
}


function isPassage(row, col){
    let table = document.getElementById("table");
    let b = true;

    if (isWithinRange(row, col))
        if (table.rows[row].cells[col].classList.contains("wall"))
            b = false;
   return b;         
}


/* Generates a list of valid neighbors for the cell at the location (r, c) on the table */
function getNeighbors(row, col){
    const TOP = row - 2;
    const RIGHT = col + 2;
    const BOTTOM = row + 2;
    const LEFT = col - 2;
    let arr = [];

    //top
    if (isWithinRange(TOP, col) && !isVisited(TOP, col))
    {
        let str = TOP.toString() + "-" + col.toString();
        arr.push(str);
    }

    //right
    if (isWithinRange(row, RIGHT) && !isVisited(row, RIGHT))
    {
        let str = row.toString() + "-" + RIGHT.toString();
        arr.push(str);
    }

    //bottom
    if (isWithinRange(BOTTOM, col) && !isVisited(BOTTOM, col))
    {
        let str = BOTTOM.toString() + "-" + col.toString();
        arr.push(str);
    }
    
    //left
    if (isWithinRange(row, LEFT) && !isVisited(row, LEFT))
    {
        let str = row.toString() + "-" + LEFT.toString();
        arr.push(str);
    }
    return arr; 
}
