function enableButtons(){
    for (let i = 0; i < window.buttons.length; i++)
        window.buttons[i].disabled = false;
}


function disableButtons(){
    for (let i = 0; i < window.buttons.length; i++)
        window.buttons[i].disabled = true;
}


function enableClickDrag(){
    let start = document.getElementById("start-node");
    let target = document.getElementById("target-node");

    start.setAttribute("draggable", "true");
    target.setAttribute("draggable", "true");

    start.addEventListener("dragstart", dragStart);
    target.addEventListener("dragstart", dragStart);
}


function disableClickDrag(){
    let start = document.getElementById("start-node");
    let target = document.getElementById("target-node");

    start.setAttribute("draggable", "false");
    target.setAttribute("draggable", "false");

    start.removeEventListener("dragstart", dragStart);
    target.removeEventListener("dragstart", dragStart);

}


function enableTableModification(){
    window.allowTableModification = true;
}


function disableTableModification(){
    window.allowTableModification = false;
}


function displayAlgorithmReminder(){
    introJs().showHint(2);
}


function hideAlgorithmReminder(){
    introJs().hideHint(2);
}


function displayStartReminder(){
    introJs().showHint(0);
}


function hideStartReminder(){
    introJs().hideHint(0);
}


function displayTargetReminder(){
    introJs().showHint(1);
}


function hideTargetReminder(){
    introJs().hideHint(0);
}


function displayNoPathPopUp(){
    introJs().setOptions({
        showBullets: false,
        steps:
        [
            {
                title: 'Oh no!',
                intro: "It seems there is no possible path between the chosen start and target locations."
            }
            
        ]
    }).start();
}


function getTimeout(speed){
    let speeds = {
        s1: 1,
        s2: 5,
        s3: 10,
        s4: 15,
        s5: 20,
        s6: 40,
        s7: 80
    }
    return speeds[speed];
}


function runVisualization(list, speed){
    let timeout = 20;
    const TIMEOUT_INC = getTimeout(speed);
    const WAIT = 50 + timeout + TIMEOUT_INC * list.length;

    for (let i = 0; i < list.length; i++)
    {
        setTimeout(() => {
            let cell = list[i].cid;
            let tokens = cell.split("-");
            let r = parseInt(tokens[0]);
            let c = parseInt(tokens[1]);

            switch (list[i].action)
            {
                case "markExplored": 
                    markCellExplored(r, c);
                    break;

                case "markCellPFExplored":
                    markCellPFExplored(r, c);
                    break;
            
                case "resetClassName":
                    resetClassName(r, c);
                    break;
                
                case "setWall":
                    setWall(r, c);
                    break;

                case "setPath":
                    setPath(r, c);
                    break;
            }
        }, timeout);
        
        timeout += TIMEOUT_INC;
    }
    
    setTimeout(() => {
        enableButtons();
        enableTableModification();
        enableClickDrag();
    }, WAIT + 200);

return WAIT + 200;
}


function setOpenCells(){
    const LENGTH = getTableLength();
    const WIDTH = getTableWidth();
    let timeout = 20;

    for (let i = WIDTH - 1; i > 0; i--)
    {
        for (let j = LENGTH; j > 0; j--)
        {
            if (!isEven(i) & !isEven(j))
            {
                setTimeout(() => {
                   removeWall(j, i); 
                }, timeout); 
            } 
        }
        timeout += 20;
    }
}


function setCellsToWall(){
    const LENGTH = getTableLength();
    const WIDTH = getTableWidth();
    let timeout = 15;
    const TIMEOUT_INC = 40;

    for (let j = 0; j < WIDTH; j++)
    {
        for (let i = 0; i < LENGTH; i+= 2)
            setTimeout(() => { setWall(i, j);  }, timeout);

        timeout += TIMEOUT_INC;
    }

    for (let j = WIDTH; j >= 0; j--)
    {
        for (let i = 1; i < LENGTH; i+= 2)
            setTimeout(() => { setWall(i, j);  }, timeout);

        timeout += TIMEOUT_INC;
    }
}

function calcCellsToWallTimeout(){
    return (15 + (getTableWidth() * 40) * 2); 
}

function setWallBorder(){
    clearBoard();

    const LENGTH = getTableLength();
    const WIDTH = getTableWidth();
    let timeout = 10;
    let TIMEOUT_INC = 15;

    for (let i = 0; i < LENGTH; i++)
    {
        setTimeout(() => { setWall(i, 0); }, timeout);

        timeout += TIMEOUT_INC;

        setTimeout(() => { setWall(i, WIDTH - 1) }, timeout);

        timeout += TIMEOUT_INC;
    }

    for (let j = 0; j < WIDTH; j++)
    {
        setTimeout(() => { setWall(0, j); }, timeout);

        timeout += TIMEOUT_INC;

        setTimeout(() => { setWall(LENGTH - 1, j); }, timeout);

        timeout += TIMEOUT_INC;
    }
}

// Calculates the animation time needed to set first and last columns and rows of the table to walls
function calcWallBorderTimeout(){
    let timeout = 10;
    const TIMEOUT_INC = 15;
    const LENGTH = getTableLength();
    const WIDTH = getTableWidth();

    let lengthTime = timeout + TIMEOUT_INC * LENGTH * 2;
    return lengthTime + TIMEOUT_INC * WIDTH * 2;
}


function setVerticalLines(timeout, timeoutInc)
{
    const LENGTH = getTableLength();
    const WIDTH = getTableWidth();

    let t = timeout;

    for (let i = 0; i < LENGTH; i++)
    {
        for (let j = 0; j < WIDTH; j += 2)
            setTimeout(() => { setWall(i, j); }, t);
    
        t += timeoutInc;
    }

}

function calcVerticalLinesTimeout(timeout, timeoutInc){
    return timeout + timeoutInc * getTableLength();
}

function setHorizontalLines(timeout, timeoutInc){
    const LENGTH = getTableLength();
    const WIDTH = getTableWidth();

    let t = timeout;

    for (let j = 0; j < WIDTH; j++)
    {
        for (let i = 0; i < LENGTH; i += 2)
            setTimeout(() => { setWall(i, j);  }, t);

        t += timeoutInc;
    }
}


function calcHorizontalLinesTimeout(timeout, timeoutInc){
    return  timeout + timeoutInc * getTableWidth();
}

function setWallLattice(){
    const TIMEOUT = 15;
    const TIMEOUT_INC = 40;
    const WAIT = calcVerticalLinesTimeout(TIMEOUT, TIMEOUT_INC); 

    setVerticalLines(TIMEOUT, TIMEOUT_INC);
    
    setTimeout(() => {
        setHorizontalLines(TIMEOUT, TIMEOUT_INC);
    }, WAIT);
}

function calcLatticeTimeout(timeout, timeoutInc){
    let a = calcVerticalLinesTimeout(timeout, timeoutInc);
    let b = calcHorizontalLinesTimeout(timeout, timeoutInc);

    return a + b;
}

