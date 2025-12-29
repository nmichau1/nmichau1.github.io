
// mazes.js
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// 1. We define a global variable for the SVG so all class methods can see it
let svg;

class Maze {
  constructor() {
    this.svg_width = 700;
    this.svg_height = 600;
    // Note: ensure generate_maze() is defined or imported!
    this.maze_array = this.borders(generate_maze(20, 20)); 
    this.maze_width = this.maze_array[0].length;
    this.maze_height = this.maze_array.length;
    this.width = (this.svg_width / this.maze_width) * 0.98;
    this.height = (this.svg_height / this.maze_height) * 0.98;
    this.start = this.get_start();
    this.end = this.get_end();
  }

  // ... (Keep your search_animation, get_start, get_end, polygons, borders methods here) ...

  make_maze(type) {
    // Clear previous drawings
    svg.selectAll("*").remove(); 
    
    for (let x = 0; x < this.maze_height; x++) {
      for (let y = 0; y < this.maze_array[x].length; y++) {
        this.polygons(x, y, (this.width * y));
      }
    }
    if (type === "bfs") this.bfs(this.maze_array, this.start, this.end);
    if (type === "dfs") this.dfs(this.maze_array, this.start, this.end);
  }

  // border() MUST be here:
  borders(maze) {
    let maze_length = maze.length;
    for (let x = 0; x < maze_length; x++) {
      maze[x].push(0);
      maze[x].unshift(0);
    }
    let horizontal_border = Array(maze[0].length).fill(0);
    maze.unshift(horizontal_border);
    maze.push(horizontal_border);
    return maze;
  }
   get_start() {
    for (let x = 0; x <  this.maze_width; x++) {
      let random = Math.floor(Math.random() * this.maze_width)
      if (this.maze_array[1][random] == true) {
        return random
      }
      else if (x == this.maze_width-2) {
        while (this.maze_array[2][random] != true) {
          random = Math.floor(Math.random() * this.maze_width)
        }
        this.maze_array[1][random] = true
        return random
      }

    }

  }
   get_end() {
    for (let x = 0; x < this.maze_width; x++) {
      let random = Math.floor(Math.random() * this.maze_width)
      if (this.maze_array[this.maze_height - 2][random] == true) {
        return random
      }
      else if (x == this.maze_width -2) {
        while (this.maze_array[this.maze_height - 3][random] != true) {
          random = Math.floor(Math.random() * this.maze_width)
        }
        this.maze_array[this.maze_height - 2][random] = true
        return random
      }

    }

  }
  polygons(x, y, position_x) {


if (this.maze_array[x][y] != true) {
  const path = d3.path()
  path.rect(position_x, this.height * x, this.width, this.height);
  path.closePath()
  svg.append('path')
    .attr('d', path)
    .attr('fill', 'black')


}
if (this.maze_array[x][y] == true) {
  const path = d3.path()
  path.rect(position_x, this.height * x, this.width, this.height);
  path.closePath()
  svg.append('path')
    .attr('d', path)
    .attr('fill', 'white')


}

if (x == this.maze_height - 1 && y == this.end) {
  const path = d3.path()
  path.rect(position_x, this.height * x, this.width, this.height);
  path.closePath()
  svg.append('path')
    .attr('d', path)
    .attr('fill', 'green')


}


if (x == 0 && y == this.start) {
  const path = d3.path()
  path.rect(position_x, this.height * x, this.width, this.height);
  path.closePath()
  svg.append('path')
    .attr('d', path)
    .attr('fill', 'red')


}


}
async dfs(graph,start,end,width,height){
    let array_length = graph.length
    const queue = [[0,this.start]];
    const visited = new Set()
    const results = []
   // console.log(queue)
    while(queue.length){
    //  console.log(queue)
      let vertex = queue.pop()
     
        if(!visited.has(JSON.stringify(vertex))){
        //  console.log(visited)
            visited.add(JSON.stringify(vertex))
            results.push(vertex)
         await  this.search_animation(vertex[0],vertex[1])
  
           
        }
         let x = vertex[0]
         let y = vertex[1]
      //  console.log(vertex)
     //   console.log(graph)
     
     if(vertex[0] == array_length-2 && vertex[1]==end){
          console.log("found!")

          break;
        }
        let next = []
        if(this.maze_array[x+1][y] && x < this.maze_array.length){
          console.log('true: '+x)
          next.push([x+1,y])
        }
        if(this.maze_array[x][y+1] && y < this.maze_array[0].length){
          next.push([x,y+1])
        }
        if( x >0 && this.maze_array[x-1][y]){
          next.push([x-1,y])
        }
        if( y >0 && this.maze_array[x][y-1]){
          next.push([x,y-1])
        }
        //console.log(next)
        //let graph_iter = graph.get(vertex)
       //console.log(graph_iter)

        if (next){
        for (let neighbor of next){
               
          if(!visited.has((JSON.stringify(neighbor))) && !queue.includes(neighbor)){

            queue.push(neighbor)

          }
            
        }
      }
    }
    return results

    

}
async bfs(graph,start,end,width,height){
    let array_length = graph.length
    const queue = [[0,this.start]];
    const visited = new Set()
    const results = []
   // console.log(queue)
    while(queue.length){
    //  console.log(queue)
      let vertex = queue.shift()
     
        if(!visited.has(JSON.stringify(vertex))){
        //  console.log(visited)
            visited.add(JSON.stringify(vertex))
            results.push(vertex)
         await  this.search_animation(vertex[0],vertex[1])
  
           
        }
         let x = vertex[0]
         let y = vertex[1]
      //  console.log(vertex)
     //   console.log(graph)
     
     if(vertex[0] == array_length-2 && vertex[1]==end){
          console.log("found!")

          break;
        }
        let next = []
        if(this.maze_array[x+1][y] && x < this.maze_array.length){
          console.log('true: '+x)
          next.push([x+1,y])
        }
        if(this.maze_array[x][y+1] && y < this.maze_array[0].length){
          next.push([x,y+1])
        }
        if( x >0 && this.maze_array[x-1][y]){
          next.push([x-1,y])
        }
        if( y >0 && this.maze_array[x][y-1]){
          next.push([x,y-1])
        }
        //console.log(next)
        //let graph_iter = graph.get(vertex)
       //console.log(graph_iter)

        if (next){
        for (let neighbor of next){
               
          if(!visited.has((JSON.stringify(neighbor))) && !queue.includes(neighbor)){

            queue.push(neighbor)

          }
            
        }
      }
    }
    return results

    

}
search_animation(x,y) {
    return new Promise(resolve => {
      setTimeout(() => {
        const path2 = d3.path()
        path2.rect(this.width * y, this.height * x, this.width, this.height);
        path2.closePath()
        svg.append('path')
          .attr('d', path2)
          .attr('fill', 'grey')


        const path = svg.append('path')
          .attr('d', path2)
          .attr('fill', 'grey');
        resolve()
      }, 1)

    })

  }

  
}

