function makeSetObject(row, col){
    let obj = {cid: generateCid(row, col)};
    return obj;
}


function ellersLastRow(set, setIds, setSizes, row, list){
    // Randomly connect cells in row
    makeHorizontalConnections(set, row, list);

    // Randomly connect cells to above row
    generateRowSets(set, setIds, setSizes, row);
    makeVerticalConnections(set, setIds, setSizes, row, list);

    // Remove potential isolations along last two rows
    resolveIsolations(set, (getTableLength() - 4), list);
    resolveIsolations(set, (getTableLength() - 2), list)
}


function addRowToSet(set, row){
    const LASTCOL = getTableWidth() - 2;
    
    for (let j = 1; j <= LASTCOL; j += 2)
    {
        let cellId = generateCid(row, j);

        if (!set.exists(cellId))
        {
            let obj = makeSetObject(row, j);
            set.add(obj);
        }       
    }
}


function makeHorizontalConnections(set, row, list){
    const LASTCOL = getTableWidth() - 2;

    for (let j = 2; j <= LASTCOL; j += 2)
    {
        if (getRandomInt(0, 2))
        { 
            // get endpoints of edge p1, p2
            let endPoints = getEndPoints(generateCid(row, j));
            let p1 = set.getElement(endPoints[0]);
            let p2 = set.getElement(endPoints[1]);
    
            if (!set.connected(p1, p2))
            {
                set.union(p1, p2);
                list.push({cid: generateCid(row, j), action: "resetClassName"})
            }

            let obj = makeSetObject(row, j);
            set.add(obj);
            set.union(p1, obj);
        }
    }
}


function generateRowSets(set, setIds, setSizes, row){
    const LASTCOL = getTableWidth() - 2;

    for (let j = 1; j <= LASTCOL; j += 1)
    {
        if (isPassage(row, j))
        {
            let element = set.getElement(generateCid(row, j));
            let id = set.find(element);
            if (!setIds.includes(id))
            {    
                setIds.push(id);
                setSizes.push(1);
            }
            else
                setSizes[setSizes.length - 1]++;
        }
    }
}


function resolveIsolations(set, row, list){
    const LASTCOL = getTableWidth() - 2;
    
    for (let j = 1; j <= LASTCOL; j += 1)
    {
        if (!isPassage(row, j))
        {
            let leftCell = generateCid(row, j - 1);
            let rightCell = generateCid(row, j + 1);

            let p1 = set.getElement(leftCell);
            let p2 = set.getElement(rightCell);

            if (!set.connected(p1, p2))
            {
                set.union(p1, p2);

                list.push({cid: generateCid(row, j), action: "resetClassName"})

                let obj = makeSetObject(row, j);
                set.add(obj);
                set.union(p1, obj);
            }
        }
    }
}


function makeVerticalConnections(set, setIds, setSizes, row, list){
    const LASTROW = getTableLength() - 2;
    const LASTCOL = getTableWidth() - 2;
    
    //ensure each set has 1 vertical connection
    for (let setNum = 0; setNum < setIds.length; setNum++)
    {
        for (let j = 1; j <= LASTCOL; j += 2)
        {
            let element = set.getElement(generateCid(row, j));

            if (set.find(element) == setIds[setNum])
            {
                let rand = getRandomInt(0, setSizes[setNum]);

                if (isEven(rand + j))
                    rand--;

                let cid = (row == LASTROW) ? generateCid(row - 1, j + rand) : generateCid(row + 1, j + rand);

                let endPoints = getEndPoints(cid);
                let p1 = set.getElement(endPoints[0]);
                let p2 = set.getElement(endPoints[1]);
                    
                if (!set.exists(cid) || !set.connected(p1, p2))
                {
                    set.union(p1, p2);

                    list.push({cid: cid, action: "resetClassName"})
                    
                    if (row != LASTROW)
                        list.push({cid: generateCid(row + 2, j + rand), action: "resetClassName"});

                    let obj = {cid: cid};
                    set.add(obj);
                    set.union(p1, obj);            
                }
                   
                break;
            }
        }
    }

    // Make random additional connections
    for (let j = 1; j <= LASTCOL; j += 2)
    {   
        if (getRandomInt(0, 2))
        { 
            // if the current row is the last row, the vertical connection is one row above
            // otherwise, the vertical connection is one row below
            let cid = (row == LASTROW) ? generateCid(row - 1, j) : generateCid(row + 1, j);
        
            let endPoints = getEndPoints(cid);
            let p1 = set.getElement(endPoints[0]);
            let p2 = set.getElement(endPoints[1]);
                
            if (!set.connected(p1, p2))
            {
                set.union(p1, p2);
                list.push({cid: cid, action: "resetClassName"});             
            }
        }
    }
}


function ellersWrapper(){
    const TIMEOUT = calcLatticeTimeout(15, 40);
    let cellList;

    disableTableModification();
    disableButtons();
    disableClickDrag();
    clearBoard();
    setWallLattice();

    let p = new Promise(function(resolve, reject){
        setTimeout(() => {

           cellList = ellers();
           
           if (cellList.length > 0)
                resolve(); 
        }, TIMEOUT);
    });

    p.then(
        function(val) {runVisualization(cellList, "s2");}
    );
}


function ellers(){
    const LASTROW = getTableLength() - 2;
    let set = disjointSet();
    let list = [];
    let setIds = [];
    let setSizes = [];

    for (let i = 1; i <= LASTROW; i += 2)
    {
        addRowToSet(set, i);

        if (i == LASTROW)
                ellersLastRow(set, setIds, setSizes, i, list);
        else
        {
            makeHorizontalConnections(set, i, list);

            // Populates setIds and setSizes arrays needed for makeVerticalConnections
            generateRowSets(set, setIds, setSizes, i);

            // the second to last row should not make any vertical connections, as
            // the last row will make any needed connections upward
            if (i < LASTROW - 2)
                makeVerticalConnections(set, setIds, setSizes, i, list);
            else
                continue;
        }

    }
    return list;
}