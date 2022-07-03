/* 
 *   Generates a pixelated damask pattern based on the
 *   classic wallpaper design.
 * 
 *   The pattern is constructed by a repeating 8 by 10
 *   collection of cells. Instead of iterating through
 *   all n x m cells of the table, the pattern is built
 *   by visiting the cell of every 8th row and 10th 
 *   column and building the parts from that location.
 * 
 */

function buildDamask(){
    const LENGTH = getTableLength();
    const WIDTH = getTableWidth();
    const ROW_STEP = 8;
    const COL_STEP = 10;

    disableTableModification();
    disableButtons();
    disableClickDrag();
    clearBoard();
    
    // Builds middle peak
    for (let i = 0; i < LENGTH; i += ROW_STEP)
        for (let j = 0; j < WIDTH; j += COL_STEP)
        {
            if (isWithinRange(i, j + 4)) // top
                setWall(i, j + 4);

            if (isWithinRange(i + 1, j + 4)) // bottom
                setWall(i + 1, j + 4); 
        }
        
    // Builds center top left corner
    for (let i = 0; i < LENGTH; i += ROW_STEP)
        for (let j = 0; j < WIDTH; j += COL_STEP)
        {
            if (isWithinRange(i + 1, j + 3)) // top branch
                setWall(i + 1, j + 3); 

            if (isWithinRange(i + 2, j + 3)) // corner root
                setWall(i + 2, j + 3); 

            if (isWithinRange(i + 2, j + 2)) // left branch
                setWall(i + 2, j + 2); 
        }

    // Builds left peak
    for (let i = 0; i < LENGTH; i += ROW_STEP)
        for (let j = 0; j < WIDTH; j += COL_STEP)
        {
            if (isWithinRange(i + 3, j + 2)) // right 
                setWall(i + 3, j + 2);  
    
            if (isWithinRange(i + 3, j + 1)) // left
                setWall(i + 3, j + 1);  
        }

    // Builds center bottom left corner
    for (let i = 0; i < LENGTH; i += ROW_STEP)
        for (let j = 0; j < WIDTH; j += COL_STEP)
        {            
            if (isWithinRange(i + 4, j + 2)) // left branch
                setWall(i + 4, j + 2);    
           
            if (isWithinRange(i + 4, j + 3)) // corner root
                setWall(i + 4, j + 3);  

            if (isWithinRange(i + 5, j + 3)) // bottom branch   
                setWall(i + 5, j + 3);     
        }

    // Builds bottom peak
    for (let i = 0; i < LENGTH; i += ROW_STEP)
        for (let j = 0; j < WIDTH; j += COL_STEP)
        {
            if (isWithinRange(i + 5, j + 4)) // top
                setWall(i + 5, j + 4);  
            
            if (isWithinRange(i + 6, j + 4)) // bottom
                setWall(i + 6, j + 4);  
        }

    // Builds center bottom right corner
    for (let i = 0; i < LENGTH; i += ROW_STEP)
        for (let j = 0; j < WIDTH; j += COL_STEP)
        {
            if (isWithinRange(i + 5, j + 5))
                setWall(i + 5, j + 5);  // bottom branch

            if (isWithinRange(i + 4, j + 5)) // corner root  
                setWall(i + 4, j + 5);  

            if (isWithinRange(i + 4, j + 6)) // right branch
                setWall(i + 4, j + 6);  
        }
    
    //Builds top left corner
    for (let i = 0; i < LENGTH; i += ROW_STEP)
        for (let j = 0; j < WIDTH; j += COL_STEP)
        {
            setWall(i, j); 

            if (isWithinRange(i, j + 1)) // right branch
                setWall(i, j + 1); 

            if (isWithinRange(i + 1, j)) // bottom branch
                setWall(i + 1, j); 
        }


    // Builds top right corner
    for (let i = 0; i < LENGTH; i += ROW_STEP)
        for (let j = 0; j < WIDTH; j += COL_STEP)
        {
            if (isWithinRange(i, j + 8)) // corner root
                setWall(i, j + 8); 
                
            if (isWithinRange(i, j + 7)) // left branch
                setWall(i, j + 7); 
                 
            if (isWithinRange(i + 1, j + 8)) // corner root
                setWall(i + 1, j + 8);    
        }

    // Builds top right corner leg
    for (let i = 0; i < LENGTH; i += ROW_STEP)
        for (let j = 0; j < WIDTH; j += COL_STEP)
        {
            if (isWithinRange(i + 1, j + 9)) // top
                setWall(i + 1, j + 9); 

            if (isWithinRange(i + 2, j + 9)) // bottom
                setWall(i + 2, j + 9); 
        }

    // Builds center top right corner 
    for (let i = 0; i < LENGTH; i += ROW_STEP)
        for (let j = 0; j < WIDTH; j += COL_STEP)
        {
            if (isWithinRange(i + 2, j + 5)) // corner root
                setWall(i + 2, j + 5); 
                
            if (isWithinRange(i + 1, j + 5)) // top branch
                setWall(i + 1, j + 5); 
            
            if (isWithinRange(i + 2, j + 6)) // right branch 
                setWall(i + 2, j + 6);         
        }
        
    // Builds right peak
    for (let i = 0; i < LENGTH; i += ROW_STEP)
        for (let j = 0; j < WIDTH; j += COL_STEP)
        {
            if (isWithinRange(i + 3, j + 7)) // right 
                setWall(i + 3, j + 7); 
            
            if (isWithinRange(i + 3, j + 6)) // left
                setWall(i + 3, j + 6);  
        }
        
    // Builds bottom right corner
    for (let i = 0; i < LENGTH; i += ROW_STEP)
        for (let j = 0; j < WIDTH; j += COL_STEP)
        {
            if (isWithinRange(i + 5, j + 9)) // corner root 
                setWall(i + 5, j + 9); 
                
            if (isWithinRange(i + 4, j + 9)) // top branch
                setWall(i + 4, j + 9); 

            if (isWithinRange(i + 5, j + 8)) // left branch
                setWall(i + 5, j + 8); 
        }

    // Builds bottom left corner
    for (let i = 0; i < LENGTH; i += ROW_STEP)
        for (let j = 0; j < WIDTH; j += COL_STEP)
        {
            if (isWithinRange(i + 6, j)) // corner root
                setWall(i + 6, j); 

            if (isWithinRange(i + 5, j)) // top root
                setWall(i + 5, j); 

            if (isWithinRange(i + 6, j + 1)) // corner root
                setWall(i + 6, j + 1); 
        }
         
    // Builds bottom right (upper) leg
    for (let i = 0; i < LENGTH; i += ROW_STEP)
        for (let j = 0; j < WIDTH; j += COL_STEP)
        {
            if (isWithinRange(i + 6, j + 7)) // left
                setWall(i + 6, j + 7);  

            if (isWithinRange(i + 6, j + 8)) // right 
                setWall(i + 6, j + 8); 
        }

    // Builds bottom left leg
    for (let i = 0; i < LENGTH; i += ROW_STEP)
        for (let j = 0; j < WIDTH; j += COL_STEP)
        {
            if (isWithinRange(i + 7, j + 1)) // left
                setWall(i + 7, j + 1);  

            if (isWithinRange(i + 7, j + 2)) // right
                setWall(i + 7, j + 2);  
        }

    // Builds bottom right (lower) leg
    for (let i = 0; i < LENGTH; i += ROW_STEP)
        for (let j = 0; j < WIDTH; j += COL_STEP)
        {
            if (isWithinRange(i + 7, j + 6)) // right
                setWall(i + 7, j + 6);  

            if (isWithinRange(i + 7, j + 7)) // left
                setWall(i + 7, j + 7);  
        }
    
        enableTableModification();
        enableButtons();
        enableClickDrag();
}