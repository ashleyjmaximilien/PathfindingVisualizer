// Chooses orientation for adding walls in recursive division
function chooseOrientation(width, length) {
    if (width > length)
        return "VERTICAL";

    else if (length > width)
        return "HORIZONTAL";

    else
        return (getRandomInt(0, 2) == 0 ? "HORIZONTAL" : "VERTICAL");
}


function setProtectedCell(x, y){
    if (isWithinRange(x, y));
        table.rows[y].cells[x].classList.add("protected");
   
}


function isProtected(x, y){
    const WIDTH = getTableWidth();
    const LENGTH = getTableLength();
    let bool;

    if (x > 0 && x < WIDTH && y > 0 && y < LENGTH)
        bool = (table.rows[y].cells[x].classList.contains("protected")) ? true : false;

    return bool;
}


function recurDivisionWrapper(){
    const LENGTH = getTableLength();
    const WIDTH = getTableWidth();
    const TIMEOUT = calcWallBorderTimeout();
    let cellList = [];

    disableButtons();
    disableTableModification();
    disableClickDrag();
    clearBoard();
    setWallBorder();

    let p = new Promise(function(resolve, reject) {
        setTimeout(() => {
            recursiveDivision(0, table, 1, 1, WIDTH - 2, LENGTH - 2, chooseOrientation(WIDTH, LENGTH), cellList);

            if (cellList.length > 0)
                resolve("ok");
            else
                reject();
                
        }, TIMEOUT);
    });

    p.then(
        function(val) {
            runVisualization(cellList, "s4");
        }
    );
}


function recursiveDivision(count, table, x, y, width, length, orientation, cellList) {
    // Base case: If subsection is a corridor of width or length 1
    if (width < 2 || length < 2)
        return cellList;

    else
    {
        // Determine orientation to divide subsection
        let isHorizontal = orientation == "HORIZONTAL";
        
        //Determine orientation for special case subsections
        if (width == 3 && length == 3)
        {
            if (isHorizontal)
            {
                if (isProtected(x, y + 1) && isProtected(x + 2, y + 1))
                    isHorizontal = false;
            }
            
            else
            {
                if (isProtected(x + 1, y) && isProtected(x + 1, y + 2))
                        isHorizontal = true;
            }
        }
        
        // Determine position of the new wall
        let wallx = x + (isHorizontal ? 0 : getRandomInt(0, width));
        let wally = y + (isHorizontal ? getRandomInt(0, length) : 0);

        // Determine position of new wall for 3x3 subsections
        if (width == 3 && length == 3)
        {
            if (isHorizontal)
            {
                wallx = x;
                wally = y + 1;
            }

            else
            {
                wallx = x + 1;
                wally = y;
            }
        }

        // Ensure wall is drawn on even rows/columns
        if (!isHorizontal && !isEven(wallx))
        {  
            // find boundary of subsection
            let boundary = x + width - 1;
            (wallx == boundary) ? (wallx--) : (wallx++);
        }

        if (isHorizontal && !isEven(wally))
        {
            let boundary = y + length - 1;
            (wally == boundary) ? (wally--) : (wally++);
        }

        //Determine position of passage
        let passx = wallx + (isHorizontal ? getRandomInt(0, width - 1) : 0);
        let passy = wally + (isHorizontal ? 0 : getRandomInt(0, length - 1));

        if (isHorizontal)
        {
            for (let i = x; i < x + width; i++)
            {
                if (isProtected(i, wally))
                {
                    passx = i;
                    passy = wally;
                    break;
                }
            }
        }

        else if (!isHorizontal)
        {
            for (let i = y; i < y + length; i++)
            {
                if  (isProtected(wallx, i))
                {
                    passx = wallx;
                    passy = i;
                    break;
                }
            }

        }

        // Determines position of passage for special cases
        if (width == 3 && length == 3)
        {
            if (isHorizontal)
            {
                if (isProtected(x, y + 1))
                {
                    passx = x;
                    passy = y + 1;
                }

                else if (isProtected(x + 2, y + 1))
                {
                    passx = x + 2;
                    passy = y + 1;
                }
            }

            else //vertical
            {
                if (isProtected(x + 1, y))
                {
                    passx = x + 1;
                    passy = y;
                }

                else if (isProtected(x + 1, y + 2))
                {
                    passx = x + 1;
                    passy = y + 2;
                }
            }
        }

        // Label protected cells
        if (isHorizontal)
        {
            setProtectedCell(passx, passy - 1);
            setProtectedCell(passx, passy + 1);
        }

        else
        {
            setProtectedCell(passx - 1, passy);
            setProtectedCell(passx + 1, passy);
        }
        
        // Determine direction of the wall
        let dirx = isHorizontal ? 1 : 0;
        let diry = isHorizontal ? 0 : 1;

        // Determine length of the wall
        const wallLen = (isHorizontal ? width : length);


        // Add each cell of wall to the cell list
        for (let i = 0; i < wallLen; i++)
        {
            if ((wallx != passx || wally != passy)) 
                if (!isProtected(wallx, wally))
                {
                    let cid = wally.toString() + "-" + wallx.toString();
                    //cellList.push(cid);
                    cellList.push({cid: cid, action: "setWall"});
                }
    
            wally += diry;
            wallx += dirx; 
        }    

        // Locate boundaries for primary subsection
        let px = x;
        let py = y;
        let w = isHorizontal ? width : wallx - px;
        let l = isHorizontal ? wally - py : length;
        recursiveDivision(count, table, px, py, w, l, chooseOrientation(w, l), cellList);
      
        // Boundaries for secondary subsection
        let sx = isHorizontal ? x : wallx + 1; 
        let sy = isHorizontal ? wally + 1 : y;
        let sw = isHorizontal ? width : x + width - wallx - 1;
        let sl = isHorizontal ? y + length - wally - 1 : length;
        recursiveDivision(count, table, sx, sy, sw, sl, chooseOrientation(sw, sl), cellList);
    }
}