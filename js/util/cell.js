class Cell {
    constructor(i, j, id, type){
        this.i = i;
        this.j = j;
        this.id = id;
        this.type = type;
        this.neighbors = [];
        this.visited = false;
        this.explored = false;
        this.parent = null;
        this.parent_id = null;
        this.distance;
        this.direction;
        this.f;
        this.g;
        this.h;
    }

    addNeighbor(cell){
        this.neighbors.push(cell);
    }

    isWall() {
        return (this.type == Type.Wall) ? true : false;   
    }

    isPassage(){
        return (this.type == Type.Passage) ? true : false;
    }

}

class Type {
    
    static Wall = new Type("wall");
    static Passage = new Type("passage");

    constructor(type){this.type = type;}
}

class Direction {
    static North = new Direction("North");
    static South = new Direction("South");
    static East = new Direction("East");
    static West = new Direction("West");

    constructor(dir){this.direction = dir};
}