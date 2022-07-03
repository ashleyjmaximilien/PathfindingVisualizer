function generateNodes(){
    let table = document.getElementById("table");
    const WIDTH = getTableWidth();
    const LENGTH = getTableLength();
    let map = {};

    for (let i = 0; i < LENGTH; i++)
        for (let j = 0; j < WIDTH; j++)
        {
            let type = (isPassage(i, j)) ? Type.Passage : Type.Wall;
            let id = table.rows[i].cells[j].id

            let cell = new Cell(i, j, id, type);
            map[id] = cell;
        }

     for (const key in map) {
        if (Object.hasOwnProperty.call(map, key)) {
            const element = map[key];

            let neighbors = getCellNeighbors(key);
    
            neighbors.forEach(element => {
                map[key].addNeighbor(map[element]);
            });
        }
    }
    
    return map;
}


function getCellNeighbors(cellId){
    let tokens = cellId.split("-");
    let r = parseInt(tokens[0]);
    let c = parseFloat(tokens[1]);

    const TOP = r - 1;
    const RIGHT = c + 1;
    const BOTTOM = r + 1;
    const LEFT = c - 1;
    let list = [];

    if (!isPassage(r, c))
        return list;

    //top
    if (isWithinRange(TOP, c) && isPassage(TOP, c))
    {
        let id = TOP.toString() + "-" + c.toString();
        list.push(id);
    }
 
    //right
    if (isWithinRange(r, RIGHT) && isPassage(r, RIGHT))
    {
        let id = r.toString() + "-" + RIGHT.toString();
        list.push(id);
    }
    
    //bottom
    if (isWithinRange(BOTTOM, c) && isPassage(BOTTOM, c))
    {
        let id = BOTTOM.toString() + "-" + c.toString();
        list.push(id);
    }
    
    //left
    if (isWithinRange(r, LEFT) && isPassage(r, LEFT))
    {
        let id = r.toString() + "-" + LEFT.toString();
        list.push(id);
    }

    return list; 
}