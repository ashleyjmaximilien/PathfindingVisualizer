function calcLSLVTimeout(rowStep, colStep, wallLen, midpoint){
    const LENGTH = getTableLength();
    const WIDTH = getTableWidth();
    let timeout = 20;
    const TIMEOUT_INC = 20;

    for (let i = 0; i < LENGTH; i += rowStep)
        for (let j = 0; j < WIDTH; j += colStep)
        {
            timeout += TIMEOUT_INC;
            for (let k = 0; k < wallLen; k++)
                if (isWithinRange(i + k, j))
                    timeout += TIMEOUT_INC;
        }

    for (let i = midpoint; i < wallLen * 2; i++)
        for (let j = colStep / 2; j < WIDTH; j += colStep)
            timeout += TIMEOUT_INC / 4;

    return timeout;

}


/*  Builds a maze with walls of long staggered vertical lines 
 *
 *  Patterns follows the same design as described for buildSslv
 *  but the walls are longer
 */
function buildLslv(){
    const LENGTH = getTableLength();
    const WIDTH = getTableWidth();
    let TIMEOUT_INC = 20;
    let timeout = 20;

    /*  The decimal in the following line of code is a percentage to
     *  control the length of walls. A good length for a line is about
     *  40% of the maze's rows. Can use smaller decimal values 
     *  for shorter lines.
     *  
     *  Most values over .45 tend to make the entire column a wall, making
     *  a staggered pattern impossible.
     */
    let wallLen = Math.ceil(LENGTH * .4);

    // Ensures wall length is odd for a perfect midpoint
    if (isEven(wallLen))
        wallLen++;

    /*  Midpoint represents the middle of a primary line aka
     *  The point at which the offset secondary lines should start
     */
    const MIDPOINT = Math.ceil(wallLen / 2) - 1;

    const PASSAGE_LEN = LENGTH - wallLen * 2;
    const ROW_STEP = wallLen + PASSAGE_LEN + 1;
    const COL_STEP = 8;

    const WAIT = calcLSLVTimeout(ROW_STEP, COL_STEP, wallLen, MIDPOINT);

    disableButtons();
    disableTableModification();
    disableClickDrag();
    clearBoard();
    // Build primary set of walls
    for (let i = 0; i < LENGTH; i += ROW_STEP)
        for (let j = 0; j < WIDTH; j += COL_STEP)
        {
            setTimeout(() => { setWall(i, j)}, timeout);
            timeout += TIMEOUT_INC;

            /* The remaining wall cells are added using this loop
             * since the length of the lines is dependent on browser
             * width. 
             */
            for (let k = 0; k < wallLen; k++)
                if (i + k < LENGTH)
                {    
                    setTimeout(() => { setWall(i + k, j); }, timeout);
                    timeout += TIMEOUT_INC;
                }
        }
    
    /*  Builds secondary (offset) set of walls
     *  j starts at COL_STEP / 2 to ensure that secondary lines
     *  are positioned halfway between primary lines
     */
    for (let i = MIDPOINT; i < 2 * wallLen; i++)
        for (let j = COL_STEP / 2; j < WIDTH; j += COL_STEP)
        {
            if (isWithinRange(i, j)) 
            {
                setTimeout(() => { setWall(i, j); }, timeout);
                timeout += TIMEOUT_INC / 4;
            }
        }

    setTimeout(() => {
        enableButtons();
        enableTableModification();
        enableClickDrag();
    }, WAIT);

}