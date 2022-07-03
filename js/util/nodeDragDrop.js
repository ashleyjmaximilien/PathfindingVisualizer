function disableDrag(){
    let list = document.getElementsByTagName("TD");

    for (let i = 0; i < list.length; i++)
        list[i].setAttribute("ondragstart", "return false");
}


function enableDrag(){
    let list = document.getElementsByTagName("TD");

    for (let i = 0; i < list.length; i++)
        list[i].setAttribute("ondragstart", cellDrag);
}


function disableDragOver(node){
    node.removeEventListener("dragover", dragOver);
}


function enableDragOver(node){
    node.addEventListener("dragover", dragOver);
}


function cellDrag(e){   
    // do not drag if target has no children
    if (e.target.children.length == 0)
        return false;

    dragStart(e);
}


function dragStart(e){
    // only start img and target img should be dragged
    if (e.target.id != "start-node" && e.target.id != "target-node")
        return false;
    
    allowTableModification = false;
    enableDrag();

    if (e.target.parentElement.tagName == "TD")
        enableDragOver(e.target.parentElement);

    if (e.target.id == "start-node")
    {
        startId = null;

        if (e.target.parentElement.id == "start-element")
            e.target.parentElement.className = "legend-element start-empty";
    }

    if (e.target.id == "target-node")
    {
        targetId = null;

        if (e.target.parentElement.id == "target-element")
            e.target.parentElement.className = "legend-element target-empty";
    }

    e.dataTransfer.setData('text/plain', e.target.id); 
    setTimeout(() => {
        e.target.classList.add("hide");
    }, 0);
}



function dragLeave(e){
    e.preventDefault();

    // only process dragleave on TD elements ...
    if (e.target.tagName != "TD")
        return false;

    // ... with children
    if (e.target.children.length == 0)
        return false;
}


function dragOver(e){
    e.preventDefault();

    // do not dragOver on elements with class start or ...
    if (e.target.id === startId)
        return false;

    // ... class target
    if (e.target.id == targetId)
        return false;

    // extra insurance - do not dragover if target has children
    if (e.target.children.length > 0)
        return false;
}

function drop(e){
    e.preventDefault();

    // only drop if target is a TD
    if (e.target.tagName != "TD")
        return false;

    // do not drop if TD element contains the start node ...
    if (e.target.id === startId)
        return false;

    // ... or the target node
    if (e.target.id === targetId)
        return false;
    
    let nodeId = e.dataTransfer.getData('text/plain');

      // only process drop if the data contained is that of the start-node or target-node divs
    if (nodeId != "start-node" && nodeId != "target-node")
        return false;

    const node = document.getElementById(nodeId);
    node.classList.remove("hide");
    node.className = "node-box-small";

    e.target.appendChild(node);
    e.target.className = "";
    
    if (nodeId == "start-node")
        startId = e.target.id;

    if (nodeId == "target-node")
        targetId = e.target.id;
    
    allowTableModification = true;
    disableDrag();
    disableDragOver(e.target);
    e.target.setAttribute('ondragstart', dragStart);
}


// Resets information for node box divs in case of drop failure
function dragEnd(e){
    e.preventDefault();

    if (e.target.parentElement.tagName === "TD")
    {
        if (e.target.id === "start-node")
            hideStartReminder();

        if (e.target.id === "target-node")
            hideTargetReminder();
    }   

    // only process dragend if target is the start-node or target-node divs
    if (e.target.id != "start-node" && e.target.id != "target-node")
        return false;

    if (e.target.id == "start-node")
        if (!startId)
        { 
            e.target.classList.remove("hide");

            if (e.target.parentElement.tagName == "TD")
                startId = e.target.parentElement.id;

            if (e.target.parentElement.id == "start-element");
                document.getElementById("start-element").classList.remove("start-empty");

            disableDrag();
        }
    
    if (e.target.id == "target-node")
        if (!targetId)
        {
            e.target.classList.remove("hide");

            if (e.target.parentElement.tagName == "TD")
                targetId = e.target.parentElement.id;

            disableDrag();
        }

    if (startId)
        document.getElementById("start-element").classList.add("start-empty");

    if (targetId)
        document.getElementById("target-element").classList.add("target-empty");

        allowTableModification = true;
}
