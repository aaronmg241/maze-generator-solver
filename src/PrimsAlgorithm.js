// Walls are represented by 0, path is represented by 1
export function prims(rows, cols) {

    const grid = Array.from(Array(rows), () => new Array(cols).fill(0))
    const wallList = []

    addNeighbouringWalls(grid, wallList, Math.floor(Math.random() * rows), Math.floor(Math.random() * cols), rows, cols)

    while (wallList.length > 0) {

        // Find random wall in the list
        const randIndex = Math.floor(Math.random() * wallList.length)
        const currWall = wallList[randIndex]

        // Remove the wall
        wallList.splice(randIndex, 1)

        // If 
        if (onlyOneVisited(grid, currWall)) {
            addNeighbouringWalls(grid, wallList, currWall[0], currWall[1], rows, cols)
        }

    }

    return grid

}

function onlyOneVisited(grid, wall) {

    const [row, col, direction] = wall

    // Wall might have become a path already
    if (grid[row][col] === 0) {

        grid[row][col] = 1

        switch (direction) {

            case "up": 
                grid[row+1][col] = 1 // Connect wall below
                break
            case "down":
                grid[row-1][col] = 1 // Connect wall above
                break
            case "left":
                grid[row][col+1] = 1 // Connect wall to the right
                break
            case "right":
                grid[row][col-1] = 1 // Connect wall to the left
                break

            default:
                return false

        }

        return true

    } else {
        return false
    }

}


function addNeighbouringWalls(grid, wallList, row, col, maxRow, maxCol) {

    // Make current wall a path
    grid[row][col] = 1

    // Add neighbouring walls to list, with the direction that the wall is from the current square, 
    // so that a connecting path can be made
    addWallToList(grid, wallList, row-2, col, 'up', maxRow, maxCol) 
    addWallToList(grid, wallList, row+2, col, 'down', maxRow, maxCol)
    addWallToList(grid, wallList, row, col-2, 'left', maxRow, maxCol) 
    addWallToList(grid, wallList, row, col+2, 'right', maxRow, maxCol)

}

function addWallToList(grid, wallList, row, col, direction, maxRow, maxCol) {

    // Check if position is in the grid and there is a wall at the position
    if (row >= 0 && row < maxRow && col >= 0 && col < maxCol && grid[row][col] === 0) {
        wallList.push([row, col, direction])
    }

}