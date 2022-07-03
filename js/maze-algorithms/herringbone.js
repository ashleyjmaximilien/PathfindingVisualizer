function setHorizontalRoot(i, j){
    let table = document.getElementById("table");
  
    if (isWithinRange(i, j))
        table.rows[i].cells[j].classList.add("horizontalRoot");
}


function setVerticalRoot(i, j){
    let table = document.getElementById("table");

    if (isWithinRange(i, j))
        table.rows[i].cells[j].classList.add("verticalRoot");
}


function isHorizontalRoot(i, j){
    let table = document.getElementById("table");
    let b;

    if (isWithinRange(i, j))
        b = (table.rows[i].cells[j].classList.contains("horizontalRoot")) ? true : false
                
    return b;
}


function isVerticalRoot(i, j){
    let table = document.getElementById("table");
    let b;
 
    if (isWithinRange(i, j))
        b = (table.rows[i].cells[j].classList.contains("verticalRoot")) ? true : false
                
    return b;
}


function buildHerringbone(){
    const LENGTH = getTableLength();
    const WIDTH = getTableWidth();
    const HIDDENLINE = 8;
    const TIMEOUT_INC = 20;
    const WAIT = TIMEOUT_INC * LENGTH * 2;

    let timeout = 30;
    let horizTimeout = 0;
    let vertTimeout = 0;

    disableButtons();
    disableTableModification();
    disableClickDrag();
    clearBoard();

    // Builds horizontal lines across [0, 2], [2, 4], [4, 6]... diagonal
    for (let i = 0; i < LENGTH; i += 2)
    {
        for (let j = 2; j < WIDTH; j += 2)
        {
            // Isolates [0, 2], [2, 4], [4, 6]... diagonal
            if (j - i == 2)
            {
                setHorizontalRoot(i, j);

                let posOffset = j + 12;
                let negOffset = j - 12;

                while (posOffset < WIDTH)
                {
                    setHorizontalRoot(i, posOffset);
                    posOffset += 12;
                }

                while (negOffset > 0)
                {
                    setHorizontalRoot(i, negOffset);
                    negOffset -= 12;
                }

            }
        }
    }

   // Sets each cell containing horizontalRoot and the 4 cells to the right of it to walls 
    for (let i = 0; i < LENGTH; i++)
    {    for (let j = 0; j < WIDTH; j++)
        {
            if (isHorizontalRoot(i, j))
            {
                for (let extend = 0; extend < 5; extend++)
                    if (isWithinRange(i, j + extend))
                        setTimeout(() => { setWall(i, j + extend); }, horizTimeout);
            }
        }

        horizTimeout += TIMEOUT_INC;
    }

    vertTimeout += horizTimeout;

     // Adds missing set of horizontal lines that start before column 0
    for (let i = 6; i < LENGTH; i += 12)
    {
        // first row
        setTimeout(() => { setWall(i, 0); }, timeout);
        timeout += TIMEOUT_INC;

        // second row
        for (let j = 0; j < 3; j++) 
            if(isWithinRange(i + 2, j))
            {
                setTimeout(() => {setWall(i + 2, j); }, timeout);
                timeout += TIMEOUT_INC;
            }
        
        //third row
        for (let j = 0; j < 5; j++)
            if (isWithinRange(i + 4, j))
            {
                setTimeout(() => { setWall(i + 4, j); }, timeout);
                timeout += TIMEOUT_INC;
            }
    }

    timeout += 150;

     // Adds missing set of vertical lines that start before row 0
    for (let j = HIDDENLINE; j < WIDTH; j += 12)
    {
        if (isWithinRange(0, j))
        {
            setTimeout(() => { setWall(0, j); }, timeout);
            timeout += TIMEOUT_INC;
        }

        let offset = j + 2;
        
        for (let i = 0; i < 3; i++)  
            if (isWithinRange(i, offset))
            {
                setTimeout(() => { setWall(i, offset); }, timeout);
                timeout += TIMEOUT_INC;
            }        
    }

    // Builds vertical lines across [0, 0], [1, 1] , ... , [n, n] diagonal
    for (let i = 0; i < LENGTH; i += 2)
    {
        for (let j = 0; j < WIDTH; j += 2)
        {
            // Sets cells along the [0, 0] diagonal to walls
            if (i == j)
            {
                setVerticalRoot(i, j);

                // Offsets of + and - increments of 12 are used to find to starting points of the next diagonals
                let posOffset = j + 12;
                let negOffset = j - 12;

                while (posOffset < WIDTH)
                {
                    setVerticalRoot(i, posOffset);
                    posOffset += 12;
                }

                while (negOffset >= 0)
                {
                    setVerticalRoot(i, negOffset);
                    negOffset -= 12;
                }
            }
        }
    }

    // Sets each cell containing verticalRoot and the 4 cells below it to walls 
    for (let i = 0; i < LENGTH; i++)
    {   for(let j = 0; j < WIDTH; j++)
        {
            if (isVerticalRoot(i, j))
            {
                for (let extend = 0; extend < 5; extend++)
                    if (i + extend < LENGTH)
                        setTimeout(() => { setWall(i + extend, j); }, vertTimeout);
            }
        }
        vertTimeout += TIMEOUT_INC;
    }

    setTimeout(() => {
        enableButtons();
        enableTableModification();
        enableClickDrag();
    }, WAIT);
}