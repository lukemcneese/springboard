function starOutGrid(grid) {
    var row_with_stars = [];
    var cols_with_stars = [];
    //console.log(grid[0].length);

    for(let r=0; r < grid.length; r++){
        for (let c=0; c <grid[r].length; c++){
            var value = grid[r][c]
            if (value == "*"){
                row_with_stars.push(r);
                cols_with_stars.push(c);
            }
        }
    }
    for(let r=0; r < grid.length; r++){
        for (let c=0; c <grid[r].length; c++){
            if (row_with_stars.includes(r) || cols_with_stars.includes(c)){
                grid[r][c] = "*"
            }
        }
    } 
    return grid
}