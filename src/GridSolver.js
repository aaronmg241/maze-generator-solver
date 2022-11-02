let currDelay = 0.0

export function solveGrid(numRows, numCols) {

    const startElement = document.getElementsByClassName('start')[0]
    const endElement = document.getElementsByClassName('finish')[0]

    currDelay = 0

    if (!startElement || !endElement) {
        alert("Must place the starting and finishing blocks.")
        return
    }

    const grid = Array.from(Array(numRows), () => new Array(numCols).fill(0))
    const visited = Array.from(Array(numRows), () => new Array(numCols).fill(false))
    const toVisit = []

    for (const row in grid) {

        for (const col in grid[row]) {
            
            // console.log(row, col, numCols)
            const id = parseInt(row) * numCols + parseInt(col) + 1
            // console.log(id)
            const square = document.getElementById(id)

            if (square.classList.contains("wall")) grid[row][col] = 0
            else if (square.classList.contains("start")) {
                toVisit.push([parseInt(row), parseInt(col)])
                grid[row][col] = 2
            }
            else if (square.classList.contains("finish")) grid[row][col] = 3
            else grid[row][col] = 1

        }

    }

    let result = false

    while (toVisit.length > 0 && !result) {

        const currSquare = toVisit.pop()

        result = checkSquare(grid, currSquare[0], currSquare[1], numRows, numCols, toVisit, visited)

    }

    if (result === true) {
        console.log("Found end!")
    } else {
        console.log("could not find end")
    }

}

function checkSquare(grid, row, col, maxRow, maxCol, stack, visited) {

    if (visited[row][col]) return false
    if (grid[row][col] === 3) return true

    visited[row][col] = true

    // Animation
    document.getElementById(parseInt(row) * maxCol + parseInt(col) + 1).style.transitionDelay = currDelay.toString() + "s"
    document.getElementById(parseInt(row) * maxCol + parseInt(col) + 1).classList = 'grid-square finish-path'
    currDelay += 0.05

    checkNeighbour(grid, row+1, col, maxRow, maxCol, stack, visited)
    checkNeighbour(grid, row-1, col, maxRow, maxCol, stack, visited)
    checkNeighbour(grid, row, col+1, maxRow, maxCol, stack, visited)
    checkNeighbour(grid, row, col-1, maxRow, maxCol, stack, visited)

    return false
}

function checkNeighbour(grid, row, col, maxRow, maxCol, stack, visited) {

    if (row >= 0 && row < maxRow && col >= 0 && col < maxCol && grid[row][col] !== 0 && visited[row][col] !== true) {
        stack.push([row, col])
    }
        

}