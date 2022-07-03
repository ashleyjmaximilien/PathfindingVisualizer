function getAlgorithm(){
    let algorithms = document.getElementsByName("algorithm");
    let checked = "none";

    for (let i = 0; i < algorithms.length; i++)
        if (algorithms[i].checked)
            checked = algorithms[i].value;

    return checked;
}


function getSpeed(){
    let speed;
    let range = document.getElementById("speed");

    switch(parseInt(range.value))
    {
        case 1:
            speed = "s7";
            break;
        case 2:
            speed = "s6";
            break;
        case 3:
            speed = "s5";
            break;
        case 4:
            speed = "s4";
            break;
        case 5:
            speed = "s3";
            break;
        case 6:
            speed = "s2";
            break;
        case 7:
            speed = "s1"; 
            break;
    }
    return speed;  
}


function generateExploration(map, alg, start, target){
    switch (alg)
    {
        case "bfs": 
            list = breadthFirstSearch(start, target);
            break;

        case "dfs":
            list = depthFirstSearch(start, target);
            break;

        case "dijkstras":
            list = dijkstras(map, start, target);
            break;

        case "astar":
            list = aStar(start, target);
                break;

        case "greedy":
            list = greedyBestFirstSearch(start, target);
            break;
    }

    return list;
}


function generatePath(target){
    let list = [];

    let node = target;
    list.push({cid: node.id, action: "setPath"});

    while (node.parent != null)
    {
        node = node.parent;
        list.push({cid: node.id, action: "setPath"});

        if (node.id == startId)
            break;
    }

    list.reverse();
    return list;
}


function visualize(){
    if (!window.startId && !window.targetId)
    {
        displayStartReminder();
        displayTargetReminder();
        return;
    }

    else if (!window.startId)
    {
        displayStartReminder();
        return;
    }

    else if (!window.targetId)
    {
        displayTargetReminder();
        return;
    }
    
    let algorithm = getAlgorithm();
    
    if (algorithm === "none")
    {
        displayAlgorithmReminder();
        return;
    }

    cleanBoard();
    disableButtons();
    disableTableModification();
    disableClickDrag();

    let map = generateNodes();
    let start = map[window.startId];
    let target = map[window.targetId];
    let list = generateExploration(map, algorithm, start, target);
    let path = generatePath(target);
    let speed = getSpeed();

    if (path.length > 1)

        for (let i = 0; i < path.length; i++)
        {
            list.push(path[i]);
        }
    
    let wait = runVisualization(list, speed);
    
    setTimeout(() => {
        
        if (path.length <= 1)
        {
           displayNoPathPopUp(); 
        }

    }, wait + 200);
}
