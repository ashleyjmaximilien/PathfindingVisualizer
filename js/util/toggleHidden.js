function toggleHidden(e){
    let button = e.target;

    while (button.tagName != "BUTTON")
    {
        if (button.classList.contains("hidden"))
            break;

        button = button.parentElement;
    }
        
    let navItem = button.parentElement;
    navItem.children[1].classList.toggle("show");
}