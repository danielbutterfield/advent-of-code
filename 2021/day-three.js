import { parseInputAsStrings } from './inputs/helper.js'

const input = parseInputAsStrings('2021/inputs/test.txt')

const numberOfCharacters = 5

const MAX_RANGE = 'max'
const MIN_RANGE = 'min'

const getBitInPosition = (diagnostics, position, range) => {
  let bit0 = 0
  let bit1 = 0

  for (let i = 0; i < diagnostics.length; i++) {
    const character = diagnostics[i].charAt(position)
    if (character === '0') bit0++
    if (character === '1') bit1++
  }

  return range === MAX_RANGE
    ? bit0 > bit1
      ? '0'
      : '1'
    : bit0 < bit1
    ? '0'
    : '1'
}

const getUnitRate = (diagnostics, range) => {
  let values = []

  // Loops over each position, and gets the most/least common bit
  // and adds it to an array of values
  for (let position = 0; position < numberOfCharacters; position++) {
    const value = getBitInPosition(diagnostics, position, range)

    values.push(value)
  }

  // Convert ["0", "0", "1", "1", "1"] into a string and parseInt;
  // changing it into a decimal number
  return parseInt(values.join(''), 2)
}

const recursiveFilter = (input, range, position = 0) => {
  if (input.length === 1) return parseInt(input.join(''), 2)

  const value = getBitInPosition(input, position, range)

  const filtered = input.filter((element) =>
    element.charAt(position).startsWith(value)
  )

  const newPosition = position + 1

  return recursiveFilter(filtered, range, newPosition)
}

const gammaRate = getUnitRate(input, MAX_RANGE)
const epsilonRate = getUnitRate(input, MIN_RANGE)

const oxygenRating = recursiveFilter(input, MAX_RANGE)

console.log(oxygenRating)

const dayThreePartOne = gammaRate * epsilonRate

const dayThreePartTwo = '🚧 WIP 🚧'

export { dayThreePartOne, dayThreePartTwo }
