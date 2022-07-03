function calculateLSLHTimeout(rowStep, colStep, wallLen, offsetLen){
    const LENGTH = getTableLength();
    const WIDTH = getTableWidth();
    const TIMEOUT_INC = 15;
    let timeout = 20;
    
    for (let i = 0; i < LENGTH; i += rowStep)
        for (let j = 0; j < WIDTH; j += colStep)
            for (let k = 0; k < wallLen; k++)
                if (isWithinRange(i, j + k))
                    timeout += TIMEOUT_INC;

    timeout += 50;

    for (let i = 0; i < LENGTH; i += rowStep)
        for(let j = 0; j < offsetLen; j++)
            timeout += TIMEOUT_INC;

    return timeout;
}


function buildLslh(){
    const LENGTH = getTableLength();
    const WIDTH = getTableWidth();
    let wallLen = Math.ceil(WIDTH * .4);

    // Ensures that wall length is odd for a perfect midpoint
    if (isEven(wallLen))
        wallLen++;

    const PASSAGE_LEN = WIDTH - wallLen * 2;
    const MIDPOINT = Math.ceil(wallLen / 2);
    const ENDPOINT = wallLen + PASSAGE_LEN + MIDPOINT;
    const ROW_STEP = 8;
    const COL_STEP = wallLen + PASSAGE_LEN + 1;
    let timeout = 20;
    const TIMEOUT_INC = 15;
    const WAIT = calculateLSLHTimeout(ROW_STEP, COL_STEP, wallLen, ENDPOINT - MIDPOINT);
    
    disableButtons();
    disableTableModification();
    disableClickDrag();
    clearBoard();
    
    // Builds primary set of walls
    for (let i = 0, row; i < LENGTH; i += ROW_STEP)
        for (let j = 0, col; j < WIDTH; j += COL_STEP)
        {
            setTimeout(() =>{ setWall(i, j); }, timeout);

            for (let k = 0; k < wallLen; k++)
                if (isWithinRange(i, j + k))
                {  
                    setTimeout(() =>{ setWall(i, j + k); }, timeout);
                    timeout += TIMEOUT_INC;
                }
        }

    timeout += 50;

    // Builds secondary (offset) set of walls
    for (let i = ROW_STEP / 2; i < LENGTH; i += ROW_STEP)
        for (let j = MIDPOINT; j < ENDPOINT; j++)
        {   
            setTimeout(() =>{ setWall(i, j); }, timeout);
            timeout += TIMEOUT_INC;
        }

    setTimeout(() => {
        enableButtons();
        enableTableModification();
        enableClickDrag();
    }, WAIT);
}