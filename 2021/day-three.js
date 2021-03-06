import { parseInputAsStrings } from './inputs/helper.js'

const input = parseInputAsStrings('2021/inputs/day-three.txt')

const NUMBER_OF_CHARACTERS = 12

const MAX_RANGE = 'max'
const MIN_RANGE = 'min'

const AS_DECIMAL = 2

/**
 * Imagine a matrix of numbers such as below. This function
 * loops over each row, and gets either the most or least
 * popular "bit" for that column (or position).
 *
 * For example, if we provide a position of 1 and range
 * of MIN_RANGE (which is the least common), this function
 * would return "1".
 *
 * 11110
 * 10110
 * 10111
 *
 * @param string[] array
 * @param string range
 * @param number position
 * @returns string '0' || '1'
 */
const getBitInPosition = (array, range, position) => {
  let bit0 = 0
  let bit1 = 0

  for (let i = 0; i < array.length; i++) {
    const character = array[i].charAt(position)
    if (character === '0') bit0++
    if (character === '1') bit1++
  }

  // Conditions needed to determine which value is returned;
  // min and max are used to determine which are the least
  // and most common bit values, in the case in which these
  // values are even, we should return the favoured value.
  if (range === MAX_RANGE && bit0 === bit1) return '1'
  if (range === MIN_RANGE && bit0 === bit1) return '0'
  if (range === MAX_RANGE) return bit0 > bit1 ? '0' : '1'
  if (range === MIN_RANGE) return bit0 < bit1 ? '0' : '1'
}

/**
 * Loops over each character position with the help of NUMBER_OF_CHARACTERS
 * and fetches the "bit" most or least common for that position. For each
 * of these characters, build an array of values which are used to build
 * the decimal value which is eventually returned.
 *
 * @param string[] array
 * @param string range
 * @returns number
 */
const getUnitRate = (array, range) => {
  let values = []

  // Loops over each position, and gets the most/least common bit
  // and adds it to an array of values
  for (let position = 0; position < NUMBER_OF_CHARACTERS; position++) {
    const value = getBitInPosition(array, range, position)

    values.push(value)
  }

  // Convert ["0", "0", "1", "1", "1"] into a string and parseInt;
  // changing it into a decimal number
  return parseInt(values.join(''), AS_DECIMAL)
}

/**
 * Imagine a matrix of numbers such as below.
 *
 * 11110
 * 10110
 * 10111
 *
 * This function loops over each row, and using the position arg,
 * gets the most or least popular bit for the column, then filter
 * the array of binary numbers by the returned bit. This returns
 * another array, except it'll be smaller. Each time we call the
 * function adjust the position (the column) by one.
 *
 * Just. Keep. Filtering.
 *
 * Eventually you'll have one row left, and at that point the
 * function returns a decimal conversion for that binary number.
 *
 * @param string[] array
 * @param string range
 * @param number position
 * @returns function || number
 */
const recursiveFilter = (array, range, position = 0) => {
  if (array.length === 1) return parseInt(array.join(''), AS_DECIMAL)

  const bit = getBitInPosition(array, range, position)

  const filtered = array.filter((element) =>
    element.charAt(position).startsWith(bit)
  )

  return recursiveFilter(filtered, range, position + 1)
}

const powerConsumption = {
  gamma: getUnitRate(input, MAX_RANGE),
  epsilon: getUnitRate(input, MIN_RANGE),
}

const lifeSupportRating = {
  oxygen: recursiveFilter(input, MAX_RANGE),
  scrubber: recursiveFilter(input, MIN_RANGE),
}

const dayThreePartOne = powerConsumption.gamma * powerConsumption.epsilon

const dayThreePartTwo = lifeSupportRating.oxygen * lifeSupportRating.scrubber

export { dayThreePartOne, dayThreePartTwo }
