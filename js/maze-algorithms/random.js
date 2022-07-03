/* 
 *   Pseudorandomly sets cells to walls to create a "random" maze.
 *   A random number (numWalls) is generated for each row to determine 
 *   how many walls that row will contain. numWalls corresponds to the
 *   number of cells randomly selected for each row.
 * 
*/
function buildRandom(){
    const LENGTH = getTableLength();
    const WIDTH = getTableWidth();
    let timeout = 20;
    let TIMEOUT_INC = 2;
    const WAIT = timeout + TIMEOUT_INC * LENGTH * (WIDTH / 4);

    disableButtons();
    disableTableModification();
    disableClickDrag();
    clearBoard();
    
    for (let i = 0; i < LENGTH; i++)
    {
        // how many cells should be a wall
        let numWalls = Math.floor(Math.random() * WIDTH / 2) + 1; 

        for (let j = 0; j < numWalls; j++)
        {
            // Which of the cells along this row should be a wall
            let col = Math.floor(Math.random() * WIDTH);

            // Try again if the randomly chosen cell is already a wall
            if (!isPassage(i, col))
                j--;

            else
            {   
                setTimeout(() => { setWall(i, col); } , timeout);
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