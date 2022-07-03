function depthFirstSearch(start, target){
    
    let list = [];
    let stack = [];

    stack.push(start);

    while (stack.length > 0)
    {
        let node = stack.shift();

        if (node.id === target.id)
        {
            node.explored = true;
            
            list.push({cid:node.id, action: "markCellPFExplored"});
            return list;
        }
    
        if (!node.explored)
        {
            node.explored = true;
            list.push({cid:node.id, action: "markCellPFExplored"});

            let neighbors = node.neighbors;

            neighbors.forEach(element => {
                if (!element.parent)
                    element.parent = node;
                stack.unshift(element);
            });
        }
    }
    return list;
}