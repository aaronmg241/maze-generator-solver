let transitionDelay

export function shortestPath(numRows, numCols) {

    // Checks to make sure that start and finish are placed
    if (document.getElementsByClassName("start").length === 0 || document.getElementsByClassName("finish").length === 0) {
        alert("Place start and finish before finding shortest path!")
        return
    }

    transitionDelay = 0
    const grid = Array.from(Array(numRows), () => new Array(numCols).fill(0))
    const dists = Array.from(Array(numRows), () => new Array(numCols).fill(999999))
    const prev = Array.from(Array(numRows), () => new Array(numCols))

    const q = []
    const moves = [[1, 0], [-1, 0], [0, 1], [0, -1]] // up, down, right, left
    let finishSquare

    // Sets initial distances (start has distance 0, everything else distance of 999999)
    for (const row of grid.keys()) {
        for (const col of grid[row].keys()) {

            const index = row * numCols + col + 1
            const currSquare = document.getElementById(index)

            if (currSquare.classList.contains("start")) {
                dists[row][col] = 0
            } else if (currSquare.classList.contains("finish")) {
                finishSquare = [row, col] // Keep track of finish location for later
            }

            // Add all cells that arent a wall to queue
            if (!currSquare.classList.contains("wall")) {
                q.push([row, col])
            }

        }
    }

    while (q.length > 0) {

        const [row, col] = findMin(q, dists)
        const currSquare = document.getElementById(row * numCols + col + 1)

        if (currSquare.classList.contains('finish')) {
            break
        }

        for (const move of moves) {

            if (isInQueue(q, row + move[0], col + move[1])) {

                const alt = dists[row][col] + 1

                // Update if new distance is shorter than current stored distance
                if (alt < dists[row + move[0]][col + move[1]]) {
                    dists[row + move[0]][col + move[1]] = alt
                    prev[row + move[0]][col + move[1]] = [row, col]
                }

            }

        }

    }

    if (!prev[finishSquare[0]][finishSquare[1]]) {
        alert("Finish could not be reached!")
        return
    }

    transitionDelay = 0
    const animateQueue = []

    while (finishSquare) {
        const index = finishSquare[0] * numCols + finishSquare[1] + 1
        animateQueue.push(index)
        finishSquare = prev[finishSquare[0]][finishSquare[1]]
    }

    for (let i = animateQueue.length - 2; i > 0; i--) {

        const squareToAnimate = document.getElementById(animateQueue[i])
        squareToAnimate.style.backgroundColor = null
        squareToAnimate.style.transitionDelay = transitionDelay + 's'

        transitionDelay += 0.05
        squareToAnimate.classList = "grid-square finish-path"

    }

}

function isInQueue(q, row, col) {
    for (const square of q) {
        if (square[0] === row && square[1] === col) return true
    }
    return false
}


// Find the square with the current minimum distance
function findMin(q, dists) {

    let min = 999999
    let currMin = [0, 0]
    let index = 0
    let minIndex

    for (const square of q) {

        if (dists[square[0]][square[1]] < min) {
            min = dists[square[0]][square[1]]
            currMin = [square[0], square[1]]
            minIndex = index
        }

        index++

    }

    q.splice(minIndex, 1)

    return currMin

}