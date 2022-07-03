function generateEdgeList(){
    const LENGTH = getTableLength();
    const WIDTH = getTableWidth(); 
    let list = [];

    for (let i = 1; i < LENGTH - 1; i++)
        for (let j = 1; j < WIDTH - 1; j++)
        {
            if ( (!isEven(i) && isEven(j)) || (isEven(i) && !isEven(j)) ) // XOR
            {
                let cid = i.toString() + "-" + j.toString();
                list.push(cid);
            }
        }
return list;
}


function generateDisjoinSet(list){
    let table = document.getElementById("table");
    let set = disjointSet();

    for (let i = 0; i < list.length; i++)
    {
        let endpoints = getEndPoints(list[i]);
        
        let p1 = {cid: endpoints[0]};
        let p2 = {cid: endpoints[1]};

        set.add(p1);
        set.add(p2);
    }

return set;
}


function getEndPoints(cid) {
    let endPoints = [];
    let tokens = cid.split("-");
    const ROW = parseInt(tokens[0]);
    const COL = parseInt(tokens[1]);
    const TOP = ROW - 1;
    const BOTTOM = ROW + 1;
    const LEFT = COL - 1;
    const RIGHT = COL + 1;

    if (isWithinRange(TOP, COL) && isPassage(TOP, COL))
    {
        let point = TOP.toString() + "-" + COL.toString();
        endPoints.push(point);
    }

        
    if (isWithinRange(BOTTOM, COL) && isPassage(BOTTOM, COL))
    {
        let point = BOTTOM.toString() + "-" + COL.toString();
        endPoints.push(point);
    }

        
    if (isWithinRange(ROW, LEFT) && isPassage(ROW, LEFT))
    {    
        let point = ROW.toString() + "-" + LEFT.toString();
        endPoints.push(point); 
    }    

    if (isWithinRange(ROW, RIGHT) && isPassage(ROW, RIGHT))
    {
        let point = ROW.toString() + "-" + RIGHT.toString();
        endPoints.push(point);
    }
    
return endPoints;  
}


function kruskalsWrapper(){
    let timeout = calcCellsToWallTimeout();
    let cellList;
    
    disableButtons();
    disableTableModification();
    disableClickDrag();
    clearBoard();
    setCellsToWall();
   
    setTimeout(() => {
        setOpenCells();
    }, timeout);

    let p = new Promise(function(resolve, reject){
        setTimeout(() => {
            cellList = kruskals();
            if (cellList.length > 0)
                resolve();
        }, timeout * 1.5);    
    });

    p.then(
        function(val) {runVisualization(cellList, "s2");}
    );
}


function kruskals(){
    let edges = generateEdgeList();
    let set = generateDisjoinSet(edges);
    let list = [];

    while (edges.length > 0)
    {
        // Randomly select an edge
        let rand = getRandomInt(0, edges.length);
        let edge = edges[rand];
        
        // Get end points of edge
        let endPoints = getEndPoints(edge);
        let cid1 = endPoints[0];
        let cid2 = endPoints[1];
        
        // Get the corresponding set element from disjoint set
        let p1 = set.getElement(cid1);
        let p2 = set.getElement(cid2);

        if (!set.connected(p1, p2))
        {
            // unify the end points' sets
            set.union(p1, p2);
            // add edge to list
            list.push({cid: edge, action: "resetClassName"});
        }

        // remove the edge
        edges = arrayRemove(edges, edge);
    }
    return list;
}
