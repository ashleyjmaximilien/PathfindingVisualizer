let main = document.getElementById("main");
let table = document.querySelector("table");

let h = main.offsetHeight - (2 * main.offsetHeight*0.01);
let w = main.offsetWidth;

let numRows = Math.floor(h / 30);
let numCols = Math.floor(w / 30);

if (isEven(numRows))
    numRows--;

if (isEven(numCols))
    numCols--;

if (numRows <= 8)
    numRows = 9;

if (numCols <= 8)
    numCols = 9;


for (let i = 0; i < numRows; i++)
{
    let row = table.insertRow();
    for (let j = 0; j < numCols; j++)
    {
        let table_cell = row.insertCell();
        let cid = i.toString() + "-" + j.toString();
        table_cell.setAttribute('id', cid);
    }
}