function maze_maker(type) {
  const container = d3.select("#maze-container");
  
  // 1. Clear everything inside the container first
  container.selectAll("*").remove(); 

  // 2. Create the SVG fresh every time
  svg = container.append("svg")
    .attr("width", 700)
    .attr("height", 600);

  // 3. Run the maze logic
  let maze = new Maze();
  maze.make_maze(type);
}

// CRITICAL: Attach to window because this is a module
window.draw_maze = maze_maker;

function createGraphFrom2DArray(array){
    const graph = new Map();
    const rows = array.length;
    const cols = array[0].length;
   




    function addEdge(node1, node2){
        //console.log(graph)
      //  console.log(node1)
     //   console.log(array[node1[0]][node1[2]])
        if(!graph.has(node1)&& array[node1[0]][node1[2]]){
            graph.set(node1,[])
           // console.log("ran")
        }
        if(!graph.has(node2)&& array[node2[0]][node2[2]]){
            graph.set(node2,[])
        }
        if(graph.has(node1)){
            graph.get(node1).push(node2)
        }
        if(graph.has(node2)){
            graph.get(node2).push(node1)
        }
      
    }
    for(let i =0;i<rows;i++){
        for(let j = 0; j< cols; j++){
            
            if(array[i][j]){
                console.log("I: "+i)
            console.log("J: "+j)
                const node = `${i},${j}`;

                for (const [di, dj] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
                    const ni = i + di;
                    const nj = j + dj;
                    if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && array[ni][nj]) {
                        const neighbor = `${ni},${nj}`;
                        addEdge(node, neighbor);
                    }
                }
            }
        }
    }
    console.log(graph)
