function calcSSLVTimeout(rowStep, colStep){
    const LENGTH = getTableLength();
    const WIDTH = getTableWidth();
    const TIMEOUT_INC = 15;
    let timeout = 20;

    for (let i = 0; i < LENGTH; i += rowStep)
        for (let j = 0; j < WIDTH; j += colStep)
        {
            timeout += TIMEOUT_INC;

            if (isWithinRange(i + 1, j))
                timeout += TIMEOUT_INC;

            if (isWithinRange(i + 2, j))
                timeout += TIMEOUT_INC;
        } 

    for (let i = rowStep / 2; i < LENGTH; i += rowStep)
        for (let j = colStep / 2; j < WIDTH; j += colStep)
        {
            timeout += TIMEOUT_INC;

            if (isWithinRange(i + 1, j))
                timeout += TIMEOUT_INC;
    
            if (isWithinRange(i + 2, j))
                timeout += TIMEOUT_INC;
        }

    return timeout;
}


/*  Builds a maze with walls of short staggered vertical lines
 * 
 *  Each short wall line consists of 3 cells  (3 rows x 1 column)
 *  and is neighbored by an equally sized line of passages 
 *  directly above, below, left, and right of it unless it is
 *  the edges of the table.
 * 
 *  Example: | = wall cell, whitespace = passage cell
 * 
 * |          |         <- primary set
 * |          |
 * |          |
 *      |           |
 *      |           |         <- secondary set (note: offset by 3 rows and 2 columns)
 *      |           | 
 * |          |  
 * |          |        <- primary set   
 * |          |
 *  
 */  

function buildSslv(){
    const LENGTH = getTableLength();
    const WIDTH = getTableWidth();
    const ROW_STEP = 6; 
    const COL_STEP = 4;
    let timeout = 20;
    let TIMEOUT_INC = 15;
    const WAIT =  calcSSLVTimeout(ROW_STEP, COL_STEP);
    
    disableButtons();
    disableTableModification();
    disableClickDrag();
    clearBoard();

    // Builds primary set of walls
    for (let i = 0; i < LENGTH; i += ROW_STEP)
        for (let j = 0; j < WIDTH; j += COL_STEP)
        {
            setTimeout(() => { setWall(i, j);}, timeout);
            timeout += TIMEOUT_INC;

            // The next two rows are not visited by the loop so the
            // corresponding walls should be added if there is space 
            if (isWithinRange(i + 1, j))
            {
                setTimeout(() => { setWall(i + 1, j); }, timeout);
                timeout += TIMEOUT_INC;
            }

            if (isWithinRange(i + 2, j))
            {
                setTimeout(() => { setWall(i + 2, j); }, timeout);
                timeout += TIMEOUT_INC;
            }
        } 
    
    // Builds secondary (offset) set of walls
    for (let i = ROW_STEP / 2; i < LENGTH; i += ROW_STEP)
        for (let j = COL_STEP / 2; j < WIDTH; j += COL_STEP)
        {
            setTimeout(() => { setWall(i, j); }, timeout);
            timeout += TIMEOUT_INC;

            // Same as above. The loop skils over the needed rows
            // so they are added here if there is space
            if (isWithinRange(i + 1, j))
            {
                setTimeout(() => { setWall(i + 1, j); }, timeout);
                timeout += TIMEOUT_INC;
            }

            if (isWithinRange(i + 2, j))
            {
                setTimeout(() => { setWall(i + 2, j); }, timeout);
                timeout += TIMEOUT_INC;
            }
        }

        setTimeout(() => {
            enableButtons();
            enableTableModification();
            enableClickDrag();
        }, WAIT);
}