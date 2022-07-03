function compare(a, b)
{
    if ( a.distance < b.distance)
        return -1;

    if (a.distance > b.distance)
        return 1;

    return 0;
}

function getTurnCost(start, end)
{
    let row = start.i;
    let col = start.j;
    let startDir = start.direction;
    let endDir;
    let opposite;
    let cost;

    let north = generateCid(row - 1, col);
    let south = generateCid(row + 1, col);
    let east = generateCid(row, col + 1);
    let west = generateCid(row, col - 1);

    if (end.id === north)
        endDir = Direction.North;

    if (end.id === south)
        endDir = Direction.South;

    if (end.id === east)
        endDir = Direction.East;

    if (end.id === west)
        endDir = Direction.West;

    let oppositeDirections = {
        North: Direction.South,
        South: Direction.North,
        East: Direction.West,
        West: Direction.East
    }

    opposite = oppositeDirections[startDir.direction];

    if (startDir == endDir)
        cost = 0;
        
    else if (endDir == opposite)
        cost = 2;

    else
        cost = 1;

    return {direction: endDir, cost: cost};
}

function dijkstras(map, start, target)
{
    let list = [];
    let queue = [];

    for (const key in map) {
        if (Object.hasOwnProperty.call(map, key)) 
        {
            const element = map[key];
            if (map[key].type = Type.Passage);
            {
                map[key].distance = Infinity;
                queue.push(map[key]);

            }
           
        }
    }

    map[start.id].direction = Direction.East;
    map[start.id].distance = 0;
  
    while (queue.length > 0)
    {
        queue.sort(compare);
        
        let node = queue.shift();

        if (node.id === target.id)
            return list;

        list.push({cid:node.id, action:"markCellPFExplored"});

        let neighbors = node.neighbors;
        
        neighbors.forEach(element => {
            let turn = getTurnCost(node, element);

            let tempDist = node.distance + 1 + turn.cost;

            if (tempDist < element.distance)
            {
                element.distance = tempDist;
                element.parent = node;
                element.direction = turn.direction;
            }

            list.push({cid:element.id, action:"markCellPFExplored"});
        });
    }

    return list;
}