return graph;
}

















function create2DArray(rows, columns) {
    return Array.from({ length: rows }, () => Array(columns).fill(0)); // or any default value
  }


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function frontier(x, y,grid,width,height){
        /*
        Returns the frontier of cell (x, y)
        The frontier of a cell are all walls with exact distance two,
        diagonals excluded.
        :param x: x coordinate of the cell
        :param y: y coordinate of the cell
        :return: set of all frontier cells
        */
        let f = new Set()
        if(x >= 0 && x < width && y >= 0 && y < height){
            if( x > 1 && !grid[x-2][y]){
                f.add([x-2, y])
            }
            if(x + 2 < width && !grid[x+2][y]){
                f.add([x+2, y])
            }  
            if(y > 1 &&  !grid[x][y-2]){
                f.add([x, y-2])

            }
            if(y + 2 < height &&  !grid[x][y+2]){
                f.add([x, y+2])
     
            }

        }
    
        return f
}

function connect(x1, y1, x2, y2,grid){
        /*
        Connects wall (x1, x2) with passage (x2 , x2), who
        are assumed to be of distance two from each other
            Connecting a wall to a passage implies converting
            that wall and the wall between them to passages
        :param x1: x coordinate of the wall
        :param y1: y coordinate of the wall
        :param x2: x coordinate of the passage
        :param y2: y coordinate of the passage
        */
        let x = Math.floor((x1 + x2) / 2)
        let y = Math.floor((y1 + y2)/ 2)
        grid[x1][y1] = true
        grid[x][y] = true
}

function neighbors(x,y,grid,width,height){
    /*
    Returns the neighbours of cell (x, y)
    The neighbours of a cell are all passages with exact distance two,
    diagonals excluded.
    :param x: x coordinate of the cell
    :param y: y coordinate of the cell
    :return: set of all neighbours
    */
    let n = new Set()
    if(x >= 0 && x < width && y >= 0 && y < height){
        if(x > 1 && grid[x-2][y]){
            n.add([x-2, y])
        }
        if(x + 2 < width && grid[x+2][y]){
            n.add([x+2, y])
        }
        if(y > 1 && grid[x][y-2]){
            n.add([x, y-2])
        }
        if(y + 2 < height && grid[x][y+2]){
            n.add([x, y+2])
    }}
            return n
}

function generate_maze(width,height){
    let grid = create2DArray(width, height);
    let frontier_ls = []
    let x =  getRandomInt(width - 1)
    let y =  getRandomInt(height- 1)
    grid[x][y] = true
    let fs = frontier(x, y,grid,width,height)
    for(const value of fs){
        frontier_ls.push(value)
    }
   while (frontier_ls.length > 1){
        let v = frontier_ls.splice(getRandomInt((frontier_ls.length) - 1),1)
        x=v[0][0]
        y=v[0][1]
        let ns = neighbors(x,y,grid,width,height)
        if (ns.size > 0) {
           let ns_array =  Array.from(ns);
            const randomIndex =getRandomInt(ns_array.length-1);
            v =  ns_array[randomIndex]
            let nx = v[0]
            let ny = v[1]
            connect(x, y, nx, ny,grid)
         }
         fs = frontier(x, y,grid,width,height)
         let fs_arr = Array.from(fs);
        for(let x = 0;x<fs_arr.length;x++){
          frontier_ls.push(fs_arr[x])
    }
}
return grid
    }
