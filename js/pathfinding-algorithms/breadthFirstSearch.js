function breadthFirstSearch(start, target){

    let list = [];
    let queue = [];
    
    start.explored = true;
    list.push({cid:start.id, action: "markCellPFExplored"});

    queue.push(start);

    while (queue.length > 0)
    {
        let node = queue.shift();
        
        if (node.id === target.id)
        {
            return list;
        }

        let neighbors = node.neighbors;

        neighbors.forEach(element => {

            if (!element.explored)
            {
                element.parent = node;
                element.explored = true;
                list.push({cid:element.id, action: "markCellPFExplored"});
                queue.push(element);
            }
        });
    }

    return list;
}