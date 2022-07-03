let cell_list = document.getElementsByTagName("td");
window.draw = false;

for (let i = 0; i < cell_list.length; i++){

    cell_list[i].addEventListener("click", (e)=>{
        if (e.type != "click")
            return false;

        if (e.target.tagName != "TD")
            return false;
        
        if (e.target.id === startId)
            return false;

        if (e.target.id === targetId)
            return false;

        if (e.target.children.length > 0)
            return false;

        if (window.allowTableModification)
        {
            let obj = e.target;
            window.draw = true;
        }
    });

    cell_list[i].addEventListener("mousedown", (e)=>{
    
        if (e.type != "mousedown")
            return false;

        if(e.target.tagName != "TD")
            return false;

        if (e.target.id === startId)
            return false;
        
        if(e.target.id === targetId)
            return false;
        
        if (window.allowTableModification)
        {    
            window.draw = true;
            e.target.classList.remove("pfexplored");
            e.target.classList.toggle("wall");
        }
    });

    cell_list[i].addEventListener("mouseup", (e)=>{
    
        if (e.type != "mouseup")
            return false;

        if (e.target.tagName != "TD")
            return false;
        
        window.draw = false;
   });

    cell_list[i].addEventListener("mouseenter", (e)=>{

        if (e.buttons == 0)
            return false;

        if (e.type != "mouseenter")
            return false;
        
        if (e.target.tagName != "TD")
            return false;

        if (e.target.id === startId)
            return false;

        if (e.target.id === targetId)
            return false;

        if (e.target.children.length > 0)
        {
            return false;
        }
            
        if (!allowTableModification)
            return false;

        if (!window.draw)
            return false;

        e.target.classList.remove("pfexplored");
        e.target.classList.toggle("wall");
    });

}


let t = document.getElementById("table");
t.addEventListener("mouseleave", (e)=>{
    window.draw = false;
});