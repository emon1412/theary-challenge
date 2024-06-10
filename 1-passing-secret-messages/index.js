/**
 *
 * TIL if the sum of the digits is divisible by 3, then the number itself is divisible by 3.
 * https://www.reddit.com/r/todayilearned/comments/r5i5w9/til_a_number_is_divisible_by_3_if_the_sum_of_all
 * 
 * so we attempt to remove the smallest digit(s) that has the remainder from the sum of the digits.
 * the 2 possible remainders are 1 and 2.
 * for remainder 1, we remove 1 digit that has remainder 1 or 2 digits that has remainder 2 ((2 + 2) % = 1)
 * for remainder 2, we remove 1 digit that has remainder 2 or 2 digits that has remainder 1 ((1 + 1) % = 2)
 * 
 *
 * @param {number[]} numbers
 *
 */
function solution(numbers) {
  const sortedNumbers = numbers.sort((a, b) => b - a)
  const totalSum = sortedNumbers.reduce((acc, val) => acc + val, 0)

  function removeSmallestModulo(sortedNumbers, moduloValue) {
    for (let i = 0; i < sortedNumbers.length; i++) {
      if (sortedNumbers[i] % 3 === moduloValue) {
        return sortedNumbers.slice(0, i).concat(sortedNumbers.slice(i + 1))
      }
    }
    // return null if we can't find any number that has the modulo value
    return null
  }

  // adjust the list based on the remainder
  const modulo = totalSum % 3
  let newNumbers = sortedNumbers

  if (modulo === 1) {
    // removing 1 item that has remainder of 1
    newNumbers = removeSmallestModulo(sortedNumbers, 1)
    if (!newNumbers) {
      // if not possible, remove 2 items that have remainder 2 as (2 + 2) % 3 = 1
      newNumbers = removeSmallestModulo(sortedNumbers, 2)
      if (newNumbers) {
        newNumbers = removeSmallestModulo(newNumbers, 2)
      }
    }
  } else if (modulo === 2) {
    // removing 1 item that has remainder 2
    newNumbers = removeSmallestModulo(sortedNumbers, 2)
    if (!newNumbers) {
      // if not possible, remove 2 items that have remainder 1 as (1 + 1) % 3 = 2
      newNumbers = removeSmallestModulo(sortedNumbers, 1)
      if (newNumbers) {
        newNumbers = removeSmallestModulo(newNumbers, 1)
      }
    }
  }


  // return 0 if we can't form a number
  if (!newNumbers || newNumbers.length === 0) {
    return 0
  }

  // sort once more for good measure..
  newNumbers.sort((a, b) => b - a)
  return parseInt(newNumbers.join(''), 10)
}

module.exports = solution
