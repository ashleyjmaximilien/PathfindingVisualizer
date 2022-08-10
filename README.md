# Pathfinding Visualizer
I started this project because I wanted to learn Javascript and it had been a while since I had built a webpage. I also wanted to work on my front-end skills so I decided that whatever I built had to be visual. Graph traversal is one of my favorite topics from CS and I thought it would be a good candidate for my goals. While exploring graph traversal algorithms, I came across graph theory methods for maze generation. I quickly became obsessed and implemented five traditional maze generation algorithms and seven custom patterns of my own design. Below you'll find a breakdown of the algorithms featured in this project.

You can access this project at https://ashleyjmaximilien.github.io/PathfindingVisualizer/. I recommend using Chrome or Firefox on a desktop or laptop. While the site is functional on mobile devices, it is not well formatted for smaller screens. I have plans to redesign the front-end and add support for smaller screens in the near future. 
<hr>
<h2>Table of Contents</h2>

[Maze Generation Algorithms](https://github.com/ashleyjmaximilien/PathfindingVisualizer/#maze-generation-algorithms)

  [Traditional Maze Generation](https://github.com/ashleyjmaximilien/PathfindingVisualizer/#traditional-maze-generation)
  
    [Recursive Division](https://github.com/ashleyjmaximilien/PathfindingVisualizer/#recursive-division)
  
    [Recursive Backtracking](https://github.com/ashleyjmaximilien/PathfindingVisualizer/#recursive-backtracking)
  
    [Prim's Algorithm](https://github.com/ashleyjmaximilien/PathfindingVisualizer/#prims-algorithm)
  
    [Kruskal's Algorithm](https://github.com/ashleyjmaximilien/PathfindingVisualizer/#kruskals-algorithm)
  
    [Eller's Algorithm](https://github.com/ashleyjmaximilien/PathfindingVisualizer/#ellers-algorithm)
 
  [Custom Patterns](https://github.com/ashleyjmaximilien/PathfindingVisualizer/#custom-patterns)
  
[Pathfinding Algorithms](https://github.com/ashleyjmaximilien/PathfindingVisualizer/#pathfinding-algorithms)

  [Travel Cost](https://github.com/ashleyjmaximilien/PathfindingVisualizer/#travel-cost)
  
  [Breadth First Search](https://github.com/ashleyjmaximilien/PathfindingVisualizer/#breadth-first-searchunweighted)
  
  [Depth First Search](https://github.com/ashleyjmaximilien/PathfindingVisualizer/#depth-first-search-unweighted)
  
  [Dijkstra's Algorithm](https://github.com/ashleyjmaximilien/PathfindingVisualizer/#dijkstras-algorithmweighted)
  
  [Greedy Best First Search](https://github.com/ashleyjmaximilien/PathfindingVisualizer/#greedy-best-first-searchweighted)
  
  [A* Algorithm](https://github.com/ashleyjmaximilien/PathfindingVisualizer/#a-algorithmweighted)
    
  
<h1>Maze Generation Algorithms</h1>
In this project, a maze is modeled as a 2D grid of cells where each cell is either a passage or wall. This is in contrast to the alternative model of a maze in which each cell is a passage and edges are defined and visually denoted by the borders between cells. The wall-or-passage model requires that the grid consists of an odd number of both rows and columns. This model had an impact on how some of the traditional maze generation algorithms were implemented. The details of this are included in the relevant sections. 

<h2>Traditional Maze Generation</h2>

<h3>Recursive Division</h3>

Recursive division is a wall-adder generation algorithm. It starts in an empty space and adds walls until a maze is created. This process is powerful as it is capable of producing increasingly detailed mazes the more it recurses. 

<p align="center"><img src="/readme-images/recdivision.gif" width="475" height="300"/></p>

<p>Here's an overview of recursive division:</p>

```
1. Start with an empty space.

2. Divide the field horizontally or vertically with a wall.

3. Remove a section of this wall to create a single passage.

4. Repeat steps 2 and 3 on each region on either side of the wall. 

5. Recurse on each region produce until no region can be divided further.
```

In the wall-or-passage model, recursive division often produces regions of space with a length or width of 3. In this project, recursive division is modified to allow for disconnected walls in regions of this size. This sometimes results in imperfect, lightly braided mazes. This was a decision made for fun and variation. The remaining traditional maze generation algorithms produce perfect mazes, or mazes in which any two passage cells are connected and there exists only one valid path between any two passage cells. 
  
<h3>Recursive Backtracking</h3>

<p>Recursive backtracking is almost certainly the most visually interesting maze generator this project features. It is a passage carver and is similar to Depth First Search. To generate a maze, the graph is traversed starting from a random cell and then descends as far as possible until a dead-end is reached. A dead-end occurs when there is no unvisited neighbor accessible from the current cell. The algorithm backtracks until a node with at least one unvisited neighbor is encountered. The process repeats recursively until it has backtracked all the way to the starting cell. </p>

<p align="center"><img src="/readme-images/recbacktrack.gif" width="475" height="300"/></p>

Here's a more detailed explanation of recursive backtracking:

```
1. Choose a random starting cell. 

   Due to the wall-or-passage model of a maze, walls can only fall on even numbered rows and columns. Two random numbers 
   are generated to correspond to the row and column of the starting point. The numbers are decremented if they are odd.

2. Randomly choose a neighbor that has not been visited yet and connect to it. This neighbor becomes the new current cell.

3. If the current cell does not have an unvisited neighbor, backtrack to the last cell that has unvisited neighbors and recurse.

4. Stop when the starting cell has been reached again. 

```
The implementation of recursive backtracking in this project uses a few helper functions to assist in getting and setting parents for backtracking purposes, but works as described above overall. 

<h3>Prim's Algorithm</h3>

Prim's algorithm was designed to produce a minimum spanning tree, or a set of edges with the cheapest weight that connects all vertices of a graph. With a simple modification, it can be used to generate perfect mazes. Rather than selecting edges in order of the cheapest option, randomly choose any valid edge.

<p align="center"><img src="/readme-images/prims.gif" width="475" height="300"/></p>

Here's the generalized pseudocode: 

```
1. Choose a random starting cell and add this cell to a set S.  

   As in recursive backtracking, the cell must be on an even numbered row and column, so the randomly generated numbers are 
   decremented if necessary.  
   
2. Choose a random cell from S.

3. Find the passage connection cell nearest to the chosen cell.

   This step is only needed when neighboring passage/vertex cells are selected instead of wall/edge cells. The implementation
   of Prim's in this project selects neighboring passage cells. 
   
 4. Remove the chosen cell from S.
 
 5. Add the chosen cell's neighbors to S. 
 
 6. Repeat until S is empty.
 
```

<h3>Kruskal's Algorithm</h3>

Kruskal's algorithm is another method for producing minimum spanning trees. Like Prim's algorithm, it can be modified to generate perfect mazes. Kruskal's algorithm originally works by choosing edges in order of the smallest weight and joining the trees that the edge connects if those trees are disconnected. If the trees are already connected, the edge is discarded. This process continues until there are no more edges remaining. To use this algorithm for maze generation, edges are chosen randomly rather than by order of edge weight. In Kruskal's algorithm,  a union-find or disjoint set data structure is used to efficiently identify and join sets. This project uses this [Disjoint-Set Javascript library](https://github.com/AndriiHeonia/disjoint-set) for this purpose. 

<p align="center"><img src="/readme-images/kruskals.gif" width="475" height="300"/></p>

Here are the steps in more detail:

```
1. Randomly select an edge.

   In the wall-or-passage model this project uses, edges fall on cells that occupy odd numbered rows and columns. Since the 
   edges that exist in the grid depends on the size of the window, a list of edges E is generated by a helper function. A random 
   number from [0, E.length) is randomly generated to choose an edge.
   
2. Check if the vertices (or endpoints) of the edge belong to the same set. If they do not belong to the same set, unify the sets.
   If the two vertices belong to the same set, continue to the next step.

3. Remove the chosen edge from E.

4. Repeat until E is empty.

```
  
<h3>Eller's Algorithm</h3>

Eller's algorithm flexes on nearly every other maze generation algorithm out there. By generating the maze row by row, Eller's algorithm can generate perfect mazes of infinite sizes all in <b>O(n)</b> time. Like Kruskal's, Eller's uses sets to track and unify sets. This implementation of Eller's algorithm uses the same [disjoint-set library](https://github.com/AndriiHeonia/disjoint-set) as used in Kruskal's.   

<p align="center"><img src="/readme-images/ellers.gif" width="475" height="300"/></p>

The step by step process of Eller's algorithm (modified for the wall-or-passage model) is detailed here: 

```
1. Initialize each of vertices within the first row of the grid to their own set.

2. Randomly join adjacent vertices within this row only if they are in different sets. When vertices are joined, their sets should 
   be unified to indicate that they are now connected. 

3. For each set remaining in the row, randomly create a vertical connection to the next row. Ensure that each set has at least one 
   vertical connection. If the current row is the second to last row, do not make any vertical connections.

4. Add any remaining vertices to their own set. 

5. Repeat steps 2-4 until the second to last row is reached. If the current row is the second to last row, steps 3-4 are skipped.

6. When the last row is reached, make vertical connections to the row above and then random adjacent connections within the last
   row. 

7. Resolve isolations by connecting any disconnected sets along the last two rows. When the algorithm terminates, every passage 
   cell within the maze should be inside the same set. 
   
``` 

<h2>Custom Patterns</h2>

<h3>Random Generation</h3>

This pattern uses the Javascript Math object to pseudorandomly place walls around the grid. For each row of the grid, a random number <i>numWalls</i> is generated to represent how many cells within the particular row should be walls. Then, a random number is generated <i>numWalls</i> times to decide which cells within the row should be walls. If the number generated corresponds to a cell that is already a wall, a new number is generated until the number corresponds to a cell that is not a wall. This method results in mazes that are sparse enough to produce a connected maze suitable for pathfinding but still visually dense. It would be interesting to make this pattern customizable by allowing users to control the density and orientation. 


<h3>Long/Short Stagger Lines (Horizontal/Vertical)</h3>
These four patterns produces lines in an offset, alternating pattern. The short line patterns produces lines with a length of 3 in horizontal and vertical orientations respectively. The long line patterns produce a similar pattern but use variable line lengths to make sure the pattern's appeareance is consistent across table sizes. 

<h3>Pixel Damask</h3>
This pattern is based on damask wallpaper and produces a disconnected graph featuring isolations that are inaccessible from outside its borders.

<h3>Herringbone</h3>
This pattern produces a connected braided maze in which the walls are arranged in a spaced-out herringbone pattern. 

<h2>Pathfinding Algorithms</h2>

<h3>Travel Cost</h3>


<p>In this project, the maze on which the traversal algorithms operate on is a 2D grid of cells. A weak model of a graph representing this maze is constructed before any of the pathfinding algorithms are called. In this model, there are no edges or edge weights. Each node in the graph maintains an adjacency list that stores its neighbors, if it has any. This puts weighted graph algorithms like Dijkstra's and A* at a disadvantage as there is no inherit weight associated with edges between cells. To amend this, weighted graph algorithms use a travel cost to compare options. The cost of traveling to a neighboring cell is broken into two components.</p> 


<h4> Edge cost</h4>

```
Moving from one node to another has a cost of 1
```

<h4> Turn cost </h4>


The start node faces east by default. While traversing, the start node must be facing a square before it can move into it. In other words, it has to turn until it is facing the correct direction. 

```
Each 90° turn has a cost of 1
```
<br>

### <b>Breadth First Search</b> ```unweighted```

In an unweighted graph, Breadth First Search (BFS) is guaranteed to produce the most optimal path between two nodes. Traditionally, BFS uses a queue to store newly discovered nodes with an amortized time complexity of <b>Θ(1)</b> for enqueue and dequeue operations. In theory, the implementation of BFS in this project trades efficiency for convenience by using the built in Javascript array. The dequeue operation of a queue is mimicked by using ```array.shift()``` and its time complexity is dependent of this operation's implementation in the Javascript engine in use. ~~It can't be worse than <b>O(n)</b>, right? ...Right?!~~ <br>
<br>

### <b>Depth First Search </b> ```unweighted```

Unlike BFS, Depth First Search (DFS) is not guaranteed to produce the most optimal path between nodes. As in the BFS implementation, this project's implementation of DFS also theorectically trades efficiency for convenience by using a Javascript array rather than a stack. A stack usually supports a push operation with a time complexity of O(1). ```array.unshift()``` is used in this project to push elements to the top of an array. For the same reasons as described above, the time complexity of this operation is uncertain but it is reasonable to assume that it is O(n) if not better.    
<br>

### <b>Dijkstra's Algorithm</b> ```weighted```

Dijkstra's algorithm is proven to always produce the shortest path between nodes in a weighted graph, but it is quite slow. A priority queue is used in most implementations to ensure that the next cheapest destination is readily available for access in <b>Θ(1)</b> time. Priority queues are commonly implemented with a heap, allowing for insertions in <b>O(log n)</b> time. This project's implementation of Dijkstra's uses an array for the same reasons as described in the BFS and DFS sections. However, the array is sorted using a comparison function passed to ```array.sort()``` before ```array.shift()``` is called. This ensures that the node with the lowest calculated distance is pulled from the array at each iteration of the loop. The time complexity of sorting the array is dependent on the Javascript engine in use, but it is reasonable to expect a time complexity of <b>O(n log n)</b>. 
<br>

### <b>Greedy Best First Search</b> ```weighted```

Greedy Best First Search (GBFS) is not guaranteed to produce the shortest path, but often does. In addition to this, it is usually faster than Dijkstra's algorithm due its use of a heuristic. Rather than selecting the node closest to the starting node, GBFS uses a heuristic to select the node closet to the target node. GBFS makes use of two data structures: the priority queue and the list. The algorithm maintains an <b>open</b> and <b>closed</b> list to track which nodes have been discovered. It uses a priority queue to retrieve the node with the most optimal distance to the target node. The implementation of GBFS in this project uses arrays and its associated operations for each of these. 

### <b>A* Algorithm</b>  ```weighted```
The A* algorithm is quite similar to GBFS but it is significantly faster due its heuristic. Unlike GBFS, whose heuristic calculates the remaining distance to the goal, the A* heuristic ``` f(n) = g(n) + h(n) ``` factors in the distance already traveled to get to current node <i>n</i>. This allows the A* algorithm to update the cost of a node if a better path to it is found. Like GBFS, A* uses an open list, closed list, and priority queue which are all arrays in this project. There are various heuristics that can be used to calculate the distance between the current node and the target node. The implementation of A* in this project uses the Manhattan distance formula <code> h(n) = |x<sub>1</sub> - x<sub>2</sub>| + |y<sub>1</sub> - y<sub>2</sub>|</code>

