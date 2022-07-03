function changeTheme(){
    switch (document.body.className)
    {
        case "light":
            document.body.className = "dark";
            break;

        case "dark":
            document.body.className = "midnight";
            break;

        case "midnight":
            document.body.className = "light";
    }
}