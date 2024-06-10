/**
 *
 * Recreates the board but each cell is an array of 2 booleans
 * where cell[0] is wallRemoved and cell[1] is wallNotRemoved
 *
 * @param {number} height
 * @param {number} width
 *
 * @returns {[wallRemoved: boolean, wallNotRemoved: boolean][][]}
 */
function createVisitedArray(height, width) {
  const visited = new Array(height)
  for (let i = 0; i < height; i++) {
    visited[i] = new Array(width)
    for (let j = 0; j < width; j++) {
      visited[i][j] = [false, false]
    }
  }
  return visited
}

/**
 *
 * similar to the previous problem, the permutations form a tree
 * but this time for each move, we have 2 possible states (wallRemoved, wallNotRemoved) for every possible next moves (up, down, left, right)
 * we can traverse this permutation tree using BFS and return the number of moves when destination is reached
 *
 * @param {number[][]} map
 *
 * @returns {number} number of numberOfMoves to reach the destination
 */
function solution(map) {
  const height = map.length
  const width = map[0].length

  const moves = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]

  function hasReachedDestination(x, y) {
    return x === width - 1 && y === height - 1
  }

  function isWithinBoard(x, y) {
    return x >= 0 && x < width && y >= 0 && y < height
  }

  function isWall(x, y) {
    return map[y][x] === 1
  }

  // standard BFS pattern with a queue where each item is a move [x, y, wallRemoved, numberOfMoves]
  // for each previous move removed from the queue, we will loop through all possible next moves
  // if the next move is destination, return the numberOfMoves + 1
  // otherwise add that move to the queue if it's within the board and not visited before

  let queue = [[0, 0, 0, 1]]
  const visited = createVisitedArray(height, width)

  while (queue.length > 0) {
    const [x, y, wallRemoved, numberOfMoves] = queue.shift()
    for (let [dirX, dirY] of moves) {
      let nextX = x + dirX
      let nextY = y + dirY
      if (isWithinBoard(nextX, nextY)) {
        if (hasReachedDestination(nextX, nextY)) {
          return numberOfMoves + 1
        }
        if (!isWall(nextX, nextY) && !visited[nextY][nextX][wallRemoved]) {
          visited[nextY][nextX][wallRemoved] = true
          queue.push([nextX, nextY, wallRemoved, numberOfMoves + 1])
        } else if (isWall(nextX, nextY) && wallRemoved === 0 && !visited[nextY][nextX][1]) {
          visited[nextY][nextX][1] = true
          queue.push([nextX, nextY, 1, numberOfMoves + 1])
        }
      }
    }
  }
}

module.exports = solution
