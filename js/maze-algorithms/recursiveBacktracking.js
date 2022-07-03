
function getParent(cell){
    let table = document.getElementById("table");

    let tokens = cell.split("-");
    let x = parseInt(tokens[0]);
    let y = parseInt(tokens[1]);

    if (isWithinRange(x, y))
        return table.rows[x].cells[y].getAttribute('parent');
}


function setParent(child, parent){
    let table = document.getElementById("table");
    let b = false;

    let childTokens = child.split("-");
    let parentTokens = parent.split("-");

    let cx = parseInt(childTokens[0]);
    let cy = parseInt(childTokens[1]);

    let px = parseInt(parentTokens[0]);
    let py = parseInt(parentTokens[1]);

    if (isWithinRange(cx, cy) && isWithinRange(px, py))
    {
        table.rows[cx].cells[cy].setAttribute('parent', parent);
        b = true;
    }

    return b;
}


function recurBacktrackingWrapper(){
    const LENGTH = getTableLength();
    const WIDTH = getTableWidth();
    const TIMEOUT = calcCellsToWallTimeout();
    let cellList = [];
    let x;
    let y;

    disableButtons();
    disableTableModification();
    disableClickDrag();

    clearBoard();

    setCellsToWall();

    x = getRandomInt(1, LENGTH - 1);
    y = getRandomInt(1, WIDTH - 1);

    if (isEven(x))
        x--;

    if (isEven(y))
        y--;
    
    setTimeout(() => {
       recursiveBacktracking(0, 0, x, y, cellList);
       runVisualization(cellList, "s4");
    }, TIMEOUT);
}


function recursiveBacktracking(startx, starty, x, y, list){
    if (x == startx && y == starty)
    {
        let cell = generateCid(x, y);
        list.push({ cid: cell, action: "resetClassName"});
        return;
    }
    
    if (startx == 0 && starty == 0)
    {
        startx = x;
        starty = y;
    }

    let nx;
    let ny;
    let neighbors;
    let currentCell = generateCid(x, y);

    markCellVisited(x, y);
    list.push({ cid: currentCell, action: "markExplored" });

    neighbors = getNeighbors(x, y);
    
    if (neighbors.length == 0)
    {
        let parent = getParent(currentCell);
        
        let tokens = parent.split("-");
        let px = parseInt(tokens[0]);
        let py = parseInt(tokens[1]);

        let edge;

        list.push({cid: currentCell, action: "resetClassName"});

        if (px != x)
            edge = (px > x) ? generateCid(x + 1, y) : generateCid(x - 1, y);
        
        if (py != y)
            edge = (py > y) ? generateCid(x, y + 1) : generateCid(x, y - 1);
   
        list.push({ cid: edge, action: "resetClassName" });

        nx = px;
        ny = py;
    }

    else
    {
        let edge;
        let rand = getRandomInt(0, neighbors.length);
        let newCell = neighbors[rand];

        let tokens = newCell.split("-");
        nx = parseInt(tokens[0]);
        ny = parseInt(tokens[1]);

        if (!setParent(newCell, currentCell))
            throw (error("parent error"));
        
        if (nx != x)
            edge = (nx > x) ? generateCid(x + 1, y) : generateCid(x - 1, y);

        if (ny != y)
            edge = (ny > y) ? generateCid(x, y + 1) : generateCid(x, y - 1);

        list.push({cid: edge, action: "markExplored"});

    }
    recursiveBacktracking(startx, starty, nx, ny, list);
}