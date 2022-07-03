function aStarCompare(a, b){
    if (a.f < b.f)
        return -1;
    
    if (a.f > b.f)
        return 1;

    return 0;
}

function heuristic(start, target)
{
    let sr = start.i;
    let sc = start.j;

    let tr = target.i;
    let tc = target.j;

    return Math.abs(sr - tr) + Math.abs(sc - tc);
}

function aStar(start, target){

    let open = [];
    let closed = [];
    let list = [];

    start.direction = Direction.East;
    start.g = 0;
    open.push(start);

    while (open.length > 0)
    {
        
        open.sort(aStarCompare);
        
        let node = open.shift();

        closed.push(node);

        list.push({cid: node.id, action: "markCellPFExplored"});

        if (node.id === target.id)
            return list;

        let neighbors = node.neighbors;

        neighbors.forEach(element => {

            if (closed.some(e => e.id === element.id))
                return;

            let turn = getTurnCost(node, element);

            let g = node.g + 1 + turn.cost;
            let h = heuristic(element, target);
            let f = g + h;

            if (open.some(e => e.id === element.id))
                if (g >= element.g)
                    return;
              
            element.g = g;
            element.h = h;
            element.f = f;
            element.parent = node;
            element.direction = turn.direction;

            open.push(element);
        });
    }
    return list;
}