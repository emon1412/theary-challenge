/**
 *
 * the permutations form a tree, where each node has 8 children (for 8 possible numberOfMoves of the knight)
 * we can traverse this tree using BFS and return the number of moves when src === dest
 * 
 * we can always reach any destination from any source without repeating any position according to The knight's tour problem
 * https://www.chess.com/terms/knights-tour-chess
 * so when next moves are being calculated, we can skip the ones that are already visited
 *
 * @param {number} src
 * @param {number} dest
 *
 * @returns {number} number of moves to reach the destination
 */
function solution(src, dest) {
  if (src < 0 || src >= 64 || dest < 0 || dest >= 64) {
    throw new Error('Invalid input. src and dest should be a number between 0 and 63')
  }

  if (src === dest) {
    return 0
  }

  const knightMoves = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ]

  function getCoordinates(position) {
    return [Math.floor(position / 8), position % 8]
  }

  function getPosition(x, y) {
    return x * 8 + y
  }

  function isWithinBoard(x, y) {
    return x >= 0 && x < 8 && y >= 0 && y < 8
  }

  // standard BFS pattern with a queue where each item is a move [position, numberOfmoves]
  // for each previous move removed from the queue, we will loop through all possible next moves
  // if the next move is within the board
    // if destination is reached, return numberOfMoves + 1
    // otherwise if it's within the board and not visited before
      // mark it as visited and add that move to the queue
  let queue = [[src, 0]]
  let visited = new Set()
  visited.add(src)

  while (queue.length > 0) {
    let [position, numberOfMoves] = queue.shift()
    let [currentRow, currentCol] = getCoordinates(position)

    for (let move of knightMoves) {
      let nextRow = currentRow + move[0]
      let nextCol = currentCol + move[1]
      if (isWithinBoard(nextRow, nextCol)) {
        let newPos = getPosition(nextRow, nextCol)
        if (newPos === dest) {
          return numberOfMoves + 1
        }
        if (!visited.has(newPos)) {
          visited.add(newPos)
          queue.push([newPos, numberOfMoves + 1])
        }
      }
    }
  }
}

module.exports = solution
