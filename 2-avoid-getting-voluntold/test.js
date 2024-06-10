const solution = require('.')

describe.only('quetion 2', () => {
  const testCases = [
    [[0, 1], 3],
    [[19, 36], 1],
    [[56, 16], 3],
    [[0, 62], 5],
    [[0, 0], 0],
  ]
	
	testCases.forEach(([input, expectedOutput]) => {
    it(`should return ${expectedOutput} for ${input[0]} -> ${input[1]}`, () => {
      expect(solution(...input)).toBe(expectedOutput)
    })
  })
})
