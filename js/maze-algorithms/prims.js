
function findPassageConnection(row, col){
    let cell = "false"
    const TOP = row - 2;
    const BOTTOM = row + 2;
    const LEFT = col - 2;
    const RIGHT = col + 2;
    
    //top
    if (isWithinRange(TOP, col) && isVisited(TOP, col))
        cell = (row - 1).toString() + "-" + col.toString();  

    //bottom
    else if (isWithinRange(BOTTOM, col) && isVisited(BOTTOM, col))
        cell = (row + 1).toString() + "-" + col.toString();

    //left
    else if (isWithinRange(row, LEFT) && isVisited(row, LEFT))
        cell = row.toString() + "-" + (col - 1).toString();

    //right
    else if (isWithinRange(row, RIGHT) && isVisited(row, RIGHT))
        cell = row.toString() + "-" + (col + 1).toString();

    return cell; 
}


/*  Prim's algorithm requires all cells to be walls initially.
 *  Wrapper uses a timeout to delay calling Prim's until the 
 *  setAllCellsToWall function is complete.
 */
function primsWrapper(){
    disableButtons();
    disableTableModification();
    disableClickDrag();
    clearBoard();

    const TIMEOUT = calcCellsToWallTimeout();
    setCellsToWall();
    setTimeout(() => { Prims();}, TIMEOUT);
}


function Prims(){
    const LENGTH = getTableLength();
    const WIDTH = getTableWidth();
    let pathSet = [];
    let cellList = [];
    let id;
    
    // Choose a random starting cell
    let row = getRandomInt(1, LENGTH);
    let col = getRandomInt(1, WIDTH);

    // Ensure cell row and col are odd
    if (isEven(row))
        row--;
        
    if (isEven(col))
        col--;

    // Construct cell id and add the cell to the path set
    id = row.toString() + "-" + col.toString();
    pathSet.push(id);

    while (pathSet.length > 0)
    {
        // a. choose a random cell
        let rand = getRandomInt(0, pathSet.length)
        let cid = pathSet[rand];
        let pos = cid.split('-');
        let r = parseInt(pos[0]);
        let c = parseInt(pos[1]);

        // b. find passage cell nearest to the chosen cell
        let cell = findPassageConnection(r, c);

        // c. push chosen and connection cells to the cell list and mark as visited
        if (cell == "false")
        {   
            cellList.push({cid: cid, action: "resetClassName"});
            markCellVisited(r, c);
        }
        
        else
        {
            cellList.push({cid: cell, action: "resetClassName"});
            markCellVisited(r, c);
            
            cellList.push({cid: cid, action: "resetClassName"});
            let npos = cell.split("-");
            let nr = parseInt(npos[0]);
            let nc = parseInt(npos[1]);
            markCellVisited(nr, nc);
        }

        // d. remove chosen cell from path set
        pathSet = arrayRemove(pathSet, cid);
     
        // e. add chosen cell's neighbors to path set
        let neighbors = getNeighbors(r, c);
        neighbors.forEach(element => {
            pathSet.push(element);
        });
    }

    // Draw the maze
    runVisualization(cellList, "s2");
}