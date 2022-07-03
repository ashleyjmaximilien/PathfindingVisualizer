function find(element){
   let b = (element.id == this.id) ? true : false;
   return b; 
}

function greedyBestFirstSearch(start, target){
    let open = [];
    let closed = [];
    let list = [];

    start.direction = Direction.East;
    start.f = 0;

    open.push(start);

    while (open.length > 0)
    {
        let replace = false;

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

            let f = 1 + turn.cost;

            if (open.some(e => e.id === element.id))
                if (f >= element.f)
                    return;

                else if (f < element.f)
                    replace = true;
                    
            element.f = f;
            element.parent = node;
            element.direction = turn.direction;

            if (replace)
            {
                let index = open.findIndex(find, element);
                open.splice(index, 1);
            }
            open.push(element);
        });
    }

    return list;
}