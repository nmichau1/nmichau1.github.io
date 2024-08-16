


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
       v = frontier_ls.splice(getRandomInt((frontier_ls.length) - 1),1)
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
         fs_arr = Array.from(fs);
        for(let x = 0;x<fs_arr.length;x++){
          frontier_ls.push(fs_arr[x])
    }
}
return grid
    }
