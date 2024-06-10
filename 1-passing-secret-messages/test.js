const solution = require('.')

describe('question 1', () => {
  const testCases = [
    [[3, 1, 4, 1], 4311],
    [[3, 1, 4, 1, 5, 9], 94311],
    [[4, 9, 7, 6, 9, 6, 4, 5, 3, 5, 9, 0], 99966554430],
  ]
  
  testCases.forEach(([input, expectedOutput]) => {
    it(`should return ${expectedOutput} for ${input}`, () => {
      expect(solution(input)).toBe(expectedOutput)
    })
  })
})
