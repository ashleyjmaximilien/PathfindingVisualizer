function calcSSLHTimeout(rowStep, colStep){
    const LENGTH = getTableLength();
    const WIDTH = getTableWidth();
    const TIMEOUT_INC = 15;
    let timeout = 40;
    
    for (let i = 0; i < LENGTH; i += rowStep)
        for (let j = 0; j < WIDTH; j += colStep)
        {
            if (isWithinRange(i, j + 1))
                timeout += TIMEOUT_INC;
        
            if (isWithinRange(i, j + 2))
                timeout += TIMEOUT_INC;
        }

    for (let i = rowStep / 2; i < LENGTH; i += rowStep)
        for (let j = colStep / 2; j < WIDTH; j += colStep)
        {
            timeout += TIMEOUT_INC;
    
            if (isWithinRange(i, j + 1))
                timeout += TIMEOUT_INC;

            if (isWithinRange(i, j + 2))
                timeout += TIMEOUT_INC;
        }

    return timeout;
}

/*  Builds a maze with walls of short staggered horizontal lines
 * 
 *  Each short wall line consists of 3 cells  (1 rows x 3 columns)
 *  and is neighbored by an equally sized line of passages 
 *  directly above, below, left, and right of it unless it is
 *  the edges of the table.
 * 
 *  Example: / = wall cell, whitespace = passage cell
 * 
 *  / / /       / / /
 *        
 *        / / /           
 *   
 *  / / /       / / /        
 *       
 */  
function buildSslh(){
    const LENGTH = getTableLength();
    const WIDTH = getTableWidth();
    const ROW_STEP = 4;
    const COL_STEP = 6;
    const WAIT = calcSSLHTimeout(ROW_STEP, COL_STEP);
    const TIMEOUT_INC = 15;
    let timeout = 20;
    
    disableButtons();
    disableTableModification();
    disableClickDrag();
    clearBoard();

    // Builds primary set of walls
    for (let i = 0; i < LENGTH; i += ROW_STEP)
    {
        for (let j = 0; j < WIDTH; j += COL_STEP)
        {
            setTimeout(() => { setWall(i, j); }, timeout);

            // The loop increment value skips over the remaining cells
            // that should be walls. They are added manually here
            if (isWithinRange(i, j + 1))
            {    
                setTimeout(() => { setWall(i , j + 1); }, timeout);
                timeout += TIMEOUT_INC;
            }

            if (isWithinRange(i, j + 2))
            {    
                setTimeout(() => { setWall(i, j + 2); }, timeout);
                timeout += TIMEOUT_INC;
            }
        }
    }

    timeout += 20;

    // Builds secondary (offset) set of walls
    for (let i = ROW_STEP / 2; i < LENGTH; i += ROW_STEP)
    {
        for (let j = COL_STEP / 2; j < WIDTH; j += COL_STEP)
        {
            setTimeout(() => { setWall(i, j); }, timeout);
            timeout += TIMEOUT_INC;
        
            // Same as above: Loops increment skips over cells
            // so they are added here
            if (isWithinRange(i, j + 1))
            {
                setTimeout(() => { setWall(i, j + 1); }, timeout);
                timeout += TIMEOUT_INC;
            }

            if (isWithinRange(i, j + 2))
            {
                setTimeout(() => { setWall(i, j + 2); }, timeout);
                timeout += TIMEOUT_INC;
            }
        }
    }

    setTimeout(() => {
        enableButtons();
        enableTableModification();
        enableClickDrag();
    }, WAIT);
}